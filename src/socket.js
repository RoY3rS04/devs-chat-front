import { io } from "socket.io-client";

const URL = import.meta.env.VITE_BACKEND_URL.split(':').slice(0, 2).map(i => i + ':').join('')+'3000';

export const socket = io(URL, {
    extraHeaders: {
        'x-token': localStorage.getItem('token')
    }
});