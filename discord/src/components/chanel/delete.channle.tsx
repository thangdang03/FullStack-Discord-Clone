import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
  } from "@/components/ui/alert-dialog"
import { deleteChannel } from "@/lib/callapi";
import { serverContext } from "@/lib/context";
import { useContext } from "react";
  
  
  export function DeleteChannel({open,setOpen,groupFunction,}:
    {open:boolean,setOpen:Function,groupFunction:()=>void}) {
        const {channel,server}= useContext(serverContext);
    const deleteChannelById = async() => {
        const result = await deleteChannel(channel?._id,server?._id);
        if(result){
            await groupFunction();
            setOpen(false);
            return;
        }
    }

    return (
        <div className="popUp" >
          <AlertDialog open={open} >
            <AlertDialogContent >
              <AlertDialogHeader>
                <AlertDialogTitle>
                    Are you want to delete channel #{channel?.name}
                </AlertDialogTitle>
                <AlertDialogDescription>
                The channel will be permanently deleted. 
                Important messages will also be deleted. 
                You probably want to delete the channel #{channel?.name}
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel onClick={()=>{setOpen(false)}}>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={()=>{deleteChannelById()}}>
                    Continue
                </AlertDialogAction>
              </AlertDialogFooter>
              
            </AlertDialogContent>
          </AlertDialog>
        </div>
    )
  }
  