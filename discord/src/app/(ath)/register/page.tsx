'use client'
import Image from 'next/image'
import urlImage from '@/../public/background.jpg'
import urlLogo from '@/../public/62b2265e038aad4d3ed7ca4b.png'
import Link from 'next/link'
import { useState } from 'react'
import { register } from '@/lib/callapi'
import { Popup } from '@/components/common/popup'



const LoginPage = () => {
    const [userName,setUserName] = useState(String);
    const [email,setEmail] = useState(String);
    const [password,setPassword] = useState(String);
    const [popup,setPopup] = useState(false);
    const [error,seterror] = useState(false);
    
    const changeUserName = (e:React.ChangeEvent<HTMLInputElement>) =>{
        setUserName(e.target.value);
    };
    const changeEmail = (e:React.ChangeEvent<HTMLInputElement>) =>{
        setPopup(false);
        const element = document.getElementById("Email");
        element?.setAttribute("style","border: none");
        setEmail(e.target.value);
    };
    const changePassword = (e:React.ChangeEvent<HTMLInputElement>) =>{
        setPassword(e.target.value);   
    };
    const send = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>{
        e.preventDefault();
        const sending = await register(email,userName,password);
        console.log(sending);
        if(sending){
            setPopup(true);
            return;
        }
        const element = document.getElementById("Email");
        element?.setAttribute("style","border: solid red 1px ");
        seterror(true);
    }
    return (
        <div className="login_container relative h-screen">
            <Popup open={popup} ></Popup>
            <Image  src={urlImage} 
                className='absolute w-full h-screen'
                alt='background_login' 
                width="1700" 
                loading="lazy"
            />

            <div className="item_login absolute text-center 
                rounded-md bg-white w-[400px] h-[500px] top-[140px] left-60 shadow-2xl " > 
                <div className="text-center p-5" >
                    <div className="text-center">
                        <Image src={urlLogo}
                            className='logo ml-[128px]'
                            alt='logo' 
                            width="100"
                        ></Image>
                        <span className='antialiased font-bold text-2xl'>REGISTER </span>
                    </div>
                    <div className="mt-[10px] text-left">
                       <form action="">
                        <div className="text-center mb-3">Do you already have an account ?<Link href='/login' className='
                            text-[#2b51fd] hover:underline'>Sign In</Link></div>
                            <label htmlFor="useName" className='mt-5 font-semibold'>User Name</label>
                            <input onChange={(e)=>{changeUserName(e)}} type="text" className='mb-[10px] mt[5px] w-full h-[40px] pl-[10px] bg-[#eff0f8] rounded'  name="useName" id="useName" placeholder='user name' required />
                            <label htmlFor="Email" className='mt-5 font-semibold'>Email</label>
                            <input  onChange={(e)=>{changeEmail(e)}} type="email" className='mb-[10px] mt[5px] w-full h-[40px] pl-[10px] bg-[#eff0f8] rounded' name="Email" id="Email" placeholder='name@example.com' required />
                            <label htmlFor="Password" className='font-semibold'>Password</label>
                            <input  onChange={(e)=>{changePassword(e)}} type="password" className='w-full h-[40px] pl-[10px] bg-[#eff0f8] rounded' name="Password" id="Password" placeholder='*******' required />
                            {error && <p className='mt-[10px] text-[15px] text-red-600'>email already registered</p> }
                            <button onClick={(e)=>{send(e)}} className='mt-[30px] w-full h-[40px]  bg-[#2b51fd] rounded hover:shadow-2xl text-white' type='submit'>Continue</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default LoginPage;