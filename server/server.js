const app = require('./app');
const port = process.env.Port;
const http =require("node:http");
const { urlClient } = require('./config/conn.common');
const socketIo =require( "socket.io");
const server = http.createServer(app);
const io =  socketIo(server,{
    cors:{
        origin: urlClient,
        methods: ["GET","POST"] 
    }
});

io.on("connection",(socket)=>{
    console.log("user connect",socket.id);
    socket.emit("status",{status: true,id: socket.id});
    socket.on("joint-room",(data)=>{
        if(data?._id){
            socket.join(data._id);
        }
    });

    socket.on("change room",(data)=>{
        if(data?.roomLeave._id && data?.roomJoin._id){
            socket.leave(data?.roomLeave._id);
            socket.join(data?.roomJoin._id);
        }
    });

    socket.on("sendMessage",(data)=>{
        if(data?.channelId){
            io.to(data.channelId).emit("message",data.message);
        }
    });
    
    socket.on("disconnect",()=>{
        console.log("disconnect",socket.id);
    })
})

server.listen(port ? port : 4000 , ()=>{
    console.log("server is running in port",port);
});

process.on("SIGINT",()=>{
    console.log("server is interup");
})

