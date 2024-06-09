import ChatPage from "@/components/chat/chat.model";
import ChanelPage from "@/components/server/chanel";
import Navigation from "@/components/server/navigation";
import { ServerProvider } from "@/lib/context";
const  UserPage = ({ params }: { params: { id: string } }) => {
    
    return ( 
        <div className="flex">  
            <ServerProvider>
                <Navigation id={params.id} />
                <ChanelPage />
                <ChatPage />
            </ServerProvider>
        </div>
    );
}
 
export default UserPage ;