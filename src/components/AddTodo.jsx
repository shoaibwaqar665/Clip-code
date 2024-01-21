import Modal from 'react-modal';
const AddTodoModal = ({ addModalIsOpen, closeAddModal, newTodo, handleAddChange, submitNewTodo, pasteText }) => {
	return (
		<Modal
			isOpen={addModalIsOpen}
			onRequestClose={closeAddModal}
			className="fixed inset-0 flex items-center justify-center"
			overlayClassName="fixed inset-0 bg-black bg-opacity-50"
		>
			<div className="bg-white rounded-lg shadow-xl p-4 sm:p-6 lg:p-8 max-w-lg mx-auto">
				<input
					name="title"
					value={newTodo?.title}
					onChange={handleAddChange}
					placeholder="Title"
					className="border border-gray-300 p-3 rounded w-full mb-4"
				/>
				<textarea
					name="text"
					value={newTodo?.text}
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
	);
};

export default AddTodoModal;
