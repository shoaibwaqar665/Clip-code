import TodoItem from './TodoItem';

const TodoList = ({ todos, openDetailModal, openEditModal, deleteTodo }) => {
	return (
		<div className="mt-6">
			{todos.map((todo) => (
				<TodoItem
					key={todo.id}
					todo={todo}
					openDetailModal={openDetailModal}
					openEditModal={openEditModal}
					deleteTodo={deleteTodo}
				/>
			))}
		</div>
	);
};

export default TodoList;
