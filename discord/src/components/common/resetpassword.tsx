"use client"
import { JwtPayload, jwtDecode } from "jwt-decode";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton"
import {useEffect, useState } from "react";
import axios, {AxiosDefaults } from "axios";
import { useRouter } from "next/navigation";

const ResetPassword = ({token}:{token:String}) => {
    const [check,setcheck] = useState(Boolean);
    const [password,setPassword] = useState("");
    const [loading,setloading] = useState(false);
    const router = useRouter();
    
    const checkTimeEmail = async () =>{
        const tokens:JwtPayload = await jwtDecode(token.toString());
        const epx:any = tokens.exp;
        const date  = new Date();
        if (date.getTime() >=   epx * 1000) {
            setloading(true);
            setcheck(false);
            return ;
        }
        setloading(true);
        setcheck(true);
        return;
    };
    const changePassword = (e:React.ChangeEvent<HTMLInputElement>) =>{
        setPassword(e.target.value);
    };
    const verify = async () =>{
        setloading(false);
        const result:AxiosDefaults = await axios.post(`http://localhost:4000/api/ath/reset/${token}`,{
            newPassWord: password
        },{withCredentials: true});
        if(result.data.code = 200){
            router.push('/login');
            return;
        }
        setloading(true);
        setcheck(true);
    };

    useEffect(()=>{
        checkTimeEmail();
    },[]);

    if(loading === true){
        if(check){
            return( 
                <div className="itemInput top-[220px] text-white text-center bg-[#313338] absolute w-[500px] h-[fit-content] p-[25px] rounded-lg">
                    <svg  className="w-full" height="84" viewBox="0 0 171 84" width="171" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd"><path d="m54.1072 29.4216c0-7.292 4.21-13.605 10.319-16.682h-30.285c-9.199 0-16.682 7.485-16.682 16.682v7.842h36.648zm0 43.9141c0-.552.446-.999.999-.999v-3.618c-.553 0-.999-.447-.999-1v-2.274c0-.552.446-1 .999-1v-1.58c-.553-.001-.999-.447-.999-1v-22.601h-36.648v42.033h36.648z" fill="#7b80d6"/><path d="m37.7927 44.3415h-3.283-8.315c-1.104 0-2 .896-2 2v27.878c0 1.104.896 2 2 2h19.176c1.105 0 2-.896 2-2v-27.878c0-1.104-.895-2-2-2zm100.2608-15.7675c-.446-8.803-7.727-15.834-16.639-15.834h-36.469-12.157c-9.198 0-16.681 7.484-16.681 16.682v7.841h10.459c.552 0 1 .448 1 1 0 .553-.448 1-1 1h-10.459v22.602c0 .553-.448 1-1 1h-.001v1.58h.001c.552 0 1 .447 1 1v2.274c0 .552-.448 1-1 1h-.001v3.618l.001-.001c.552 0 1 .447 1 1v7.961h81.338.651v-4.067z" fill="#acb0ff"/><path d="m121.4148 17.8191h-48.627c-5.492 0-9.945 4.452-9.945 9.945v2.421c0 1.105.895 2 2 2h10.27c2.322-2.231 5.468-3.611 8.935-3.611h47.312v-.809c0-5.493-4.452-9.946-9.945-9.946" fill="#7b80d6"/><path d="m134.0632 56.4099 4.033-1.462v-.556h-6.735v4.373c.568-1.051 1.492-1.916 2.702-2.355" fill="#acb0ff"/><path d="m56.1072 67.7185v-2.273c0-.553-.447-1-1-1h-.001c-.553 0-.999.447-.999 1v2.273c0 .553.446 1 .999 1h.001c.553 0 1-.447 1-1" fill="#000"/><path d="m95.4441 63.6853h13.262c1.886 0 3.421-1.535 3.421-3.42v-5.873h-6.532l1.025 3.345c0 .61-.495 1.104-1.106 1.104h-6.631c-.61 0-1.105-.494-1.105-1.104l1.024-3.345h-6.779v5.873c0 1.885 1.534 3.42 3.421 3.42" fill="#acb0ff"/><path d="m64.8425 76.2195h64.519c1.104 0 2-.896 2-2v-10.438l-.327-.899c-.51-1.41-.337-2.892.327-4.117v-2.373c0-1.106-.896-2-2-2h-15.235v5.873c0 2.993-2.427 5.42-5.42 5.42h-13.262c-2.995 0-5.421-2.428-5.421-5.422v-5.871h-5.976c-6.136 0-11.274-4.306-12.58-10.051h-6.625c-1.104 0-2 .896-2 2v27.878c0 1.104.896 2 2 2" fill="#7b80d6"/><path d="m98.8835 58.8415h6.631c.61 0 1.105-.494 1.105-1.104l-1.024-3.345h-6.793l-1.024 3.345c0 .61.495 1.104 1.105 1.104" fill="#7b80d6"/><path d="m34.1414 17.8191c-5.494 0-9.947 4.453-9.947 9.946v2.42c0 1.105.895 2 2 2h19.176c1.105 0 2-.895 2-2v-2.42c0-2.572.383-5.055 1.097-7.397.388-1.272-.589-2.549-1.919-2.549z" fill="#acb0ff"/><path d="m132.5583 41.4822c0 2.193-1.777 3.971-3.97 3.971-2.192 0-3.969-1.778-3.969-3.971 0-2.191 1.777-3.969 3.969-3.969 2.193 0 3.97 1.778 3.97 3.969zm-20.643 0c0-2.191 1.778-3.969 3.97-3.969 2.193 0 3.97 1.778 3.97 3.969 0 2.193-1.777 3.971-3.97 3.971-2.192 0-3.97-1.778-3.97-3.971zm-12.703 0c0-2.191 1.778-3.969 3.97-3.969s3.97 1.778 3.97 3.969c0 2.193-1.778 3.971-3.97 3.971s-3.97-1.778-3.97-3.971zm-8.733 3.971c-2.193 0-3.971-1.778-3.971-3.971 0-2.191 1.778-3.969 3.971-3.969 2.191 0 3.969 1.778 3.969 3.969 0 2.193-1.778 3.971-3.969 3.971zm-6.432-14.879c-6.015 0-10.91 4.892-10.91 10.908s4.895 10.91 10.91 10.91h60.971c.114-.082.215-.181.276-.312.094-.202.104-.428.029-.635l-2.319-6.396c-.52.251-1.096.404-1.713.404-2.192 0-3.969-1.778-3.969-3.971 0-2.191 1.777-3.969 3.969-3.969.922 0 1.76.326 2.434.854.259-.173.532-.326.833-.436.977-.353 2.03-.304 2.971.133.94.441 1.653 1.221 2.007 2.197l3.823 10.545c3.155-1.914 5.274-5.371 5.274-9.324 0-6.016-4.893-10.908-10.909-10.908z" fill="#fff"/><path d="m94.448 41.4822c0-2.191-1.777-3.969-3.969-3.969-2.193 0-3.97 1.778-3.97 3.969 0 2.193 1.777 3.971 3.97 3.971 2.192 0 3.969-1.778 3.969-3.971m12.7041 0c0-2.191-1.777-3.969-3.97-3.969-2.192 0-3.969 1.778-3.969 3.969 0 2.193 1.777 3.971 3.969 3.971 2.193 0 3.97-1.778 3.97-3.971m12.7031 0c0-2.191-1.777-3.969-3.97-3.969-2.192 0-3.969 1.778-3.969 3.969 0 2.193 1.777 3.971 3.969 3.971 2.193 0 3.97-1.778 3.97-3.971m8.7334-3.9688c-2.192 0-3.97 1.777-3.97 3.969 0 2.193 1.778 3.97 3.97 3.97s3.97-1.777 3.97-3.97c0-2.192-1.778-3.969-3.97-3.969m8.7334 3.9688c0 2.193 1.777 3.971 3.97 3.971.616 0 1.192-.153 1.713-.404l-.776-2.139c-.353-.977-.306-2.032.134-2.971.304-.651.779-1.183 1.362-1.572-.674-.528-1.511-.854-2.433-.854-2.193 0-3.97 1.778-3.97 3.969" fill="#acb0ff"/><path d="m147.655 40.9431c-.172-.475-.518-.854-.974-1.066-.456-.213-.967-.239-1.441-.065-.474.172-.853.518-1.066.975-.213.455-.236.967-.064 1.441l3.093 8.533c.258.711.223 1.481-.098 2.166-.32.686-.888 1.205-1.599 1.463l-10.761 3.901c-1.582.574-2.403 2.328-1.829 3.91l3.47 9.572c1.298 3.58 4.846 5.774 8.614 5.305.865-.102 1.691.408 1.998 1.248l1.077 2.971h9.781l-2.239-6.02c-.312-.857.025-1.818.798-2.291 1.583-.971 2.796-2.473 3.413-4.225l5.064-14.406c.448-1.281-.232-2.687-1.514-3.137-1.284-.449-2.691.233-3.137 1.514l-1.953 5.662c-.253.727-.702 1.36-1.3 1.834-.416.328-.971.438-1.482.293-.526-.15-.95-.545-1.135-1.055z" fill="#d3d6ed"/><path d="m140.0964 78.3562c1.548.649 3.273.919 5.046.72.391 1.08-.409 2.22-1.559 2.22h-1.83c-.916 0-1.657-.741-1.657-1.656zm-48.073-22.964c0-.553.447-1 1-1h5.779 6.793 5.531c.552 0 1 .447 1 1v4.873c0 1.889-1.531 3.42-3.42 3.42h-13.262c-1.89 0-3.421-1.532-3.421-3.422zm63.482 5.129c.512.145 1.067.035 1.483-.293.597-.475 1.046-1.107 1.299-1.834l1.954-5.662c.446-1.281 1.853-1.963 3.136-1.514 1.282.45 1.962 1.856 1.515 3.137l-5.065 14.406c-.617 1.752-1.83 3.254-3.413 4.225-.772.473-1.109 1.433-.797 2.291l2.239 6.019h-9.781l-1.078-2.97c-.306-.84-1.132-1.35-1.998-1.248-3.767.468-7.315-1.725-8.613-5.305l-3.471-9.572c-.574-1.582.247-3.336 1.829-3.91l10.761-3.901c.711-.258 1.279-.777 1.6-1.463.321-.685.355-1.455.097-2.166l-3.092-8.533c-.172-.475-.15-.986.063-1.441.214-.457.593-.803 1.067-.975.473-.174.985-.148 1.441.065.456.212.802.591.974 1.066l6.715 18.523c.186.51.61.905 1.135 1.055zm3.128-19.039c0 3.953-2.119 7.41-5.274 9.324l-3.824-10.545c-.353-.976-1.066-1.756-2.006-2.197-.941-.437-1.995-.486-2.971-.133-.301.11-.574.263-.833.436-.583.389-1.059.921-1.362 1.572-.441.939-.488 1.994-.134 2.971l.775 2.139 2.319 6.396c.075.207.065.433-.029.635-.061.13-.162.23-.276.312h-60.971c-6.015 0-10.91-4.894-10.91-10.91s4.895-10.908 10.91-10.908h63.677c6.016 0 10.909 4.892 10.909 10.908zm-140.175-2.219h34.649c.551 0 1 .448 1 1v21.602c0 .553.446.999.999 1h.001c.552 0 1-.447 1-1v-20.602c0-1.104.895-2 2-2h8.459c.552 0 1-.447 1-1s-.448-1-1-1h-8.459c-1.105 0-2-.894-2-2v-5.842c0-9.212 7.468-16.681 16.681-16.681h12.157 36.469c7.575 0 13.971 5.079 15.994 12.009.558 1.912-.901 3.824-2.893 3.824l-3.155.001h-47.313c-3.467 0-6.613 1.38-8.934 3.611-2.446 2.351-3.976 5.646-3.976 9.297 0 .984.12 1.938.33 2.859 1.306 5.745 6.444 10.051 12.58 10.051h3.176c1.546 0 2.8 1.253 2.8 2.8v3.073c0 2.993 2.427 5.42 5.42 5.42h13.262c2.994 0 5.421-2.428 5.421-5.422v-3.071c0-1.547 1.253-2.8 2.8-2.8h14.435 6.735v.556l-4.033 1.462c-1.21.439-2.134 1.303-2.702 2.355-.663 1.226-.837 2.707-.327 4.117l.327.899 3.144 8.674c.718 1.98 1.989 3.615 3.591 4.775v4.066h-.651-79.338c-1.105 0-2-.894-2-2v-5.961c0-.552-.448-1-1-1l-.001.001c-.553 0-.999.448-.999.999v5.961c0 1.106-.896 2-2 2h-32.649c-1.104 0-2-.894-2-2v-39.033c0-.552.448-1 1-1zm-1-9.842c0-9.212 7.469-16.681 16.682-16.681h30.286c-6.109 3.076-10.319 9.389-10.319 16.681v6.842c0 .553-.449 1-1 1h-34.649c-.552 0-1-.447-1-1zm148.572 51.875h-3.851c-1.316 0-2.493-.817-2.952-2.05l-1.708-4.592c1.944-1.211 3.432-3.067 4.195-5.229l5.066-14.408c.811-2.324-.419-4.875-2.744-5.687-1.124-.393-2.335-.325-3.41.195-1.074.518-1.882 1.424-2.275 2.553l-1.953 5.662c-.073.211-.181.406-.316.58l-2.029-5.599c4.11-2.324 6.832-6.829 6.562-11.937-.368-6.914-6.339-12.211-13.263-12.211h-4.63c-1.443 0-2.688-1.029-2.942-2.449-1.561-8.732-9.193-15.384-18.366-15.384h-36.469-12.157-38.647c-10.318 0-18.683 8.365-18.683 18.683v8.84 44.033c0 .553.448 1 1 1h38.649 82.338 1.651 26.934c.552 0 1-.447 1-1 0-.552-.448-1-1-1zm-14.9428-77.7691c.203 0 .406-.077.562-.232l.939-.94c.31-.31.31-.812 0-1.123-.311-.309-.814-.309-1.123 0l-.94.941c-.31.309-.31.812 0 1.122.156.155.359.232.562.232m-4.6972 4.6972c.203 0 .406-.077.562-.232l.939-.94c.31-.309.31-.812 0-1.122-.311-.31-.813-.31-1.123 0l-.94.939c-.309.31-.309.813 0 1.123.156.155.359.232.562.232m5.0752-.2324c.155.155.358.232.562.232.203 0 .406-.077.561-.232.31-.31.31-.812 0-1.123l-.939-.939c-.311-.31-.813-.31-1.123 0-.311.31-.311.813 0 1.123zm-4.6973-4.6972c.155.155.358.232.562.232.203 0 .406-.077.561-.232.31-.31.31-.812 0-1.122l-.939-.941c-.311-.309-.813-.309-1.123 0-.31.311-.31.813 0 1.124zm-141.9883 49.456h-.001c-.662 0-1.198-.536-1.198-1.198 0-.44-.356-.795-.794-.795-.439 0-.794.355-.794.795 0 .662-.537 1.198-1.199 1.198-.439 0-.794.355-.794.794 0 .438.355.794.794.794.662 0 1.199.536 1.199 1.198v.001c0 .439.355.794.794.794.438 0 .794-.355.794-.794v-.001c0-.662.536-1.198 1.198-1.198h.001c.438 0 .794-.356.794-.794 0-.439-.356-.794-.794-.794" fill="#000"/><path d="m163.83 15.523 2.2 3.652 2.2-3.652z" fill="#acb0ff"/><path d="m163.8298 15.5232h4.4l-2.2 3.652zm7.04-1.492c-.177-.315-.51-.508-.87-.508h-7.94c-.36 0-.693.193-.87.508-.177.314-.173.699.014 1.008l3.97 6.591c.18.301.506.485.856.485.351 0 .676-.184.857-.485l3.969-6.591c.187-.309.192-.694.014-1.008z" fill="#000"/></g></svg>
                    <h1 className="font-semibold text-xl my-3">change your password</h1>
                    <label htmlFor="newPassword" className="p-[10px] h-[50px] text-[#A0A0A0] p-0 mr-[66%] text-[A0A0A0] text-[12px]  font-bold"> CHANGE NEW PASSWORD</label>
                    <input  onChange={(e)=>{changePassword(e)}} className="bg-[#1e1f22] w-[100%] h-[50px] rounded-lg" type="password" id="newPassword" />
                    <button className="bg-[#5765f2] w-[100%] my-5 py-4 rounded-md" onClick={()=>{verify()}}>Change your password</button>
                </div> 
            );
             
        }else{
            return ( 
                <div className="itemInput top-[220px] text-white text-center bg-[#313338] absolute w-[500px] h-[fit-content] p-[25px] rounded-lg">
                    <svg className="w-full" height="89" viewBox="0 0 143 89" width="143" xmlns="http://www.w3.org/2000/svg">
                        <g fill="none" fill-rule="evenodd"><g fill="#acb0ff"><path d="m28.481 38.062 8.381 6.599-8.381-6.6z"/><path d="m113.2438 40.602-8.657 6.806c-.037.039-.083.065-.125.098l-.6.471-16.168 12.709c-1.019.801-1.018 2.346.002 3.146l16.166 12.67 9.383 7.356c.656.515 1.617.047 1.617-.787v-41.683c0-.834-.962-1.302-1.618-.786m-42.3818 12.5761-37.544 29.428c-1.495 1.173-.666 3.574 1.234 3.574h72.62c1.9 0 2.729-2.401 1.234-3.574zm-42.3828 30.6797 9.383-7.354 16.14-12.652c1.021-.8 1.023-2.344.004-3.145l-16.144-12.713-9.381-7.387c-.311-.244-.687-.263-1-.133v43.515c.312.13.687.111.998-.131m42.0605-32.8965c.209-.071.436-.071.645 0-.209-.071-.436-.071-.645 0m-31.6777-4.7255 3.099 2.44z"/><path d="m82.835 60.022-11.355-8.901z"/></g>
                        <path d="m28.4811 38.061 8.381 6.6v-2.388-10.298c0-.833-.96-1.301-1.617-.787l-6.762 5.301c-.51.4-.511 1.172-.002 1.572m52.0586-27.2041-9.678-7.586-11.058 8.668c-.747.587-.333 1.787.617 1.787h25.4l-3.877-3.039c-.341.435-.968.511-1.404.17m24.3223 31.7314c0 .835.962 1.303 1.618.786l6.761-5.313c.51-.402.509-1.173-.001-1.574l-6.761-5.299c-.657-.514-1.617-.046-1.617.788z " fill="#7b80d6"/><path d="m38.862 42.2729v3.963l3.099 2.44 14.431 11.364c.724.57 1.745.571 2.471.003l11.382-8.922c.091-.071.19-.124.295-.16.209-.071.435-.071.644 0 .105.036.204.089.295.16l11.356 8.901c.725.568 1.745.567 2.469-.002l17.558-13.801v-30.493h-64z" fill="#fff"/><path d="m26.862 83.0707v-41.679c0-.439.27-.772.619-.918.314-.13.69-.111 1 .133l9.381 7.387 16.145 12.713c1.018.802 1.016 2.345-.004 3.145l-16.141 12.652-9.383 7.354c-.31.242-.685.261-.998.131-.349-.146-.619-.479-.619-.918zm8.383-51.883c.657-.513 1.617-.046 1.617.787v10.298 2.388l-8.381-6.599v-.001c-.509-.4-.508-1.172.002-1.572zm67.617-15.462v30.493l-17.558 13.801c-.724.57-1.744.571-2.469.002l-11.356-8.901c-.091-.071-.19-.124-.295-.159-.209-.072-.435-.072-.644 0-.105.035-.204.088-.295.159l-11.382 8.922c-.726.568-1.747.567-2.471-.003l-14.431-11.364-3.099-2.44v-3.963-26.547zm3.617 15.462v.001l6.761 5.299c.51.4.511 1.172.001 1.573l-6.761 5.314c-.656.516-1.618.049-1.618-.786v-10.613c0-.834.96-1.301 1.617-.788zm8.383 51.883c0 .834-.961 1.302-1.617.787l-9.383-7.355-16.166-12.67c-1.021-.801-1.021-2.346-.002-3.147l16.168-12.709.6-.47c.042-.034.088-.06.125-.099l8.657-6.806c.656-.515 1.618-.048 1.618.786zm-7.69 3.109h-72.62c-1.9 0-2.729-2.401-1.234-3.574l37.544-29.428 37.544 29.428c1.495 1.173.666 3.574-1.234 3.574zm9.679-48.981c-.002-.035-.008-.067-.013-.102-.017-.089-.044-.172-.082-.253-.012-.025-.02-.05-.034-.074-.058-.1-.134-.188-.224-.263-.008-.006-.011-.015-.019-.022l-11.617-9.105v-12.654c0-.552-.447-1-1-1h-18.041-25.4c-.951 0-1.365-1.2-.618-1.787l11.059-8.668 9.678 7.586c.435.341 1.063.265 1.404-.17.341-.434.265-1.063-.17-1.404l-10.295-8.069c-.362-.285-.872-.285-1.234 0l-14.062 11.021c-1.232.966-2.753 1.491-4.318 1.491h-14.003c-.552 0-1 .448-1 1v8.327c0 2.732-1.255 5.311-3.404 6.996l-8.213 6.436c-.008.007-.011.016-.019.023-.09.074-.166.162-.224.262-.014.024-.021.049-.034.074-.038.081-.065.164-.081.253-.006.035-.012.067-.014.102-.002.025-.011.048-.011.073v49.908c0 .552.448 1 1 1h90c.553 0 1-.448 1-1v-49.908c0-.025-.009-.048-.011-.073zm10.9319-28.4991c.256 0 .512-.098.707-.293l1.183-1.184c.39-.39.39-1.023 0-1.414-.391-.39-1.025-.39-1.414 0l-1.183 1.184c-.391.391-.391 1.024 0 1.414.195.195.451.293.707.293m-5.916 5.916c.256 0 .512-.098.707-.293l1.183-1.183c.39-.39.39-1.023 0-1.414-.391-.39-1.024-.39-1.414 0l-1.183 1.183c-.391.391-.391 1.023 0 1.414.195.195.451.293.707.293m6.3916-.2929c.195.195.451.293.707.293s.512-.098.707-.293c.391-.391.391-1.023 0-1.414l-1.183-1.183c-.39-.39-1.023-.39-1.414 0-.39.391-.39 1.024 0 1.414zm-5.916-5.916c.195.195.451.293.707.293s.512-.098.707-.293c.391-.39.391-1.023 0-1.414l-1.183-1.184c-.39-.39-1.023-.39-1.414 0-.39.391-.39 1.024 0 1.414z" fill="#000"/><path d="m.9997 52.3276c.834 0 1.51.677 1.51 1.51v.001c0 .552.448 1 1 1 .553 0 1-.448 1-1v-.001c0-.833.676-1.51 1.51-1.51h.001c.551 0 1-.447 1-1 0-.552-.449-1-1-1h-.001c-.834 0-1.51-.676-1.51-1.51 0-.552-.447-1-1-1-.552 0-1 .448-1 1 0 .834-.676 1.51-1.51 1.51-.552 0-1 .448-1 1 0 .553.448 1 1 1m124.4902 13.0117c0 3.866-3.135 7-7 7-3.866 0-7-3.134-7-7s3.134-7 7-7c3.865 0 7 3.134 7 7" fill="#fff"/><path d="m125.4899 65.3393c0 3.866-3.135 7-7 7-3.866 0-7-3.134-7-7s3.134-7 7-7c3.865 0 7 3.134 7 7" fill="#d3d6ed"/><path d="m118.4899 59.3393c-3.309 0-6 2.691-6 6s2.691 6 6 6 6-2.691 6-6-2.691-6-6-6m0 14c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8" fill="#000"/><path d="m129.652 87.18 6-10.392 6 10.392z" fill="#fff"/><path d="m131.3844 86.1801h8.535l-4.267-7.392zm10.268 2h-12c-.358 0-.688-.19-.867-.5-.178-.31-.178-.69 0-1l6-10.392c.358-.619 1.375-.619 1.733 0l6 10.392c.179.31.179.69 0 1s-.509.5-.866.5z" fill="#000"/><path d="m80.9909 39.059-4.301-4.301c-.281-.281-.281-.737 0-1.018l4.301-4.301c.281-.281.281-.736 0-1.018l-4.301-4.301c-.281-.281-.737-.281-1.018 0l-4.301 4.3c-.281.282-.736.282-1.018 0l-4.3-4.3c-.282-.281-.738-.281-1.019 0l-4.301 4.301c-.281.282-.281.737 0 1.018l4.301 4.301c.281.281.281.737 0 1.018l-4.301 4.301c-.281.281-.281.737 0 1.019l4.301 4.3c.281.282.737.282 1.019 0l4.3-4.3c.282-.282.737-.282 1.018 0l4.301 4.3c.281.282.737.282 1.018 0l4.301-4.3c.281-.282.281-.738 0-1.019" fill="#ff4343"/></g>
                    </svg>
                    <h1 className="font-semibold text-xl my-2">Email confirmation link expired.</h1>
                    <p className="bg-[A0A0A0A] mb-[20px]">Please click the login button to receive the verification link again.</p>
                    <Link href="/login" className="bg-[#5765f2] w-[100%] my-5 py-[15px] px-[190px] rounded-md"  >
                    LOGIN </Link>
                </div> 
            );
        }
    }
    return(
        <Skeleton className="bg-[#8a94ed] top-[220px] absolute w-[500px] h-[300px] rounded-md" />
    );

}
 
export default ResetPassword;