import io from 'socket.io-client'
const socket = io(process.env.WS_URL, { path: '/space/socket.io/'})

export default socket
