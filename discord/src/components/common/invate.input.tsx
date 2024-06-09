'use client'
import {
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { generateCode } from "@/lib/callapi";
import { serverContext } from "@/lib/context";
import { Dialog } from "@radix-ui/react-dialog";
import { Check, Copy, RefreshCcw } from "lucide-react";
import { useContext, useEffect, useState } from "react";
  
const InviteItem = ({open,setOpen}:{open:boolean,setOpen:(val: boolean)=> void}) => {
    const [value,setValue]:any = useState();
    const [check,setCheck]:any = useState(true);
    const {server} = useContext(serverContext);

    const generateLink = async () => {
        const url = await generateCode(server?._id);
        if(url?.code !== 200){
            return
        }
        setValue(url.metadata.inviteCode);
    };
    const copy = async () =>{
        navigator.clipboard.writeText(value);
        if(check){
            setCheck(false);
            return;
        }
        setCheck(true);
    };
    const setInitState = () => {
        setOpen(false);
        setValue(null);
        setCheck(true)
    }
   
    return (
        <Dialog open={open} onOpenChange={()=>{setInitState()}}>
            <DialogContent className="bg-white text-black text-center h-fit">
                <DialogHeader >
                    <DialogTitle className="text-center p-3 text-[30px]" > 
                        Invite Friends
                    </DialogTitle>
                    <DialogDescription className="">
                            <h3 className=""> SERVER  INVITE LINK</h3>
                            <div className="item_input flex items-center"> 
                                <input value={value} readOnly className="w-[90%] h-[40px] rounded-md p-3 my-3 mr-auto" type="text" name="invite_code" id="invite_code" placeholder="http:://localhost:300/invite/example"/>
                                {check ?  <Copy onClick={()=>{copy()}} className="cursor-pointer" /> :
                                          <Check onClick={()=>{copy()}} className="text-green-600 cursor-pointer" />
                                }
                            </div>
                            <span onClick={()=>{generateLink()}} className="cursor-pointer hover:underline">generate a new link <RefreshCcw className="inline " size={18}/></span>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
}
 
export default InviteItem;