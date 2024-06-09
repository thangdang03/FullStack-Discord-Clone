"use client"
import { useContext, useEffect, useMemo, useState } from "react";
import { serverContext } from "@/lib/context";
import ChatHeader from "./header.chat";
import MessageItem from "./message";
import InputMessage from "./input.send";
import {Socket, io} from "socket.io-client"

const ChatPage = () => {
    const {channel} = useContext(serverContext);
    const [user,setUser]:any = useState();
    const ioSocket:Socket = io("http://localhost:4000");
    const [tem,setTem]:any = useState(); 
    const [type,setType] = useState<boolean>(false);
    useEffect(()=>{
        setTem(channel)
        if(channel?._id){
            if(channel.type === "text"){
                setType(false);
            }else{
                setType(true);
            }
            if( tem?._id && channel?._id !== tem?._id ){
                ioSocket.emit("change room",{roomLeave: tem,roomJoin: channel});
                console.log({roomLeave: tem.name,roomJoin: channel.name})
                return;
            }
            ioSocket.emit("joint-room",channel);
            
        }
    },[channel])
    useEffect(()=>{
        const tem:any =   localStorage.getItem("user");
        const User =   JSON.parse(tem);
        setUser(User);
    },[])
    
    return (  
        <div className="chat w-[81%] h-full"> 
            <ChatHeader 
                channel={channel}
                ioSocket={ioSocket} 
            />
            <MessageItem 
                channel={channel} 
                ioSocket={ioSocket}
                user={user}
            />
            {!type && 
                <InputMessage 
                    channel={channel}
                    ioSocket={ioSocket}
                />
            }
        </div>
    );
}
 
export default ChatPage;