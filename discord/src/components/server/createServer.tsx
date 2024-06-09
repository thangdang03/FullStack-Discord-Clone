'use client'
import {
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    
} from "@/components/ui/dialog"
import { createServer, editServer } from "@/lib/callapi";
import { serverContext } from "@/lib/context";
import { Dialog, DialogTrigger } from "@radix-ui/react-dialog";
import Image from "next/image";
import { useContext, useState } from "react";
  
  
const CreateServer = ({open,setOpen,getList,edit}:
    {open:boolean,setOpen:(val: boolean)=> void,getList:()=>void,edit:boolean}) => {
    const [url,setUrl] = useState<string | null>(null);
    const [image,setImage] = useState<any>();
    const [name,setName] = useState<string>("");
    const {server}= useContext(serverContext);
    const changeUrl = (e:React.ChangeEvent<HTMLInputElement>)=>{
        const file = e.target.files?.[0];
        setImage(file);
        if (file) {
            const reader = new FileReader();
            reader.onload = (e: ProgressEvent<FileReader>) => {
                setUrl(e.target?.result as string);
            };
            reader.readAsDataURL(file); 
          }
        console.log({url});
    }
    const changeName = (e:React.ChangeEvent<HTMLInputElement>)=>{
        setName(e.target.value);
    }
    const sendServer = async (e:React.MouseEvent<HTMLButtonElement>)=>{
        e.preventDefault();
        console.log({
            image,
            name
        });
        if(edit){
            const term = await editServer(name,image,server._id);
            if(term == 200){
                setOpen(false);
                location.reload();
                return;
            }
        }else{
            const term = await createServer(name,image);
            console.log(term)
            if(term == 201){
                setOpen(false);
                await getList()
                return;
            }
        }
        
        
    }
    return (
        <Dialog open={open} onOpenChange={()=>{setOpen(false)}}>
            <DialogContent className="bg-white text-black text-center">
                <DialogHeader >
                        <DialogTitle className="text-center p-3 text-[20px]" onClick={()=>{setOpen(false)}}> 
                            Customize your server
                            <DialogDescription className="mt-3">
                                Give your server a personality with a name and an image. You
                                can always change it later.
                            </DialogDescription>
                        </DialogTitle>
                </DialogHeader>
                <form encType="multipart/form-data">
                    <div >
                        <label htmlFor="image" className="">
                            add your image server 
                            {url && 
                                <Image
                                    className="object-cover rounded-[100%] h-[50px] relative left-[45%] my-3"
                                    width="50"
                                    height="50"
                                    src={url}
                                    alt="image server"
                                />
                            }
                        </label>
                        <input onChange={(e)=>{changeUrl(e)}} accept="image/*" className="overflow-hidden " type="file" name="image" id="image"/>
                    </div>
                        
                    <div className="mt-4">
                        <label htmlFor="name" className=" relative right-[38%] text-left text-[#bbbbbb] font-medium">server name</label>
                        <input onChange={(e)=>{changeName(e)}} className="w-full text-white p-3 rounded-md border-none " type="text" name="name" id="name" placeholder="name ... example"/>
                    </div>
                        
                <DialogFooter>
                    <button onClick={(e)=>{sendServer(e)}} type="submit" className="bg-[#5865f2] p-[10px] mt-5 rounded-md text-white">{edit? "Update" : "Create" } </button>
                </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
 
export default CreateServer;