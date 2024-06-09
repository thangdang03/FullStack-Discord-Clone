'use client'
import { Edit, Plus, User } from "lucide-react";
import { useEffect, useState } from "react";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "@/components/ui/tooltip"
import ListServer from "./listServer";
import UserItem from "../common/user.item";
import { getServerById, loginSuccess } from "@/lib/callapi";
import CreateServer from "./createServer";

  
const Navigation = ({id}:{id:string}) => {
    const [listSerer,setListServer]:any = useState([]);
    const [open,setOpen] = useState(false);
    const [tem,setTem] = useState(false);
    
    const getList = async ()=> {
        const result = await getServerById(id);
        setListServer(result);
    }

    const setUser = async () => {
        const newToken = await loginSuccess(id); 
        if(newToken){
            getList();
            setTem(true);
        }
    }

    useEffect(()=>{
        setUser();
    },[])
    
    return (  
        <div className="navigation w-[4%] bg-[#1b1d1f] h-screen ">
            <CreateServer 
                open={open}
                setOpen={setOpen}
                getList={getList}
                edit={false}
            />
            
            <TooltipProvider>
                <Tooltip >
                <TooltipTrigger className="w-full p-2 h-fit" >
                    <div className=" cursor-pointer rounded-[100%] flex justify-center
                        items-center create_plush w-[90%] h-[40px] bg-[#313338] text-center
                      hover:bg-green-500 group-hover:text-emerald-500 hover:rounded-xl transition-all"
                        onClick={()=>{setOpen(true)}}>
                            <Plus
                                className=" bg-transparent  group-hover:text-emerald-500 transition  text-white"
                                size={20}
                            />
                    </div>    
                </TooltipTrigger>
                <TooltipContent className="left" side="left">
                    <p>Create Server</p>
                 </TooltipContent>
                </Tooltip>
            </TooltipProvider>
            <ListServer 
                id={id}
                list={listSerer}
            />
            <div className="action ml-[4%] mt-auto px-3">
                {tem &&  <UserItem ></UserItem>}
            </div>
        </div>
    );
}
 
export default Navigation;