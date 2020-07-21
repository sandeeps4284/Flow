const path = require('path')
const express = require('express')
const http = require('http')
const WebSocket = require('ws')
const app = express()
const httpServer = http.createServer(app)

const PORT = process.env.PORT || 3000

const flow = new WebSocket.Server({ server: httpServer }, 
    () => console.log(`flow is listening at ws://localhost:${WS_PORT}`))

let connectedClients = []

flow.on('connection', (ws, req) => {
    console.log('Connected')
    connectedClients.push(ws)
     ws.on('message', data => {
        connectedClients.forEach((ws, i) => {
            if (ws.readyState === ws.OPEN) { 
                ws.send(data) 
            } else { 
                connectedClients.splice(i, 1)
            }
        });
    });
});



// HTTP
//app.use(express.static('/Captura'));
// app.get('/stream', function(req, res) {
//     res.sendFile('E:/Flow/wsServer/stream.html');
// }); 
app.get('/client', (req, res) => res.sendFile(path.resolve(__dirname, './client.html')))
app.get('/server', (req, res) => res.sendFile(path.resolve(__dirname, './server.html')))
app.get('/', (req, res) => {
    res.send(`
        <a href="server">Server</a><br>
        <a href="client">Client</a>
    `);
})

httpServer.listen(PORT, () => console.log(`listening at http://localhost:${PORT}`))