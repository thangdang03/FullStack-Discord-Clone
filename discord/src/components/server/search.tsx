import * as React from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { DialogHeader } from "../ui/dialog"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
  } from "@/components/ui/command"
import { Hash, Mic, ShieldAlert, UserRoundCheck, Video } from "lucide-react"
  
export function Search({open,setOpen,listMember,listChannel}:
  {open:boolean,setOpen:(val:boolean)=> void,listMember:any,listChannel:any}) {

  return (
    <Dialog open={open} onOpenChange={()=>{setOpen(false)}}>
        <DialogContent>
            <DialogHeader>
              <Command >
                <CommandInput placeholder="Type a command or search..." />
                <CommandList>
                  <CommandEmpty>No results found.</CommandEmpty>
                    <CommandGroup heading="Text Channels">
                      {listChannel.map((data:any)=>{
                          if(data?.type == "text"){
                                  return(
                                    <CommandItem key={data._id}>
                                      <span className="flex "><Hash className="inline mr-1" size={15}/> {data?.name}</span>
                                    </CommandItem>
                                  )
                          }
                      })}
                    </CommandGroup>
                    <CommandGroup heading="Voice Channels">
                      {listChannel.map((data:any)=>{
                          if(data?.type == "voice"){
                            return(
                              <CommandItem key={data._id}>
                                <span className="flex "><Mic className="inline mr-1" size={18}/> {data?.name}</span>
                              </CommandItem>
                            )
                          }
                      })}
                    </CommandGroup>
                    <CommandGroup heading="Video Channel">
                      {listChannel.map((data:any)=>{
                          if(data?.type == "video"){
                            return(
                              <CommandItem key={data._id}>
                                <span className="flex "><Video className="inline mr-1" size={18}/> {data?.name}</span>
                              </CommandItem>
                            )
                          }
                      })}
                    </CommandGroup>
                    <CommandGroup heading="Member">
                      {listMember.map((data:any)=>{
                        return(
                          <CommandItem className="informListMember w-[90%] " key={data._id}>
                              <span className="font-semibold">{data?.roles == "ADMIN" ?
                                  <ShieldAlert className="text-red-500 inline mr-[10px]" size={18} />:
                                <UserRoundCheck className="inline mr-[10px]" size={18}/>}{data?.userID.name} 
                              </span>
                          </CommandItem>
                        )
                      })}
                    </CommandGroup>
                </CommandList>
               </Command>
            </DialogHeader>
            
        </DialogContent>
        
    </Dialog>
  )
}

