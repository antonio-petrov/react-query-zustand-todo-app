import React from 'react';
import { TodoFilter } from '../types';
import { useTodoStore } from '../store';

const TodoFilterComponent: React.FC = () => {
  const { filter, setFilter } = useTodoStore();

  const filters: TodoFilter[] = ['all', 'active', 'completed'];

  return (
    <div className='flex justify-center space-x-4 mb-4'>
      {filters.map((f) => (
        <button
          key={f}
          onClick={() => setFilter(f)}
          className={`px-4 py-2 rounded ${
            filter === f
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          {f.charAt(0).toUpperCase() + f.slice(1)}
        </button>
      ))}
    </div>
  );
};

export default TodoFilterComponent;
