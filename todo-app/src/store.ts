import create from 'zustand';
import { Todo, TodoFilter } from './types';

interface TodoStore {
    todos: Todo[];
    filter: TodoFilter;
    addTodo: (text: string) => void;
    toggleTodo: (id: number) => void;
    removeTodo: (id: number) => void;
    setFilter: (filter: TodoFilter) => void;
    clearCompleted: () => void;
    setInitialTodos: (todos: Todo[]) => void; // New action to set initial todos from API
}

export const useTodoStore = create<TodoStore>((set) => ({
    todos: [],
    filter: 'all',
    addTodo: (text) =>
        set((state) => ({
            todos: [
                ...state.todos,
                { id: Date.now(), text, completed: false, createdAt: new Date() },
            ],
        })),
    toggleTodo: (id) =>
        set((state) => ({
            todos: state.todos.map((todo) =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            ),
        })),
    removeTodo: (id) =>
        set((state) => ({
            todos: state.todos.filter((todo) => todo.id !== id),
        })),
    setFilter: (filter) => set({ filter }),
    clearCompleted: () =>
        set((state) => ({
            todos: state.todos.filter((todo) => !todo.completed),
        })),
    setInitialTodos: (initialTodos) =>
        set((state) => ({
            todos: [...state.todos, ...initialTodos],
        })),
}));