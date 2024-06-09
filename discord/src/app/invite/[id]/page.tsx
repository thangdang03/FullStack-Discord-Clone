"use client"
import Image from "next/image";
import urlImage from '@/../public/image.png';
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { verifyInvite } from "@/lib/callapi";

const InvitePage = ({ params }: { params: { id: string } }) => {
    console.log(params.id);
    const router = useRouter();

    const generateCode = async(id:string)=>{
        const generate = await verifyInvite(params.id);
        if(generate == 200){
            router.push(`/user/${id}`);
            return;
        }
        }
    useEffect(()=>{
        const use:any = localStorage.getItem("user");
        const user = JSON.parse(use);
        console.log({user})
        if(!user){
            router.push("/login");
        }else{
            generateCode(user?.id);
        }
    },[])
    return (  
        <div className="containerVerify flex justify-center relative h-screen items-center">
            <Image  src={urlImage} 
                    className='absolute'
                    alt='background_login' 
                    width="1710" 
                    loading="lazy"
            />
            <Skeleton className="w-[400px] h-[400px] bg-[#5d5f68] "/>
        </div> 
    );
}
 
export default InvitePage;