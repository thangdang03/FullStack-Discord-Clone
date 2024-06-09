'use client'
import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer"
import { updateUser } from "@/lib/callapi";
import Image from "next/image"
import {  useState } from "react";

export function EditUser({open,setOpen}:
    {open:boolean,setOpen:(val:boolean)=>void}) {
        const [url,setUrl] = useState<string | null>(null);
    const [image,setImage] = useState<any>();
    const [name,setName] = useState<string>("");

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
        const result = await updateUser(name,image);
        if(result == 200){
          setOpen(false);
        }
        
    }
  return (
    <Drawer open={open} onClose={()=>{setOpen(false)}}  >
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm  text-left">
          <DrawerHeader className="">
            <DrawerTitle className="w-full text-center">Edit User</DrawerTitle>
            <DrawerDescription className="w-full text-center"> Edit User inform</DrawerDescription>
          </DrawerHeader>
          <form encType="multipart/form-data">
            <div >
                <label htmlFor="image" >
                    add your image  
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
                <label htmlFor="name" className=" relative  text-left text-[#bbbbbb] font-medium">
                    display name
                </label>
                <input required onChange={(e)=>{changeName(e)}} className="w-full text-white p-3 rounded-md border-none " type="text" name="name" id="name" placeholder="name ... example"/>
            </div>
                
            <DrawerFooter className="p-0 pb-[20px]">
              <Button onClick={(e)=>{sendServer(e)}} type="submit" className=" mt-5 rounded-md ">
                Update
              </Button>
              <DrawerClose asChild>
                <Button variant="outline" onClick={()=>{setOpen(false)}}>Cancel</Button>
              </DrawerClose>
            </DrawerFooter>
          </form>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
