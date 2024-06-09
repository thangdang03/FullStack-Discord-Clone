import Image from "next/image";
import Link from "next/link";

const notFound = () => {
    return ( 
        <div className="w-full h-screen flex justify-center items-center ">
            <div className="text w-[50%] p-[6%] "> 
                <h1 className="text-[#2b51fd] text-[49px] font-[sans-serif] font-black ">WRONG TURN?</h1>
                <p className="py-2 text-[19px]  ">You look lost, stranger. You know what helps when you’re lost? A piping hot bowl of noodles. Take a seat, we’re frantically at work here cooking up something good. Oh, you need something to read? These might help you:</p>
                <ul>
                    <li className="my-3"><Link className="py-[10px] my-3 text-xl text-[#08a8fc] hover:text-[#2b51fd]" href="/login">Login Page</Link> </li>
                    <li><Link className="py-[10px] my-3 text-xl text-[#08a8fc] hover:text-[#2b51fd]" href="/register">Register Page</Link></li>
                </ul>
            </div>
            <div className="image  w-[50%] p-[10%] ">
                <Image 
                    className="w-[90%] "
                    alt="not-found-image"
                    src="https://discord.com/assets/e4ec7c5d7af5342f57347c9ada429fba.gif"
                    width={100}
                    height={100}
                    loading="lazy"
                /> 
            </div>   
        </div>
    );
}
 
export default notFound;