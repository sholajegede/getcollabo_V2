const io = require('socket.io')(8000, {
    cors :{ 
        origin: [
            "http://localhost:3000",
            "https://test.getcollabo.io",
            "https://beta.getcollabo.io",
            "https://getcollabo.io"
        ],
    },
});

let activeUsers = [];

io.on("connection", (socket) => {

  socket.on("new-chat-user", (newChatUserId) => {

    if (!activeUsers.some((chatUser) => chatUser.id === newChatUserId)) {
      activeUsers.push({ id: newChatUserId, socketId: socket.id });
      console.log("New Chat User Connected", activeUsers);
    }

    io.emit("get-chat-users", activeUsers);
  });

  socket.on("disconnect", () => {

    activeUsers = activeUsers.filter((chatUser) => chatUser.socketId !== socket.id);
    console.log("User Disconnected", activeUsers);
  
    io.emit("get-chat-users", activeUsers);
  });
  
  socket.on("send-message", (data) => {
    const { receiverId } = data;
    const user = activeUsers.find((chatUser) => chatUser.id === receiverId);
    console.log("Sending from socket to : ", receiverId)
    console.log("Data: ", data)

    if (user) {
      io.to(user.socketId).emit("receive-message", data);
    }
  });
});
