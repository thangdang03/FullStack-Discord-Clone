import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import Link from "next/link"


export function Popup({open}:{open:boolean}) {
  return (
      <div className="popUp">
        <AlertDialog open={open} >
          <AlertDialogContent >
            <AlertDialogHeader>
              <AlertDialogTitle>Your account registered successfully</AlertDialogTitle>
              <AlertDialogDescription>
                The verification code has been sent to your email, please click Continue to verify your email
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogAction>
                <Link href="https://mail.google.com/mail">
                  Continue
                </Link>
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
  )
}
