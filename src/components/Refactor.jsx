// src/App.js
import React, { useState } from 'react';
import Modal from 'react-modal';

// Modal.setAppElement('#root');

function Clip() {
	const [todos, setTodos] = useState([
		{ title: 'Grocery Shopping', description: 'Buy milk, bread, and eggs from the supermarket.' },
		{ title: 'Read a Book', description: 'Finish reading the last chapter of the novel.' },
		{ title: 'Exercise', description: 'Go for a 30-minute run in the park.' }
	]);
	const [detailModalIsOpen, setDetailModalIsOpen] = useState(false);
	const [editModalIsOpen, setEditModalIsOpen] = useState(false);
	const [addModalIsOpen, setAddModalIsOpen] = useState(false);
	const [selectedTodo, setSelectedTodo] = useState(null);
	const [editableTodo, setEditableTodo] = useState({ title: '', description: '', index: -1 });
	const [newTodo, setNewTodo] = useState({ title: '', description: '' });

	const openDetailModal = (todo) => {
		setSelectedTodo(todo);
		setDetailModalIsOpen(true);
	}

	const closeDetailModal = () => {
		setDetailModalIsOpen(false);
	}

	const openEditModal = (todo, index) => {
		setEditableTodo({ ...todo, index });
		setEditModalIsOpen(true);
	}

	const closeEditModal = () => {
		setEditModalIsOpen(false);
	}

	const handleEditChange = (e) => {
		const { name, value } = e.target;
		setEditableTodo(prev => ({ ...prev, [name]: value }));
	}

	const submitEditTodo = () => {
		const newTodos = [...todos];
		newTodos[editableTodo.index] = { title: editableTodo.title, description: editableTodo.description };
		setTodos(newTodos);
		closeEditModal();
	}

	const openAddModal = () => {
		setAddModalIsOpen(true);
	}

	const closeAddModal = () => {
		setAddModalIsOpen(false);
	}

	const handleAddChange = (e) => {
		const { name, value } = e.target;
		setNewTodo(prev => ({ ...prev, [name]: value }));
	}

	const submitNewTodo = () => {
		if (newTodo.title && newTodo.description) {
			setTodos([...todos, newTodo]);
			setNewTodo({ title: '', description: '' }); // Reset new todo
			closeAddModal();
		}
	}

	const deleteTodo = (index) => {
		const newTodos = todos.filter((_, idx) => idx !== index);
		setTodos(newTodos);
	}
	const copyToClipboard = text => {
		navigator.clipboard.writeText(text).then(() => {
			alert('Description copied to clipboard!');
		}, err => {
			console.error('Could not copy text: ', err);
		});
	};
	const pasteFromClipboard = async () => {
		try {
			const text = await navigator.clipboard.readText();
			setEditableTodo(prev => ({ ...prev, description: text }));
		} catch (err) {
			console.error('Failed to read clipboard contents: ', err);
		}
	};

	return (
		<div className="container mx-auto p-4">
			<button
				onClick={openAddModal}
				className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded-lg shadow-md transition duration-300"
			>
				Add Todo
			</button>

			<div className="mt-6">
				{todos.map((todo, index) => (
					<div key={index} className="flex items-center justify-between p-3 my-2 bg-white rounded-lg shadow border border-gray-200">
						<h3 onClick={() => openDetailModal(todo)} className="text-lg font-semibold text-gray-700 cursor-pointer hover:text-gray-900 transition duration-300">
							{todo.title}
						</h3>
						<div>
							<button
								onClick={() => openEditModal(todo, index)}
								className="bg-yellow-600 hover:bg-yellow-800 text-white font-bold py-1 px-3 rounded-lg ml-2 transition duration-300"
							>
								Edit
							</button>
							<button
								onClick={() => deleteTodo(index)}
								className="bg-red-600 hover:bg-red-800 text-white font-bold py-1 px-3 rounded-lg ml-2 transition duration-300"
							>
								Delete
							</button>
						</div>
					</div>
				))}
			</div>

			{/* Detail Modal */}
			<Modal
				isOpen={detailModalIsOpen}
				onRequestClose={closeDetailModal}
				className="fixed inset-0 flex items-center justify-center"
				overlayClassName="fixed inset-0 bg-black bg-opacity-50"
			>
				<div className="bg-white rounded-lg shadow-xl p-6 max-w-lg mx-auto" style={{ maxHeight: '80vh' }}>
					<h2 className="text-2xl font-bold text-gray-800 mb-4">{selectedTodo?.title}</h2>
					<div className="mb-6 overflow-y-auto" style={{ maxHeight: '50vh' }}>
						<p className="text-gray-600">{selectedTodo?.description}</p>
					</div>
					<button
						onClick={() => copyToClipboard(selectedTodo?.description)}
						className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded-lg mr-4 transition duration-300"
					>
						Copy Description
					</button>
					<button
						onClick={closeDetailModal}
						className="bg-gray-600 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
					>
						Close
					</button>
				</div>
			</Modal>


			{/* Edit Modal */}
			<Modal
				isOpen={editModalIsOpen}
				onRequestClose={closeEditModal}
				className="flex items-center justify-center h-screen"
				overlayClassName="fixed inset-0 bg-black bg-opacity-50"
			>
				<div className="bg-white rounded-lg shadow-xl p-6 max-w-lg mx-auto w-full">
					<input
						name="title"
						value={editableTodo.title}
						onChange={handleEditChange}
						placeholder="Title"
						className="border border-gray-300 p-3 rounded w-full mb-4"
					/>
					<textarea
						name="description"
						value={editableTodo.description}
						onChange={handleEditChange}
						placeholder="Description"
						className="border border-gray-300 p-3 rounded w-full mb-4 custom-scrollbar"
						style={{ height: '50vh', resize: 'none' }}
					/>
					<button
						onClick={pasteFromClipboard}
						className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded-lg mr-4 transition duration-300"
					>
						Paste from Clipboard
					</button>
					<button
						onClick={submitEditTodo}
						className="bg-green-600 hover:bg-green-800 text-white font-bold py-2 px-4 rounded-lg mr-4 transition duration-300"
					>
						Save Changes
					</button>
					<button
						onClick={closeEditModal}
						className="bg-gray-600 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
					>
						Cancel
					</button>
				</div>
			</Modal>

			{/* Add Todo Modal */}
			<Modal
				isOpen={addModalIsOpen}
				onRequestClose={closeAddModal}
				className="fixed inset-0 flex items-center justify-center"
				overlayClassName="fixed inset-0 bg-black bg-opacity-50"
			>
				<div className="bg-white rounded-lg shadow-xl p-6 max-w-lg mx-auto">
					<input
						name="title"
						value={newTodo.title}
						onChange={handleAddChange}
						placeholder="Title"
						className="border border-gray-300 p-3 rounded w-full mb-4"
					/>
					<textarea
						name="description"
						value={newTodo.description}
						onChange={handleAddChange}
						placeholder="Description"
						className="border border-gray-300 p-3 rounded w-full mb-4"
						style={{ height: '50vh', resize: 'none' }} // Copied style from Edit Modal
					/>
					<button onClick={submitNewTodo} className="bg-green-600 hover:bg-green-800 text-white font-bold py-2 px-4 rounded-lg mr-4 transition duration-300">
						Add Todo
					</button>
					<button onClick={closeAddModal} className="bg-gray-600 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded-lg transition duration-300">
						Cancel
					</button>
				</div>
			</Modal>


		</div>

	);
}

export default Clip;
