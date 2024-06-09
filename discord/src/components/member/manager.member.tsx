"use client"
import {
    DialogContent,
    DialogDescription,
    DialogHeader,
    Dialog,
    DialogTitle,
} from "@/components/ui/dialog"
import {BookUser, MoreVertical, ShieldAlert, User, UserRoundCog, UserRoundX } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuTrigger, 
    DropdownMenuContent, DropdownMenuItem ,DropdownMenuSeparator, 
    DropdownMenuGroup ,DropdownMenuSub, 
    DropdownMenuSubContent,
    DropdownMenuSubTrigger} from "@radix-ui/react-dropdown-menu";
import { KickMember, authenticationRoles } from "@/lib/callapi";

const ManagerMember = ({open,setOpen,listMember,admin,groupFunction}:
    {open:boolean,setOpen:(val: boolean)=> void,listMember:any,admin:boolean,groupFunction:()=>void}) => {
    
    const autUser = async (roles:string,memberId:string) => {
        const result = await authenticationRoles(memberId,roles);
        if(result == 200){
            await groupFunction();
            return;
        }
    }

    const kickUser = async (memeberId:string) =>{
        const result = await KickMember(memeberId);
        if(result == 200){
            await groupFunction();
            return;
        }
    }

    return (  
        <Dialog open={open} onOpenChange={()=>{setOpen(false)}}>
            <DialogContent className="bg-white text-black  ">
                <DialogHeader  >
                    <DialogTitle className="text-center font-semibold text-[170%]"> MANAGE MEMBERS</DialogTitle>
                    <DialogDescription className="text-center">{listMember?.length} Members </DialogDescription>
                </DialogHeader>

                {listMember?.map((data:any)=>{
                    return(
                        <div className="item flex gap-2 items-center" key={data?._id}>
                            <Avatar >
                                <AvatarImage src={data?.userID.imageUrl}  alt="item Member Image" />
                                <AvatarFallback>{data?.userID.name}</AvatarFallback>
                            </Avatar>
                            <div className="informListMember w-[90%] ">
                                <h2 className="font-semibold">{data?.userID.name} {data?.roles == "ADMIN" && 
                                    <ShieldAlert className="text-red-500 inline" size={15} />}</h2>
                                {data?.email &&  <span className="text-[#b6b1ae]">{data?.email}</span>}
                            </div>
                            <div className="icon w-[10%]">
                                {admin && data?.roles != "ADMIN" && 
                                    <DropdownMenu>
                                        <DropdownMenuTrigger>
                                            <MoreVertical size={17}/>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent className="bg-zinc-900 text-[#b6b1ae] rounded ">
                                            <DropdownMenuGroup className="">
                                                <DropdownMenuSub  >
                                                    <DropdownMenuSubTrigger className="p-2 hover:bg-zinc-800 cursor-pointer rounded">
                                                        <DropdownMenuItem >
                                                            <span className="mr-[33px] inline text-[12px] ">Roles</span>
                                                            <UserRoundCog size={15} className="  inline" />
                                                        </DropdownMenuItem>
                                                    </DropdownMenuSubTrigger>
                                                    <DropdownMenuSubContent sideOffset={-175}  className="z-99 bg-zinc-700  text-white rounded">
                                                        <DropdownMenuItem onClick={()=>{autUser("MANAGER",data?._id)}} className="text-[#b6b1ae] p-2 bg-zinc-900 
                                                        cursor-pointer text-[13px] hover:bg-zinc-800">
                                                          <span><BookUser className="inline" size={12}/> manager </span>
                                                        </DropdownMenuItem>
                                                        <DropdownMenuSeparator />
                                                        <DropdownMenuItem onClick={()=>{autUser("USER",data?._id)}}  className="text-[#b6b1ae] p-2 bg-zinc-900 rounded
                                                        cursor-pointer text-[13px] hover:bg-zinc-800">
                                                          <span ><User className="inline" size={12}/>  user</span>
                                                        </DropdownMenuItem>
                                                    </DropdownMenuSubContent>
                                                </DropdownMenuSub>
                                                <DropdownMenuItem onClick={()=>{kickUser(data?._id)}} className="hover:bg-zinc-800 cursor-pointer p-2">
                                                        <span className="mr-[41px] inline text-[12px]">Kick</span>
                                                        <UserRoundX size={15} className="ml-auto h-4 w-4 inline"/>
                                                </DropdownMenuItem>
                                            </DropdownMenuGroup>

                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                }
                            </div>    
                        </div>
                    )
                })}
            </DialogContent>
        </Dialog>
    );
}
 
export default ManagerMember;