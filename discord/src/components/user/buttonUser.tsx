'use client'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useEffect, useState } from "react";
import { User } from "../interface/user";
import { logout } from "@/lib/callapi";
import { useRouter } from "next/navigation";

const UserButton = ({setEditUser}:{setEditUser:(val:boolean)=>void}) => {
    const [user,setUser] = useState<User>();
    const router=  useRouter();
    const configUser = async ()=>{
      const user:any =  await localStorage.getItem("user");
      const tem  = JSON.parse(user);
      if(tem.id !=user ){
        setUser(JSON.parse(user));
      }
    }
    const logOut = async() =>{
      const result = await logout();
      if(result){
        localStorage.clear();
        router.push("/login");
      }
    }
    useEffect(()=>{
      configUser()
    },[])
    return (  
        <div>
            <DropdownMenu >
              <DropdownMenuTrigger className="my-[10px]">
              <Avatar>
                <AvatarImage className="object-cover" src={`${user?.urlImage}`} />
                <AvatarFallback>{user?.name.charAt(0)}</AvatarFallback>
              </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>{user?.name}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="hover:bg-zinc-800 cursor-pointer" 
                  onClick={()=>{setEditUser(true)}}>
                    setting
                </DropdownMenuItem>
                <DropdownMenuItem onClick={async ()=>{await logOut()}} >logOut</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}
 
export default UserButton;