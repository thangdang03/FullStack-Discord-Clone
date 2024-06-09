import Image from "next/image";
import urlImage from '@/../../public/image.png';
import ResetPassword from "@/components/common/resetpassword";

const VerifyPage = ({ params }: { params: { id: string } }) => {
    console.log(params.id);
    return (  
        <div className="containerVerify flex justify-center relative h-screen">
            <Image  src={urlImage} 
                    className='absolute'
                    alt='background_login' 
                    width="1700" 
            />
            <ResetPassword token={params.id} />
        </div> 
    );
}
 
export default VerifyPage;