'use client'
import {
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    
} from "@/components/ui/dialog"
import { CreateChannel, createServer, editServer } from "@/lib/callapi";
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
  
const CreateChanel = ({open,setOpen,groupFunction}:
    {open:boolean,setOpen:(val: boolean)=> void,groupFunction:()=> void}) => {
    const [name,setName] = useState<string>("");
    const [type,setType] = useState<string>("");
    const {server}= useContext(serverContext);
    const changeName = (e:React.ChangeEvent<HTMLInputElement>)=>{
        setName(e.target.value);
    }

    const changeType = (e:string)=>{
        setType(e);
    }
    
    const sendServer = async (e:React.MouseEvent<HTMLButtonElement>)=>{
        e.preventDefault();
        const result = await CreateChannel(server._id,name,type);
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
                            Create Channel
                        </DialogTitle>
                </DialogHeader>
                <form >
                    <div className="mt-4">
                        <label htmlFor="name" className=" relative right-[38%] text-left text-[#bbbbbb] font-medium">channel name</label>
                        <input onChange={(e)=>{changeName(e)}} className="w-full text-white p-3 rounded-md border-none " type="text" name="name" id="name" required placeholder="name ... example"/>
                    </div>

                    <div className="mt-4 text-left">
                        <span>Type Channel</span>
                        <Select onValueChange={(e)=>{changeType(e)}}>
                            <SelectTrigger className="w-[180px] text-white w-full">
                                <SelectValue placeholder="Channel Type"/>
                            </SelectTrigger>
                            <SelectContent>
                            <SelectGroup>
                                <SelectItem value="text">Text</SelectItem>
                                <SelectItem value="video">Video</SelectItem>
                                <SelectItem value="voice">voice</SelectItem>
                            </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                <DialogFooter>
                    <button onClick={(e)=>{sendServer(e)}} type="submit" className="bg-[#5865f2] p-[10px] mt-5 rounded-md text-white">Create </button>
                </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
 
export default CreateChanel;