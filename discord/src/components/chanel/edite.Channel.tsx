'use client'
import {
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    
} from "@/components/ui/dialog"
import { CreateChannel, createServer, editChannel, editServer } from "@/lib/callapi";
import { serverContext } from "@/lib/context";
import { Dialog } from "@radix-ui/react-dialog";
import { useContext, useState } from "react";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
  
const EditChannel = ({open,setOpen,groupFunction,channelId,type}:
    {open:boolean,setOpen:(val: boolean)=> void,groupFunction:()=> void,channelId:any,type:string}) => {
    const [name,setName] = useState<string>("");
    
    const {server}= useContext(serverContext);
    const changeName = (e:React.ChangeEvent<HTMLInputElement>)=>{
        setName(e.target.value);
    }

    const sendServer = async (e:React.MouseEvent<HTMLButtonElement>)=>{
        e.preventDefault();
        console.log(channelId);
        const result = await editChannel(channelId,server._id,name,type);
        groupFunction();
        if(result == 200){
            setOpen(false);
            return;
        }
    }
    
    return (
        <Dialog open={open} onOpenChange={()=>{setOpen(false)}}>
            <DialogContent className="bg-white text-black text-center">
                <DialogHeader >
                        <DialogTitle className="text-center p-3 text-[20px]" onClick={()=>{setOpen(false)}}> 
                            Edit Channel
                        </DialogTitle>
                </DialogHeader>
                <form >
                    <div className="mt-4">
                        <label htmlFor="name" className=" relative right-[38%] text-left text-[#bbbbbb] font-medium">channel name</label>
                        <input onChange={(e)=>{changeName(e)}} className="w-full text-white p-3 rounded-md border-none " type="text" name="name" id="name" required placeholder="name ... example"/>
                    </div>
                <DialogFooter>
                    <button onClick={(e)=>{sendServer(e)}} type="submit" className="bg-[#5865f2] p-[10px] mt-5 rounded-md text-white">Update </button>
                </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
 
export default EditChannel;