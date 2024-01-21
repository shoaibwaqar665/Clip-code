// src/App.js
import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { db } from '../FirebaseConfig'
import { addDoc, collection, Timestamp, query, orderBy, onSnapshot, deleteDoc, doc, updateDoc } from 'firebase/firestore'
import { v4 as uuidv4 } from 'uuid';

function Clip() {
	const [todos, setTodos] = useState([
		{ title: 'Grocery Shopping', text: 'Buy milk, bread, and eggs from the supermarket.' },
		{ title: 'Read a Book', text: 'Finish reading the last chapter of the novel.' },
		{ title: 'Exercise', text: 'Go for a 30-minute run in the park.' }
	]);
	const [detailModalIsOpen, setDetailModalIsOpen] = useState(false);
	const [editModalIsOpen, setEditModalIsOpen] = useState(false);
	const [addModalIsOpen, setAddModalIsOpen] = useState(false);
	const [selectedTodo, setSelectedTodo] = useState(null);
	const [editableTodo, setEditableTodo] = useState({ title: '', text: '', index: -1 });
	const [newTodo, setNewTodo] = useState({ title: '', text: '' });
	const [tasks, setTasks] = useState([])
	const value = collection(db, "Clip-code")
	const guid = uuidv4();

	const openDetailModal = (todo) => {
		setSelectedTodo(todo);
		setDetailModalIsOpen(true);
	}

	const closeDetailModal = () => {
		setDetailModalIsOpen(false);
	}
	const openEditModal = (todoData, id) => {
		const index = todos.findIndex((todo) => todo.id === id);
		setEditableTodo({ ...todoData, id, index });
		setEditModalIsOpen(true);
	};

	const closeEditModal = () => {
		setEditModalIsOpen(false);
	}

	const handleEditChange = (e) => {
		const { name, value } = e.target;
		setEditableTodo(prev => ({ ...prev, [name]: value }));
	}

	// const submitEditTodo = () => {
	// 	const newTodos = [...todos];
	// 	newTodos[editableTodo.index] = { title: editableTodo.title, text: editableTodo.text };
	// 	setTodos(newTodos);
	// 	closeEditModal();
	// }

	const submitEditTodo = async () => {
		// Assuming editableTodo includes the 'id' of the todo item
		const { id, title, text, index } = editableTodo;
		console.log(editableTodo.id, "editableTodo")
		try {
			const todoRef = doc(db, "Clip-code", id);
			await updateDoc(todoRef, {
				title: title,
				text: text,
				date_created: Timestamp.now(),
			});

			console.log("Todo updated successfully");

			// Update the todo in the local state
			const updatedTodo = { ...todos[index], title, text };
			const newTodos = [...todos];
			newTodos[index] = updatedTodo;
			setTodos(newTodos);

			closeEditModal();
			handleGetData();
		} catch (error) {
			console.error("Error updating todo: ", error);
		}
	};



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
		if (newTodo.title && newTodo.text) {
			setTodos([...todos, newTodo]);
			handleSave();
			setNewTodo({ title: '', text: '' }); // Reset new todo
			closeAddModal();
		}
	}

	const deleteTodo = async (textGuid) => {
		try {
			await deleteDoc(doc(db, "Clip-code", textGuid));
			console.log("Document successfully deleted!");
			setTodos(todos.filter((todo) => todo?.id !== textGuid));
		} catch (error) {
			console.error("Error removing document: ", error);
		}
	}
	const copyToClipboard = text => {
		navigator.clipboard.writeText(text).then(() => {
			alert('text copied to clipboard!');
		}, err => {
			console.error('Could not copy text: ', err);
		});
	};
	const pasteFromClipboard = async () => {
		try {
			const text = await navigator.clipboard.readText();
			setEditableTodo(prev => ({ ...prev, text: text }));
		} catch (err) {
			console.error('Failed to read clipboard contents: ', err);
		}
	};
	const handleSave = async () => {
		try {
			await addDoc(value, {
				text: newTodo.text,
				title: newTodo.title,
				text_guid: guid,
				date_created: Timestamp.now(),
				is_deleted: false
			});

		} catch (err) {
			console.error(err);
		}
	}
	const handleGetData = () => {
		const q = query(collection(db, 'Clip-code'), orderBy('date_created', 'desc'))
		onSnapshot(q, (querySnapshot) => {
			setTodos(querySnapshot.docs.map(doc => ({
				data: doc.data(),
				id: doc.id,
			})))
		})
	}
	useEffect(() => {
		handleGetData()
	}, [])

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
					<div key={todo?.id} className="flex items-center justify-between p-3 my-2 bg-white rounded-lg shadow border border-gray-200">
						<h3 onClick={() => openDetailModal(todo)} className="text-lg font-semibold text-gray-700 cursor-pointer hover:text-gray-900 transition duration-300">
							{todo?.data?.title}
						</h3>
						<div>
							<button
								onClick={() => openEditModal(todo?.data, todo?.id)}
								className="bg-yellow-600 hover:bg-yellow-800 text-white font-bold py-1 px-3 rounded-lg ml-2 transition duration-300"
							>
								Edit
							</button>
							<button
								onClick={() => deleteTodo(todo?.id)}
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
					<h2 className="text-2xl font-bold text-gray-800 mb-4">{selectedTodo?.data?.title}</h2>
					<div className="mb-6 overflow-y-auto" style={{ maxHeight: '50vh' }}>
						<p className="text-gray-600">{selectedTodo?.data?.text}</p>
					</div>
					<button
						onClick={() => copyToClipboard(selectedTodo?.text)}
						className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded-lg mr-4 transition duration-300"
					>
						Copy text
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
						name="text"
						value={editableTodo.text}
						onChange={handleEditChange}
						placeholder="text"
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
						name="text"
						value={newTodo.text}
						onChange={handleAddChange}
						placeholder="text"
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