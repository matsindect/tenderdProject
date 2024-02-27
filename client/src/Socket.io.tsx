import { io } from 'socket.io-client';

const socket = io('http://localhost:8082');

export default socket;