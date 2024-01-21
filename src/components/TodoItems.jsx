const TodoItem = ({ todo, openDetailModal, openEditModal, deleteTodo }) => {
	return (
		<div className="flex flex-col sm:flex-row items-center justify-between p-3 my-2 bg-white rounded-lg shadow border border-gray-200">
			<h3 onClick={() => openDetailModal(todo)} className="text-base sm:text-lg font-semibold text-gray-700 cursor-pointer hover:text-gray-900 transition duration-300">
				{todo.data.title}
			</h3>
			<div className="mt-2 sm:mt-0">
				<button onClick={() => openEditModal(todo.data, todo.id)} className="...">Edit</button>
				<button onClick={() => deleteTodo(todo.id)} className="...">Delete</button>
			</div>
		</div>
	);
};

export default TodoItem;
