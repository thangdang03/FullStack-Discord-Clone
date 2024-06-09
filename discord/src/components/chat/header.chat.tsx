import { Hash } from "lucide-react";
import { useState } from "react";
import { Socket } from "socket.io-client";

const ChatHeader = ({channel,ioSocket}:{channel:any,ioSocket:Socket}) => {
    const [status,setStatus] = useState(false);
    ioSocket.on("status",(data:any)=>{
        setStatus(data.status);
    });
    return (  
        <div className="fixed top-0 w-full pl-[20px] h-[38px] leading-[38px] shadow-xl"  >
            <Hash className="inline mr-1 mb-1" size={20}/>
            {channel?.name ? channel?.name:"Server"} 
            {status? 
                <p className="inline absolute top-[10px] left-[65%] px-[13px] text-[13px]
                 rounded-[50px] h-[60%] bg-green-700 leading-[25px] font-semibold">
                    live: Realtime update 
                </p> :  
                <p className="inline absolute top-[10px] left-[65%] px-[13px] text-[13px]
                rounded-[50px] h-[60%] bg-orange-700 leading-[25px] font-semibold">
                   Fallback: ready to connect
                </p>
            }
        </div>
    );
}
 
export default ChatHeader;