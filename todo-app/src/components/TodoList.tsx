import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchTodos } from '../api';
import { useTodoStore } from '../store';
import TodoItem from './TodoItem';
import TodoFilter from './TodoFilter';
import { Todo } from '../types';

const TodoList: React.FC = () => {
  const [newTodo, setNewTodo] = useState('');
  const { todos, addTodo, filter, clearCompleted, setInitialTodos } =
    useTodoStore();
  const {
    data: apiTodos,
    isLoading,
    error,
  } = useQuery<Todo[], Error>({
    queryKey: ['todos'],
    queryFn: fetchTodos,
  });

  useEffect(() => {
    if (apiTodos) {
      setInitialTodos(apiTodos);
    }
  }, [apiTodos, setInitialTodos]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTodo.trim()) {
      addTodo(newTodo.trim());
      setNewTodo('');
    }
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  if (isLoading) return <div className='text-center'>Loading...</div>;
  if (error)
    return <div className='text-center text-red-500'>Error fetching todos</div>;

  return (
    <div className='max-w-2xl mx-auto'>
      <form onSubmit={handleSubmit} className='mb-4'>
        <input
          type='text'
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder='Add a new todo'
          className='w-full border p-2 rounded-lg'
        />
        <button
          type='submit'
          className='mt-2 w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600'
        >
          Add Todo
        </button>
      </form>
      <TodoFilter />
      <ul className='space-y-2'>
        {filteredTodos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </ul>
      {todos.some((todo) => todo.completed) && (
        <button
          onClick={clearCompleted}
          className='mt-4 w-full bg-red-500 text-white p-2 rounded-lg hover:bg-red-600'
        >
          Clear Completed
        </button>
      )}
    </div>
  );
};

export default TodoList;
