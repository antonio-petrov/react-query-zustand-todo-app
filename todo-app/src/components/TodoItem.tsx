import React from 'react';
import { Todo } from '../types';
import { useTodoStore } from '../store';

interface TodoItemProps {
  todo: Todo;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
  const { toggleTodo, removeTodo } = useTodoStore();

  return (
    <li className='flex items-center justify-between p-4 bg-white shadow-md rounded-lg mb-2'>
      <div className='flex items-center'>
        <input
          type='checkbox'
          checked={todo.completed}
          onChange={() => toggleTodo(todo.id)}
          className='mr-2 h-5 w-5'
        />
        <span
          className={`${todo.completed ? 'line-through text-gray-500' : ''}`}
        >
          {todo.text || 'Untitled Todo'}
        </span>
      </div>
      <button
        onClick={() => removeTodo(todo.id)}
        className='text-red-500 hover:text-red-700'
      >
        Delete
      </button>
    </li>
  );
};

export default TodoItem;
