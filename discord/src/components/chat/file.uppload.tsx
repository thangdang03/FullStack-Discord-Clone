'use client'
import {
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    
} from "@/components/ui/dialog"
import { Dialog } from "@radix-ui/react-dialog";
import { FileIcon } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
  
const UploadFile = ({open,setOpen,File,setFile}:
    {open:boolean,setOpen:(val: boolean)=> void,File:any,setFile:(val:File | undefined)=>void}) => {
    const [url,setUrl] = useState<string | null>(null);
    const changeUrl = (e:React.ChangeEvent<HTMLInputElement>)=>{
        const file = e.target.files?.[0];
        setFile(file);
        if (file) {
            const reader = new FileReader();
            reader.onload = (e: ProgressEvent<FileReader>) => {
                setUrl(e.target?.result as string);
            };
            reader.readAsDataURL(file); 
          }
    }

    const sendServer = async (e:React.MouseEvent<HTMLButtonElement>)=>{
        e.preventDefault();
        setOpen(false);
    }

    useEffect(()=>{
        if(!File){
            setUrl(null);
        }
    },[File]);
    return (
        <Dialog open={open} onOpenChange={()=>{setOpen(false)}}>
            <DialogContent className="bg-white text-black text-center">
                <DialogHeader >
                        <DialogTitle className="text-center p-3 text-[20px]" onClick={()=>{setOpen(false)}}> 
                            Add Your Image
                        </DialogTitle>
                </DialogHeader>
                <form encType="multipart/form-data" >
                    <div>
                        <label htmlFor="image" className="cursor-pointer flex justify-center items-center my-5 ">
                            {url && File?.type !== "application/pdf" ?
                                <div className="w-fit rounded-sm  bg-zinc-400">
                                    <Image
                                        className="object-cover rounded-sm  h-[200px] w-fit relative left-auto "
                                        width="50"
                                        height="50"
                                        src={url}
                                        alt="image server"
                                    />
                                </div>:
                                <div className="flex justify-center items-center my-5">
                                    <FileIcon  className="text-purple-700 " size={30}/> 
                                    {File?.name}
                                </div>
                            }
                        </label>
                        <input onChange={(e)=>{changeUrl(e)}} accept="image/*,application/pdf" className="overflow-hidden " type="file" name="image" id="image"/>
                    </div>
                        
                <DialogFooter>
                    <button onClick={(e)=>{sendServer(e)}} type="reset" className="bg-[#5865f2] p-[10px] mt-5 rounded-md text-white">save </button>
                </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
 
export default UploadFile;