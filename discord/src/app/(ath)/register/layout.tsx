import { ReactNode } from "react";


const LayoutRegister = ({children}:{children: ReactNode}) => {
    return ( 
        <div className="registerContainer text-black">
            {children}
        </div>
     );
}
 
export default LayoutRegister;