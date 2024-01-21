const DetailModal = ({ isOpen, onRequestClose, selectedTodo }) => {
	return (
		<Modal
			isOpen={isOpen}
			onRequestClose={onRequestClose}
			className="fixed inset-0 flex items-center justify-center"
			overlayClassName="fixed inset-0 bg-black bg-opacity-50"
		>
			<div className="bg-white rounded-lg shadow-xl p-4 sm:p-6 lg:p-8 max-w-lg mx-auto w-full" style={{ maxHeight: '80vh' }}>
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
					onClick={onRequestClose}
					className="bg-gray-600 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
				>
					Close
				</button>
			</div>
		</Modal>
	);
};

export default DetailModal;
