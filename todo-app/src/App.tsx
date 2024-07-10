import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import TodoList from './components/TodoList';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className='min-h-screen bg-gray-100 py-8'>
        <div className='container mx-auto px-4'>
          <h1 className='text-4xl font-bold text-center mb-8'>Todo App</h1>
          <TodoList />
        </div>
      </div>
    </QueryClientProvider>
  );
}

export default App;
