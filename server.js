const WebSocket = require("ws");

const port = process.env.PORT || 8080; // Sử dụng PORT từ Render hoặc mặc định là 8080
const server = new WebSocket.Server({ port });

console.log(`WebSocket server is running on port ${port}`);

server.on("connection", (socket) => {
    console.log("Client connected!");

    socket.on("message", (message) => {
        console.log("Received:", message);

        // Gửi tin nhắn tới tất cả các client khác
        server.clients.forEach((client) => {
            if (client !== socket && client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    });

    socket.on("close", () => {
        console.log("Client disconnected!");
    });
});
