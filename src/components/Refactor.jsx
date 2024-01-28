import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { db, auth } from '../FirebaseConfig'
import { addDoc, collection, Timestamp, query, orderBy, onSnapshot, deleteDoc, doc, updateDoc, where } from 'firebase/firestore'
import { v4 as uuidv4 } from 'uuid';
import { onAuthStateChanged } from 'firebase/auth';
function Clip() {
	const [todos, setTodos] = useState([]);
	const [detailModalIsOpen, setDetailModalIsOpen] = useState(false);
	const [editModalIsOpen, setEditModalIsOpen] = useState(false);
	const [addModalIsOpen, setAddModalIsOpen] = useState(false);
	const [selectedTodo, setSelectedTodo] = useState(null);
	const [isCopied, setIsCopied] = useState(false);
	const [editableTodo, setEditableTodo] = useState({ title: '', text: '', index: -1 });
	const [newTodo, setNewTodo] = useState({ title: '', text: '' });
	const [user, setUser] = useState(null);


	const openDetailModal = (todo) => {
		setSelectedTodo(todo);
		setDetailModalIsOpen(true);
	}

	const closeDetailModal = () => {
		setDetailModalIsOpen(false);
		setIsCopied(false);
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



	const submitEditTodo = async () => {
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

			const updatedTodo = { ...todos[index], title, text };
			const newTodos = [...todos];
			newTodos[index] = updatedTodo;
			setTodos(newTodos);

			closeEditModal();
			handleGetData(user?.uid);
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
			setNewTodo({ title: '', text: '' });
			closeAddModal();
		}
	}

	const deleteTodo = async (textGuid) => {
		try {
			await deleteDoc(doc(db, "Clip-code", textGuid));
			console.log("Document successfully deleted!");
			setTodos(todos.filter((todo) => todo?.id !== textGuid));
			handleGetData(user?.uid);
		} catch (error) {
			console.error("Error removing document: ", error);
		}
	}
	const copyToClipboard = text => {
		navigator.clipboard.writeText(text).then(() => {
			setIsCopied(true);
		}).catch(err => {
			console.error('Could not copy text: ', err);
		});
	};

	const pasteText = async (target) => {
		try {
			const text = await navigator.clipboard.readText();
			if (target === "edit") {
				setEditableTodo(prev => ({ ...prev, text: text }));
			} else if (target === "add") {
				setNewTodo(prev => ({ ...prev, text: text }));
			}
		} catch (error) {
			console.error('Failed to paste text from clipboard:', error);
		}
	};

	const handleSave = async () => {
		if (!user) return;

		try {
			await addDoc(collection(db, "Clip-code"), {
				text: newTodo.text,
				title: newTodo.title,
				userId: user.uid,
				date_created: Timestamp.now(),
				is_deleted: false
			});
			setNewTodo({ title: '', text: '' });
			handleGetData(user?.uid);
		} catch (err) {
			console.error(err);
		}
	};

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
			setUser(currentUser);
			if (currentUser) {
				console.log("currnt user", currentUser?.uid)
				handleGetData(currentUser?.uid);
			}
		});
		return () => unsubscribe();
	}, []);
	console.log("currnt user", user?.uid)
	const handleGetData = (userId) => {
		const q = query(collection(db, 'Clip-code'), where('userId', '==', userId), orderBy('date_created', 'desc'));
		onSnapshot(q, (querySnapshot) => {
			setTodos(querySnapshot.docs.map(doc => ({
				data: doc.data(),
				id: doc.id,
			})));
		});
	};


	return (
		<div className="container mx-auto px-4 sm:px-6 lg:px-8 min-h-screen">
			<button
				onClick={openAddModal}
				className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded-lg shadow-md transition duration-300"
			>
				Add Code
			</button>

			<div className="mt-6">
				{todos.map((todo, index) => (
					<div key={todo?.id} className="flex flex-col sm:flex-row items-center justify-between p-3 my-2 bg-white rounded-lg shadow border border-gray-200">
						<h3 onClick={() => openDetailModal(todo)} className="text-base sm:text-lg font-semibold text-gray-700 cursor-pointer hover:text-gray-900 transition duration-300">
							{todo?.data?.title}
						</h3>
						<div className="mt-2 sm:mt-0">
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
				<div className="bg-white rounded-lg shadow-xl p-4 sm:p-6 lg:p-8 max-w-lg mx-auto w-full" style={{ maxHeight: '80vh' }}>
					<h2 className="text-2xl font-bold text-gray-800 mb-4">{selectedTodo?.data?.title}</h2>
					<div className="mb-6 overflow-y-auto" style={{ maxHeight: '50vh' }}>
						<p className="text-gray-600">{selectedTodo?.data?.text}</p>
					</div>
					<button
						onClick={() => copyToClipboard(selectedTodo?.data?.text)}
						className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded-lg mr-4 transition duration-300"
						disabled={isCopied} // Disable button based on isCopied state
					>
						{isCopied ? 'Copied!' : 'Copy text'} {/* Change button text based on isCopied state */}
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
				className="fixed inset-0 flex items-center justify-center"
				overlayClassName="fixed inset-0 bg-black bg-opacity-50"
			>
				<div className="bg-white rounded-lg shadow-xl p-4 sm:p-6 lg:p-8 max-w-lg mx-auto w-full">
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
						placeholder="Text"
						className="border border-gray-300 p-3 rounded w-full mb-4 custom-scrollbar"
						style={{ height: '50vh', resize: 'none' }}
					/>
					<button
						onClick={() => pasteText("edit")}
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
				<div className="bg-white rounded-lg shadow-xl p-4 sm:p-6 lg:p-8 max-w-lg mx-auto">
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
						placeholder="Text"
						className="border border-gray-300 p-3 rounded w-full mb-4"
						style={{ height: '50vh', resize: 'none' }}
					/>
					<div className="flex justify-between">
						<button onClick={() => pasteText("add")} className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded-lg transition duration-300">
							Paste from Clipboard
						</button>
						<button onClick={submitNewTodo} className="bg-green-600 hover:bg-green-800 text-white font-bold py-2 px-4 rounded-lg transition duration-300">
							Add Todo
						</button>
					</div>
					<button onClick={closeAddModal} className="bg-gray-600 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded-lg mt-4 w-full transition duration-300">
						Cancel
					</button>
				</div>
			</Modal>
		</div>
	);

}

export default Clip;