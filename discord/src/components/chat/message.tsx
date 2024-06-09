"use client"
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar } from "@/components/ui/avatar";
import { deleteMessage, getMessage, updateMessage } from "@/lib/callapi";
import {  useEffect, useState } from "react";
import { Socket } from "socket.io-client";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Delete, Edit, FileIcon, Loader2, ShieldAlert, Trash } from "lucide-react";
import { format, set } from 'date-fns';
import Image from "next/image";
import Welcome from "./welcome";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "../ui/button";
import PageVideo from "./channel.video";

const MessageItem = ({channel,ioSocket,user}
    :{channel:any,ioSocket:Socket,user:any}) => {
    const [message,setMessage]:any = useState([]);
    const [messageItem,setMessageItem]:any = useState();
    const [editContent,setEditContent]:any = useState();
    const [tem,setTem] = useState<boolean>(false);
    const [editText,setEditText] = useState<boolean>(false);
    const [page,setPage] = useState<number>(1);
    const [isFetch,setIsFetch] = useState<boolean>(false);
 
    ioSocket.on("message",async(data:any)=>{
        if(data ){
            getListMessage()
        }
    })

    const getListMessage = async () =>{
        const result = await getMessage(channel?._id,1);
        if(result){
            setMessage(result);
            if(result?.length < 15){
                setTem( true);
            }
            const scrollDiv:HTMLElement | null = document.getElementById("srollDiv");
            if(scrollDiv){
                scrollDiv.scrollTop = scrollDiv.scrollHeight | 614;
            }
        }
        
    }

    const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {    
        const position = (e.target as HTMLElement).scrollTop;
        if(position == 0 ){
            setPage((state:any) => state + 1);
            setIsFetch(true);
            const scrollDiv:HTMLElement | null = document.getElementById("srollDiv");
            if(scrollDiv){
                scrollDiv.scrollTop = 10;
            }
        }
    };

    const HandelPage = async() => {
        const result = await getMessage(channel?._id,page);
        if(result){
            setMessage((state:any)=> [...result,...state]);
            if(result?.length < 15){
                setTem( true);
                setIsFetch(false);
                return;
            }
            setIsFetch(false);
        }
    }

    const editMessage2 = async() =>{
        console.log(editContent)
        const result = await updateMessage(editContent,messageItem?._id);
        if(result == 200){
            console.log("check")
            getListMessage();
        }
    }

    const removeMessage = async() =>{
        console.log(editContent)
        const result = await deleteMessage(messageItem?._id);
        if(result == 200){
            console.log("check")
            getListMessage();
        }
    }

    useEffect(()=>{
        if(channel?._id){
            getListMessage();
            setPage(1);
            setTem(false);
        }
    },[channel])

    useEffect(()=>{
        if(page !== 1){
            HandelPage();
        }
    },[page])

    return (
        <>
        { channel?.type  === "text"  ?
            <div  className="w-full h-[664px] mt-[45px] px-5 overflow-scroll overflow-x-hidden " 
                id="srollDiv"
                onScroll={(e:any)=>{
                    handleScroll(e)
                }}
            >
                {isFetch && <Loader2  className="animate-spin text-[#b6b1ae] ml-[50%]" size={40}/> }
                {tem && <Welcome name={channel?.name} />}
                {message?.map((data:any,index:any)=>{
                
                    return(
                        <TooltipProvider key={data?._id} >
                            <div className="my-3  w-full"  id="scrollItem">
                                <Tooltip>
                                    <TooltipTrigger className=" rounded-sm p-2 flex w-[100%] hover:bg-zinc-700">
                                        <Avatar id="">
                                            <AvatarImage src={data?.userId.imageUrl} className="object-cover w-[50px]" />
                                            <AvatarFallback>
                                                {data?.userId.name.charAt(0)}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className="ml-[20px] text-left w-full ">
                                             <h5 className="text-[15px] ">{data?.userId.name} 
                                                {channel?.userId == data?._id && 
                                                    <ShieldAlert className="text-red-500 inline" size={15} />
                                                }
                                                <span className="text-zinc-400 text-[11px] ml-[5px] ">
                                                    {format(data?.updatedAt,"dd/MM/yyyy HH:mm")}
                                                </span>
                                            </h5>
                                            {editText && data?._id == messageItem._id ?
                                                <div >
                                                    <input className="bg-transparent w-[100%] bg-zinc-900 focus:outline-none p-3 rounded-sm" type="text" id="editContent "  
                                                    onChange={(e)=>{setEditContent(e.target.value)}} value={editContent} />
                                                    <Button className="ml-[92%] mt-2" onClick={()=>{setEditText(false);editMessage2()}}> save </Button>
                                                </div>:
                                                <p className="text-[13px] ">
                                                     {data?.delete ? <span className="text-zinc-400">this message is have delete</span>
                                                        : data?.content}
                                                </p>
                                            }
                                            {data?.file && 
                                                 <div className="bg-zinc-500 w-fit h-fit rounded-sm ">
                                                    {data?.type === "image/jpeg" ?
                                                        <Image 
                                                            className="h-fit w-[300px] object-cover rounded-md" 
                                                            alt={`${data?._id}`}
                                                            src={`http://localhost:4000/${data?.file}`}
                                                            height={50}
                                                            width={150}
                                                            loading="lazy"
                                                            unoptimized
                                                        />:
                                                        <div className=" p-[10px] h-[70px] flex justify-center items-center my-3 bg-zinc-800 rounded-sm">
                                                            <FileIcon  className="text-purple-700 " size={40}/> 
                                                            <a  className="text-blue-700 underline" href={`http://localhost:4000/${data?.file}`}>PDF file</a>
                                                        </div>
                                                    }
                                                 </div>
                                            }

                                        </div>
                                    </TooltipTrigger>
                                   {!editText &&  user.id == data?.userId._id && !data?.delete &&
                                        <TooltipContent className=" relative bottom-4 transition-all bg-zinc-900  " side="right"  sideOffset={-95} >
                                            <Edit onClick={()=>{setMessageItem(data);setEditContent(data?.content);setEditText(true)}} className=" mx-2 inline cursor-pointer text-zinc-600 hover:text-white" size={19}/>
                                            <Trash onClick={()=>{setMessageItem(data);removeMessage() }} className=" mx-2 inline cursor-pointer text-zinc-600 hover:text-white" size={19} />
                                        </TooltipContent>
                                    }
                                </Tooltip>
                            </div>
                        </TooltipProvider>

                    );
                })}
            </div >:
            <PageVideo
                room={channel?._id}
            />
        }
        </>
    );
}
 
export default MessageItem;