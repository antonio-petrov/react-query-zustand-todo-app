import axios from 'axios';
import { Todo } from './types';

const API_URL = 'https://jsonplaceholder.typicode.com/todos';

interface ApiTodo {
    id: number;
    title: string;
    completed: boolean;
    userId: number;
}

export const fetchTodos = async (): Promise<Todo[]> => {
    const { data } = await axios.get<ApiTodo[]>(API_URL);
    return data.slice(0, 5).map(todo => ({
        id: todo.id,
        text: todo.title, // Map the 'title' from API to 'text' in our Todo interface
        completed: todo.completed,
        createdAt: new Date(),
    }));
};