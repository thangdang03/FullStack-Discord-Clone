'use client'
import Image from 'next/image'
import urlImage from '@/../public/background.jpg'
import urlLogo from '@/../public/62b2265e038aad4d3ed7ca4b.png'
import urlGithub from '@/../public/32.png'
import urlGoogle from '@/../public/Logo-google-icon-PNG.png'
import urlFacebook from '@/../public/Popular-facebook-Logo-png.png'
import Link from 'next/link'
import { useState } from 'react'
import { login, reset } from '@/lib/callapi'
import { useRouter } from 'next/navigation'
import { PopupError } from '@/components/common/popupError'

const LoginPage = () => {
    const [email,setEmail] = useState(String);
    const [password,setPassword] = useState(String);
    const [message,setMessage] = useState(String);
    const [title,setTitle] = useState(String);
    const [error,setError] = useState(false);
    const [Check,setCheck] = useState(false);
    const router = useRouter() ;

    const changeEmail = (e:React.ChangeEvent<HTMLInputElement>) =>{
        setEmail(e.target.value);
    };

    const changePassword = (e:React.ChangeEvent<HTMLInputElement>) =>{
        setPassword(e.target.value);
    };

    const submit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>{
        e.preventDefault();
        const result = await login(email,password);
        if(result.code === 200){
            router.push(`/user/${result.metadata?.id}`);
            return;
        };
        if(result.code === 409){
            setError(true);
            setCheck(true);
            setMessage(result.message);
            setTitle("email has not been verify");
            return;
        };
        setError(true);
        setCheck(false);
        setMessage(result.message);
        setTitle("Notification");
    }

    const submitFacebook = async () =>{
        const result = await login(email,password);
        console.log(result)
        if(result?.code === 201){
            router.push("/");
            return;
        };
        setError(true);
        setCheck(false);
        setMessage(result.message);
        setTitle("Notification");
    }

    const resetPassword = async () =>{
        const result = await reset(email);
        if(result.code === 200){
            setError(true);
            setCheck(true);
            setMessage(result.message);
            setTitle("check your email");
            return;
        };
        if(result.code === 404){
            setError(true);
            setCheck(true);
            setMessage(result.message);
            setTitle("email has not been verify");
            return;
        };
        setError(true);
        setCheck(false);
        setMessage(result.message);
        setTitle("Notification");
    }
    return (
        <div className="login_container relative h-screen">
            <Image  src={urlImage} 
                className='absolute w-full h-screen'
                alt='background_login' 
                width="1700" 
            />
            <PopupError  
                open={error} 
                message={message}
                title={title}
                setOpen={setError}
                check={Check}
            />
            <div className="item_login absolute text-center  text-[15px] 
                rounded-md bg-white w-[400px] h-[fit-content] top-[122px] left-60 shadow-2xl " > 
                <div className="text-center px-5" >
                <div className="text-center">
                        <Image src={urlLogo}
                            className='logo ml-[34%]'
                            alt='logo' 
                            width="100"
                        ></Image>
                        <span className='antialiased font-bold text-2xl'>SIGN IN</span>
                    </div>
                    <div className="mt-[20px] text-left">
                        <form>
                            <div className="text-center mb-5">Do not have an account? <Link href='/register' className="text-[#2b51fd] hover:underline">Sign Up</Link></div>
                                <label htmlFor="Email" className='mt-5'>Email</label>
                                <input onChange={(e)=>{changeEmail(e)}} type="email" className='mb-[30px] w-full h-[40px] pl-[10px] bg-[#eff0f8] rounded' name="Email" id="Email" placeholder='name@examplecom'  required />
                                <label htmlFor="Password" className=''>Password</label>
                                <input  onChange={(e)=>{changePassword(e)}} type="password" className='mb-[10px] w-full h-[40px] pl-[10px] bg-[#eff0f8] rounded' name="Password" id="Password" placeholder='*******' required />
                                <h5 onClick={(e)=>{resetPassword()}} className='mb-[20px] text-[#2b51fd] hover:underline cursor-pointer' >Forgot Password?</h5>
                                <button onClick={(e)=>{submit(e)}} className=' w-full h-[40px]  bg-[#2b51fd] rounded hover:shadow-2xl text-white'>Continue</button>
                        </form>
                    </div>
                    <div className='relative mt-[17px] font-bold text-[#A0A0A0] text-sm'>
                        <hr className='absolute top-3 w-[30%] border-[1px,#A0A0A0,solid]'/>
                            OR SIGN IN WITH 
                        <hr className='absolute right-0 w-[30%] top-3'/>
                    </div>
                    <div >
                        <ul className="flex justify-center flex-nowrap gap-x-[50px] mt-1 mb-[20px]">
                            <li >
                                <a href='http://localhost:4000/api/ath/login/google'>
                                    <Image src={urlGoogle}
                                    className='shadow-2xl shadow-neutral-500  rounded-md hover:cursor-pointer p-4'
                                    alt='logo' 
                                    width="50"
                                    ></Image>
                                </a>
                            </li>
                            <li>
                                <a href='http://localhost:4000/api/ath/login/github'>
                                    <Image src={urlGithub}
                                    className='shadow-2xl p-[10px] shadow-neutral-500 hover:cursor-pointer  rounded-md '
                                    alt='logo' 
                                    width="50"
                                    ></Image>
                                </a>
                            </li>
                            <a href='http://localhost:4000/api/ath/login/facebook'><Image src={urlFacebook}
                                className='shadow-2xl  p-[10px] shadow-neutral-500 hover:cursor-pointer  rounded-md '
                                alt='logo' 
                                width="50"
                                ></Image>
                            </a>
                        </ul>
                    </div>
                </div>
            </div>
            
        </div>
    );
}
 
export default LoginPage;