import { Hash } from "lucide-react";

const Welcome = ({name}:{name:string}) => {
    return (  
        <div className="welcomeDiv my-10 ">
            <Hash className="bg-zinc-700 rounded-full p-[10px]" size={70} />
            <h2 className="text-wihte text-[30px] font-semibold ">welcome to {name}</h2>
            <p className="text-zinc-400 text-[15px]">This is the start of the #{name} channel,</p>
        </div>
    );
}
 
export default Welcome;