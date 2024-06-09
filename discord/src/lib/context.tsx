'use client'
import {createContext, useState } from "react";



export const serverContext = createContext<any>(undefined);

export const ServerProvider =({children}:{children:React.ReactNode})=>{
    const [server,setServer]:any = useState(null);
    const [channel,setChannel]:any = useState(null);
    return(
        <serverContext.Provider value={{server,setServer,channel,setChannel}}>
            {children}
        </serverContext.Provider>
    )

}

