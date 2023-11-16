import { io } from "socket.io-client";

const URL = import.meta.env.VITE_BACKEND_URL;

export const socket = io(URL, {
    extraHeaders: {
        'x-token': localStorage.getItem('token')
    }
});