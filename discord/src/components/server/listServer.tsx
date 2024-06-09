'use client'
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import Image from "next/image"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "@/components/ui/tooltip"
import { useContext, useState } from "react"
import { serverContext } from "@/lib/context"

const ListServer = ({id,list}:{id:string,list:any}) => {
    const [serverID,setServerID] = useState("0");
    const {setServer}= useContext(serverContext);
    return (  
        <div className="listServer">
            <Separator className="py-[1px] bg-[#313338]"/>
            <ScrollArea  className="  w-[100%]  h-[600px] rounded-md">
                {list?.map( (data:any) =>{
                    return (
                        <div key={data?._id} className={` ml-3 mb-2 mr-2  rounded-full relative mt-[20px] hover:rounded-xl before:absolute before:w-[4px] 
                         before:bg-white before:top-[20px] before:left-[-11px] before:rounded-r-[1.5px] before:h-[7px]
                         transition-all 
                            ${serverID === data?._id ? " before:scale-y-[5.5] ":
                                "before:hover:scale-y-[1.7] before:hover:h-[10px]"
                            }
                        `}
                            onClick={()=>{
                                setServerID(data?._id);
                                setServer(data);
                            }}
                        >
                            <TooltipProvider>
                                <Tooltip >
                                    <TooltipTrigger className="w-full">
                                        <div className={` cursor-pointer rounded-[100%] flex justify-center
                                        items-center create_plush w-[100%] h-[44px] bg-[#313338] text-center
                                        `}
                                            key={data?._id}
                                        >
                                           <Image 
                                                className="object-cover my-3 bg-white rounded-full hover:rounded-xl  w-full h-full"
                                                src={`http://localhost:4000/${data?.imageUrl}`}
                                                alt={data?.name}
                                                width="100"
                                                height="100"
                                                loading="lazy"
                                            />
                                        </div>
                                    </TooltipTrigger>
                                    <TooltipContent className="left" side="left">
                                        <p>{data?.name}</p>
                                     </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </div>
                    )
                })}
            </ScrollArea>
        </div>
    );
}
 
export default ListServer;