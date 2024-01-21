const EditModal = ({ editModalIsOpen, closeEditModal, editableTodo, handleEditChange, submitEditTodo, pasteText }) => {
	return (
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
	);
};

export default EditModal;
