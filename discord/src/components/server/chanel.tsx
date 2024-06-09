'use client'
import { useContext, useEffect, useState } from "react";
import InviteItem from "../common/invate.input";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {getChannel, getMemberByServerId, leaveFromServer } from "@/lib/callapi";
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronDown, CirclePlus, Delete, Edit, Hash, Lock, LogOut, Mic, Plus,
         SearchIcon, Settings, User, UserPlus, 
         VideoIcon} from "lucide-react";
import {
   Tooltip,
   TooltipContent,
   TooltipProvider,
   TooltipTrigger,
} from "@/components/ui/tooltip"
import { Avatar, AvatarFallback ,AvatarImage } from "@/components/ui/avatar";
    
import { serverContext } from "@/lib/context";
import CreateServer from "./createServer";
import ManagerMember from "../member/manager.member";
import CreateChanel from "../chanel/create.chanel";
import Leave from "./delete.server";
import { Search } from "./search";
import { Button } from "../ui/button";
import EditChannel from "../chanel/edite.Channel";
import { DeleteChannel } from "../chanel/delete.channle";

const ChanelPage = () => {
    const [open,setOpen] = useState(false);
    const [editServer,setEditServer] = useState(false);
    const [editMember,setEditMember] = useState(false);
    const [createChannel,setCreateChannel] = useState(false);
    const [editChannel,setEditChannel] = useState(false);
    const [editDelete,setEditDelete] = useState(false);
    const [editDeleteChannel,setEditDeleteChannel] = useState(false);
    const [editSearch,setEditSearch] = useState(false);
    const [admin,setAdmin] = useState(false);
    const [roles,setRoles] = useState("");
    const [type,setType] = useState("");
    const  [listMember,setListMember] = useState([]);
    const  [listChannel,setListChannel] = useState([]);
    
    const {server,channel,setChannel}= useContext(serverContext);
    const getMember = async()=>{
        const result = await getMemberByServerId(server?._id);
        if(typeof(result) === "number"){
            alert("error");
            return;
        }
        setListMember(result);
        setEditMember(true)
    }
    const leaveServer = async() =>{
        const result = await leaveFromServer(server._id);
        console.log(result);
        if(result == 200){
            location.reload();
            return;
        }
    }

    const search = async()=>{
        const resultMember = await getMemberByServerId(server?._id);
        const resultChannel = await getChannel(server?._id);
        if(typeof(resultMember) === "number" && typeof(resultChannel) === "number" ){
            alert("error");
            return;
        }
        setListMember(resultMember);
        setListChannel(resultChannel);
        setEditSearch(true);

    }
    const groupFunction =async()=>{
        const tem:any = localStorage.getItem("user");
        const user = JSON.parse(tem);
        const resultMember = await getMemberByServerId(server?._id);
        const resultChannel = await getChannel(server?._id);
        if(typeof(resultMember) === "number" && typeof(resultChannel) === "number" ){
            alert("error");
            return;
        }
        await setListMember(resultMember);
        await setListChannel(resultChannel);
        resultMember?.map((data:any)=>{
            if(data?.userID._id == user.id){
                setRoles(data?.roles);
            }
        })
    }
    
    useEffect(()=>{
        const tem:any = localStorage.getItem("user");
        const user = JSON.parse(tem);
        if(server?._id){
            groupFunction();
        }
        if(user){
            if(server?.userID == user.id ){  
                setAdmin(true);
            }else{
                setAdmin(false);
            }
        }
    },[server]);

    return (  
        <>
            <CreateServer 
                open={editServer}
                setOpen={setEditServer}
                getList={()=>{}}
                edit={true}
            />

            <ManagerMember
                open={editMember}
                setOpen={setEditMember}
                listMember={listMember}
                admin={admin}
                groupFunction={groupFunction}
            />
            <CreateChanel
                open={createChannel}
                setOpen={setCreateChannel}
                groupFunction={groupFunction}
            />
            <Leave
                open={editDelete}
                setOpen={setEditDelete}
            />
            <Search 
                open= {editSearch}
                listMember={listMember}
                listChannel={listChannel}
                setOpen={setEditSearch}
            />
            <EditChannel
                open={editChannel}
                setOpen={setEditChannel}
                groupFunction={groupFunction}
                channelId={channel?._id}
                type={type}
            />
            <DeleteChannel
                open={editDeleteChannel}
                setOpen={setEditDeleteChannel}
                groupFunction={groupFunction}
            />
            <div className="container p-0 w-[15%] bg-[#26282c] m-0 ">
                <div className="item h-fit w-[100%]">
                    {!server?._id ? 
                        <DropdownMenu >
                            <DropdownMenuTrigger  className=" shadow-xl font-semibold w-full h-[40px] flex flex-nowrap justify-center text-[14px] items-center">
                                Server <ChevronDown size="15" className="mx-2" />
                            </DropdownMenuTrigger>
                        </DropdownMenu>:
                        <>
                            <DropdownMenu >
                            <DropdownMenuTrigger  className="pl-2 shadow-xl font-semibold w-full h-[40px] flex flex-nowrap justify-center text-[14px] items-center">
                                {server?.name} <ChevronDown size="15" className="ml-auto py-[15]" />
                            </DropdownMenuTrigger>
                            {admin ?
                                <DropdownMenuContent  className="w-auto ">
                                    <DropdownMenuItem onClick={()=>{setOpen(true)}} className="w-[210px] text-indigo-600 dark:text-indigo-400  px-3 py-2 text-sm cursor-pointer">
                                        Invite People <UserPlus className="h-4 w-4 ml-auto"/>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={()=>{setEditServer(true)}} className="px-3 pv-2 text-sm cursor-pointe" >
                                        Server Editing <Settings className="h-4 w-4 ml-auto" />
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={()=>{getMember()}}className="px-3 pv-2 text-sm cursor-pointe" >
                                        Manager Members <User className="h-4 w-4 ml-auto"/>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={()=>{setCreateChannel(true)}} className="px-3 pv-2 text-sm cursor-pointe" >
                                        Create Channel <CirclePlus className="h-4 w-4 ml-auto"/>
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator/>
                                    <DropdownMenuItem onClick={()=>{setEditDelete(true)}} className="px-3 pv-2 text-sm text-red-500    cursor-pointe" >
                                        Delete Servers <Delete className="h-4 w-4 ml-auto"/>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>:
                                <DropdownMenuContent onClick={()=>{leaveServer()}} className="w-auto ">
                                    <DropdownMenuItem  className="w-[210px] text-red-600 dark:text-red-400  px-3 py-2 text-sm cursor-pointer">
                                        Leave Server <LogOut className="h-4 w-4 ml-auto"/>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            }
                            </DropdownMenu>
                        </>
                    }
                    {server?._id &&
                        <div className="w-full p-2 text-[12px]">
                            <Button onClick={()=>{search()}} className="flex w-full bg-[#26282c]  text-[#b6b1ae] hover:bg-[#60686b]">
                                <p className="mr-auto"><SearchIcon className="inline mr-1" size={20}/>Search </p>
                                <span className="bg-[#1b1d1f] borer rounded px-1 text-[8px]  ">⌘K</span>
                            </Button>
                            <Separator className=" bg-zinc-700 mt-2"/>
                            <ScrollArea className="w-full mt-3 " >
                                <TooltipProvider>
                                    <div className="textChannel  dark:text-[#b6b1ae] w-full">
                                       <div className="item_channel  w-full  my-3 ">
                                            <p className="inline mr-[43%] text-[13px]">TEXT CHANNEL</p>
                                            <Plus onClick={()=>{setCreateChannel(true)}} className="inline cursor-pointer" size={20}/>
                                       </div>
                                        {listChannel?.map((data:any)=>{
                                            if(data?.type == "text"){
                                                return(
                                                    <Tooltip key={data?._id}  >
                                                        <TooltipTrigger onClick={()=>{setChannel(data)}} className={`w-full text-left transition
                                                           ${data?._id === channel?._id ? "bg-zinc-600 rounded" : "hover:bg-zinc-600 rounded"}`}>
                                                            <div className="button_item text-white pl-4 my-1 text-[13px]">
                                                                <Hash  className="inline mr-1" size={15}/>
                                                                {data?.name}
                                                                {data?.name == "general" && <Lock className="ml-[57%] inline" size={15}/>}
                                                            </div>
                                                        </TooltipTrigger>
                                                        {data?.name != "general" &&
                                                            <TooltipContent className="border-none shadow-none bg-transparent" side="right" sideOffset={-70} >
                                                            {roles == "ADMIN" &&
                                                                <div className="flex gap-2 items-center">
                                                                    <Edit onClick={()=>{ setChannel(data) ;setType("text");setEditChannel(true)}} size={18} className="cursor-pointer hover:bg-zinc-600"/>
                                                                    <Delete  onClick={()=>{ setChannel(data) ;setEditDeleteChannel(true)}} size={18}  className="cursor-pointer hover:bg-zinc-600"/>
                                                                </div>
                                                            }
                                                        </TooltipContent>
                                                        }
                                                    </Tooltip>
                                                )
                                            }
                                        })}
                                    </div>
                                    <div className="voiceChannel  dark:text-[#b6b1ae] w-full">
                                       <div className="item_channel  w-full   my-3 ">
                                            <p className="inline mr-[40%] text-[13px] ">VOICE CHANNEL</p>
                                            <Plus onClick={()=>{setCreateChannel(true)}} className="inline cursor-pointer" size={20}/>
                                       </div>
                                        {listChannel?.map((data:any)=>{
                                            if(data?.type == "voice"){
                                                return(
                                                    <Tooltip key={data?._id}  >
                                                        <TooltipTrigger onClick={()=>{setChannel(data)}} className="w-full text-left hover:bg-zinc-600 transition-none rounded">
                                                            <div className=" text-[13px] button_item text-white pl-4 my-1">
                                                                <Mic className="inline mr-1" size={18}/>
                                                                {data?.name}
                                                            </div>
                                                        </TooltipTrigger>
                                                        <TooltipContent className="border-none shadow-none bg-transparent" side="right" sideOffset={-70} >
                                                            {roles == "ADMIN" &&
                                                                <div className="flex gap-2 items-center">
                                                                    <Edit  onClick={()=>{ setChannel(data) ;setType("voice");setEditChannel(true)}} size={18} className="cursor-pointer hover:bg-zinc-600"/>
                                                                    <Delete size={18} onClick={()=>{ setChannel(data) ;setEditDeleteChannel(true)}} className="cursor-pointer hover:bg-zinc-600"/>
                                                                </div>
                                                            }
                                                        </TooltipContent>
                                                    </Tooltip>
                                                )
                                            }
                                        })}
                                    </div>
                                    <div className="videoChannel  dark:text-[#b6b1ae] w-full">
                                       <div className="item_channel  w-full my-3">
                                            <p className="inline mr-[40%] text-[13px]  ">VIDEO CHANNEL</p>
                                            <Plus onClick={()=>{setCreateChannel(true)}} className="inline cursor-pointer" size={20}/>
                                       </div>
                                        {listChannel?.map((data:any)=>{
                                            if(data?.type == "video"){
                                                return(
                                                    <Tooltip key={data?._id}  >
                                                        <TooltipTrigger onClick={()=>{setChannel(data)}} className="w-full text-left hover:bg-zinc-600 transition-none rounded">
                                                            <div className="text-[13px] button_item text-white pl-4 my-1">
                                                                <VideoIcon className="inline mr-2" size={18}/>
                                                                {data?.name}
                                                            </div>
                                                        </TooltipTrigger>
                                                        <TooltipContent className="border-none shadow-none bg-transparent" side="right" sideOffset={-70} >
                                                            {roles == "ADMIN" &&
                                                                <div className="flex gap-2 items-center">
                                                                    <Edit onClick={()=>{ setChannel(data) ;setType("video");setEditChannel(true)}} size={18} className="cursor-pointer hover:bg-zinc-600"/>
                                                                    <Delete onClick={()=>{ setChannel(data) ;setEditDeleteChannel(true)}} size={18}  className="cursor-pointer hover:bg-zinc-600"/>
                                                                </div>
                                                            }
                                                        </TooltipContent>
                                                    </Tooltip>
                                                )
                                            }
                                        })}
                                    </div>
                                    <div className="memberChannel  dark:text-[#b6b1ae] w-full my-3">
                                       <div className="item_channel  w-full">
                                            <p className="inline mr-[28%] text-[13px]   my-3 ">MEMBERS CHANNEL</p>
                                            <Settings onClick={()=>{setEditMember(true)}} className="inline cursor-pointer" size={20}/>
                                       </div>
                                       {listMember?.map((data:any)=>{
                                            return(
                                                <div key={data?._id} className="flex rounded-md items-center gap-2 px-3 py-1 hover:bg-zinc-600 cursor-pointer">
                                                    <Avatar className="w-[30px] h-[30px]" >
                                                      <AvatarImage className="object-cover"   src={`${data?.userID.imageUrl}`}   />
                                                      <AvatarFallback>{data?.userID.name.charAt(0) }</AvatarFallback>
                                                    </Avatar>
                                                    <p className="inline text-[15px] text-white">{data?.userID.name}</p>
                                                </div>
                                            )
                                       })}
                                    </div>
                                </TooltipProvider>
                            </ScrollArea>
                        </div>
                    }
                </div>
            </div>
            <InviteItem open={open} setOpen={setOpen}  />
        </>
    );
}

export default ChanelPage;

  