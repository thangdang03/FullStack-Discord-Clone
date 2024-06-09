'use client'
import { Plus,  } from "lucide-react";
import { useState } from "react";
import { Socket } from "socket.io-client";
import UploadFile from "./file.uppload";
import IconTrigger from "./icon.triger";
import { createMessage } from "@/lib/callapi";

const InputMessage = ({ioSocket,channel}:{ioSocket:Socket,channel:any}) => {
    const [content,setContent]:any  = useState(null);
    const [file,setFile]:any = useState(null);
    const [open,setOpen] = useState(false);
    const sendMessage = async ()=>{
        console.log({id: channel?._id,file,content});
        if(channel?._id !== undefined ){
            console.log("check")
            const result  = await createMessage(content,file,channel?._id);
            if(result == 201){
                
                ioSocket.emit("sendMessage",{
                    channelId: channel?._id,
                    message: true
                });
                setContent("");
                setFile(null);

            }
        }
    }
    return (  
        <div  className="w-[78%] fixed bottom-0  bg-zinc-700  h-fit mb-5  rounded mx-5">
            <UploadFile
                open={open}
                setOpen={setOpen}
                File={file}
                setFile={setFile}
            />
            <form action="" className="w-full h-[49px] flex justify-center items-center" onSubmit={(e)=>{ e.preventDefault();sendMessage()}}>
                <Plus onClick={()=>{setOpen(true)}} className="bg-[#b5bac1] text-zinc-700 inline rounded-full cursor-pointer" size={23}/>
                <input  className="h-[80%] w-[94%]  p-[20px] bg-zinc-700 focus:outline-none   " placeholder="some text ..." 
                  value={content} onChange={(e)=>{setContent(e.target.value)}} type="text" name="content" id="content" />
                <IconTrigger
                    content={content}
                    setContent={setContent}
                />
            </form>
        </div>
    );
}
 
export default InputMessage;