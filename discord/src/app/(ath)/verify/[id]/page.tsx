import Image from "next/image";
import urlImage from '@/../../public/image.png';
import EmaiFail from "@/components/common/emailFail";

const VerifyPage = ({ params }: { params: { id: string } }) => {
    console.log(params.id);
    return (  
        <div className="containerVerify flex justify-center relative h-screen ">
            <Image  src={urlImage} 
                    className='absolute'
                    alt='background_login' 
                    width="1710" 
                    loading="lazy"
            />
            <EmaiFail token={params.id} />
        </div> 
    );
}
 
export default VerifyPage;