// src/App.js
import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { db } from '../FirebaseConfig'
import { addDoc, collection, Timestamp, query, orderBy, onSnapshot, deleteDoc, doc, updateDoc } from 'firebase/firestore'
import { v4 as uuidv4 } from 'uuid';
import TodoList from './TodoList';
import DetailModal from './DetailModal';
import EditModal from './EditModal';
import AddTodoModal from './AddTodo';
function SumUp() {
	const [todos, setTodos] = useState([]);
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
		<div className="container mx-auto px-4 sm:px-6 lg:px-8 min-h-screen">
			<button onClick={openAddModal} className="...">Add Todo</button>

			<TodoList
				todos={todos}
				openDetailModal={openDetailModal}
				openEditModal={openEditModal}
				deleteTodo={deleteTodo}
			/>

			<DetailModal
				isOpen={detailModalIsOpen}
				onRequestClose={closeDetailModal}
				todo={selectedTodo}
			/>

			<EditModal
				isOpen={editModalIsOpen}
				onRequestClose={closeEditModal}
				todo={editableTodo}
				handleEditChange={handleEditChange}
				submitEditTodo={submitEditTodo}
				pasteText={pasteText}
			/>

			<AddTodoModal
				isOpen={addModalIsOpen}
				onRequestClose={closeAddModal}
				newTodo={newTodo}
				handleAddChange={handleAddChange}
				submitNewTodo={submitNewTodo}
				pasteText={pasteText}
			/>
		</div>
	);

}

export default SumUp;