'use client'
import {
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    
} from "@/components/ui/dialog"
import {  deleteServerById } from "@/lib/callapi";
import { serverContext } from "@/lib/context";
import { Dialog } from "@radix-ui/react-dialog";
import { useContext } from "react";
  
  
const Leave = ({open,setOpen}:
    {open:boolean,setOpen:(val: boolean)=> void}) => {
    const {server}= useContext(serverContext);
    const deleteServer = async() =>{
        const deleting = await deleteServerById(server?._id);
        if(deleting == 200){
            setOpen(false);
            location.reload();
            return;
        } 
    }
    return (
        <Dialog open={open} onOpenChange={()=>{setOpen(false)}}>
            <DialogContent className="bg-white text-black text-center">
                <DialogHeader >
                        <DialogTitle className="text-center p-3 text-[20px]" onClick={()=>{setOpen(false)}}> 
                            Delete Server 
                            <DialogDescription className="mt-3">
                            Are you sure you want to delete the server?
                            </DialogDescription>
                        </DialogTitle>
                </DialogHeader>
                <DialogFooter>
                    <button onClick={()=>{setOpen(false)}}  className=" p-[10px] bg-[##e0dfdd] mt-5 rounded-md text-black">Cannel </button>
                    <button onClick={()=>{deleteServer()}}  className="bg-[#5865f2] border-collapse p-[10px] mt-5 rounded-md text-white">Delete </button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
 
export default Leave;