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
import Link from "next/link";
  
  
  export function PopupError({open,check,title,message,setOpen}:{open:boolean,check:boolean,title:String,message:String,setOpen:Function}) {
    return (
        <div className="popUp" >
          <AlertDialog open={open} >
            <AlertDialogContent >
              <AlertDialogHeader>
                <AlertDialogTitle>{title}</AlertDialogTitle>
                <AlertDialogDescription>
                     {message}
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel onClick={()=>{setOpen(false)}}>Cancel</AlertDialogCancel>
              {check && 
                <AlertDialogAction>
                  <Link href="https://mail.google.com/mail">
                    Continue
                  </Link>
              </AlertDialogAction>
              }

              </AlertDialogFooter>
              
            </AlertDialogContent>
          </AlertDialog>
        </div>
    )
  }
  