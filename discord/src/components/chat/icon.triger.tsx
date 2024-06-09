import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Smile } from 'lucide-react'

export default function IconTrigger({content,setContent}:{content:any,setContent:(val:any)=>void}) {
  return (
    <div>
          <Popover>
          <PopoverTrigger >
            <Smile className=" text[#b5bac1] inline rounded-full cursor-pointer" size={23}/>
          </PopoverTrigger>
          <PopoverContent className="w-fit relative bottom-[70px]" side='right'>
            <Picker data={data} onEmojiSelect={(e:any)=>{
                setContent( (state:any )=>{
                    if(!state){
                        return e.native;
                    }
                    return state += e.native
                })
            }} />
          </PopoverContent>
        </Popover>
        
    </div>
  )
}