import axios, { AxiosDefaults, AxiosError } from "axios";
import instance from "./getToken";
import { File } from "buffer";

// AUTH

const register = async(email:String , username: String,password: String)  =>{
    try {
        const sending:AxiosDefaults = await axios.post('http://localhost:4000/api/ath/register',{email,username,password},
                {withCredentials: true}
        );
        return true
    } catch (error) {
        console.log(error);
        return false;
    }
}

const login = async (email:String,password: String)  =>{
    try {
        const sending:AxiosDefaults = await axios.post('http://localhost:4000/api/ath/login/email',
            {email,password},
            {withCredentials: true}
        );
        return sending.data;
    } catch (error) {
        if(axios.isAxiosError(error)){
            console.log(error);
            return error.response?.data;
        }else{
            return null;
        }
    }
}

const reset = async (email:String)  =>{
    try {
        const sending:AxiosDefaults = await axios.post('http://localhost:4000/api/ath/reset',
            {email},
            {withCredentials: true}
        );
        console.log({sending});
        localStorage.setItem("accessToken",sending.data.metadata.token);
        return sending.data;
    } catch (error) {
        if(axios.isAxiosError(error)){
            console.log(error);
            return error.response?.data;
        }else{
            return null;
        }
    }
}

const loginSuccess = async (id:string)  =>{
    try {
        const token = await localStorage.getItem("accessToken"); 
        const sending:AxiosDefaults = await axios.get(`http://localhost:4000/api/ath/login/success/${id}`,{withCredentials: true});
        localStorage.setItem("accessToken",sending.data.metadata.token);
        const user = await JSON.stringify(sending.data?.metadata.user);
        localStorage.setItem("user",user);
        return sending.data.metadata;
    } catch (error) {
        if(axios.isAxiosError(error)){
            console.log(error);
            return error.response?.data;
        }else{
            return null;
        }
    }
}

const HandelToken = async () => {
    try {
        const newToken:AxiosDefaults = await axios.get("http://localhost:4000/api/ath/handel",{withCredentials: true});
        const user = JSON.stringify(newToken.data?.metadata.user);
        localStorage.setItem("accessToken",newToken.data.metadata.token);
        localStorage.setItem("user",user);
        return newToken.data.metadata.token;
    } catch (error) {
        if(axios.isAxiosError(error)){
            console.log(error.response?.data.message);
            return error.response?.data.message;
        }
        console.log(error);
    }
}

const logout = async ()  =>{
    try {
        const token = localStorage.getItem("accessToken");
        const tem:any = localStorage.getItem("user");
        const user = JSON.parse(tem);
        const sending = await instance.delete("http://localhost:4000/api/ath/logout",{
            headers:{
                "Content-Type": "multipart/form-data",
                "token": token,
                "userID" : user.id
            },
            withCredentials: true
        })
        return sending.data.metadata;
    } catch (error) {
        if(axios.isAxiosError(error)){
            console.log(error);
            return error.response?.data;
        }else{
            return null;
        }
    }
}

// USER
const getUser = async (id:String) => {
    try {
        const token = await localStorage.getItem("accessToken");
        console.log(token);
        const newToken:AxiosDefaults = await axios.get(`http://localhost:4000/api/user/${id}`,{
            headers:{
                token,
                userID: id.toString()
            }
        });
        console.log({newToken})
        return newToken.data.data;
    } catch (error) {
        if(axios.isAxiosError(error)){
            console.log(error.response?.data.message);
            return error.response?.data.message;
        }
        console.log(error);
    }
}

const updateUser = async (name:any,image: File) => {
    try {
        const token = await localStorage.getItem("accessToken");
        const formData:any = new FormData();
        formData.append("name",name);
        formData.append("image",image,image.name);
        const tem:any = localStorage.getItem("user");
        const user = JSON.parse(tem);
        const sending = await instance.put("http://localhost:4000/api/user",formData,{
            headers:{
                "Content-Type": "multipart/form-data",
                "token": token,
                "userID" : user.id
            },
            withCredentials: true
        },)
        return sending.data.code;
        
    } catch (error) {
        if(axios.isAxiosError(error)){
            console.log(error.response?.data.message);
            return error.response?.data.message;
        }
        console.log(error);
    }
}

// SERVER
const createServer = async (name:string ,image: File )=>{
    try {
        const formData:any = new FormData();
        formData.append("name",name);
        formData.append("image",image,image.name);
        const token = localStorage.getItem("accessToken");
        const tem:any = localStorage.getItem("user");
        const user = JSON.parse(tem);
        const sending = await instance.post("http://localhost:4000/api/server",formData,{
            headers:{
                "Content-Type": "multipart/form-data",
                "token": token,
                "userID" : user.id
            },
            withCredentials: true
        },)
        return sending.data.code;
    } catch (error) {
        if(axios.isAxiosError(error)){
            console.log(error.response?.data.message);
            return error.response?.data.code;
        }
        console.log(error);
    }
}

const editServer = async (name:string ,image: File,serverID: string )=>{
    try {
        const formData:any = new FormData();
        formData.append("name",name);
        formData.append("image",image,image.name);
        const token = localStorage.getItem("accessToken");
        const tem:any = localStorage.getItem("user");
        const user = JSON.parse(tem);
        const sending = await instance.put(`http://localhost:4000/api/server/${serverID}`,formData,{
            headers:{
                "Content-Type": "multipart/form-data",
                "token": token,
                "userID" : user.id
            },
            withCredentials: true
        },)
        return sending.data.code;
    } catch (error) {
        if(axios.isAxiosError(error)){
            console.log(error.response?.data.message);
            return error.response?.data.code;
        }
        console.log(error);
    }
}

const getServerById= async (id:string)=>{
    try {
        const token = localStorage.getItem("accessToken");
        const sending:AxiosDefaults = await instance.get(`http://localhost:4000/api/server` ,{
            headers:{
                token: token,
                userID: id
            },
            withCredentials: true
        })
        return sending.data.metadata.data;
    } catch (error) {
        if(axios.isAxiosError(error)){
            console.log(error.response?.data.message);
            return error.response?.data.message;
        }
        console.log(error);
        return null;
    }
}

const deleteServerById= async (id:string)=>{
    try {
        const token = localStorage.getItem("accessToken");
        const tem:any = await  localStorage.getItem("user");
        const user =  await JSON.parse(tem);
        const sending:AxiosDefaults = await instance.delete(`http://localhost:4000/api/server/${id}` ,{
            headers:{
                token: token,
                userID:  user.id
            },
           withCredentials: true
        })
        return sending.data.code;
    } catch (error) {
        if(axios.isAxiosError(error)){
            console.log(error.response?.data.message);
            return error.response?.data.message;
        }
        console.log(error);
        return null;
    }
}

// INVITE
const generateCode = async (id:any) => {
    try {
        const token = await localStorage.getItem("accessToken");
        const tem:any = await  localStorage.getItem("user");
        const user =  await JSON.parse(tem);
        console.log({token,user,id})
        const sending:AxiosDefaults = await instance.get(`http://localhost:4000/api/invite` ,{
            headers:{
                token: token,
                userID: user.id,
                server: id
            },
            withCredentials: true
        })
        return sending.data;
    } catch (error) {
        if(axios.isAxiosError(error)){
            console.log(error.response?.data.message);
            return error.response?.data.message;
        }
        console.log(error);
        return null;
    }
}

const verifyInvite = async (id:any) => {
    try {
        const token = await localStorage.getItem("accessToken");
        const tem:any = await  localStorage.getItem("user");
        const user =  await JSON.parse(tem);
        const sending:AxiosDefaults = await axios.get(`http://localhost:4000/api/invite/${id}` ,{
            headers:{
                token: token,
                userID: user.id,
            },
            withCredentials: true
        })
        return sending.data.code;
    } catch (error) {
        console.log(error);
        if(axios.isAxiosError(error)){
            console.log(error.response?.data.message);
            return error.code;
        }
        return null;
    }
}

// MEMBER
const getMemberByServerId = async (id:any) => {
    try {
        const token = await localStorage.getItem("accessToken");
        const tem:any = await  localStorage.getItem("user");
        const user =  await JSON.parse(tem);
        const sending:AxiosDefaults = await instance.get(`http://localhost:4000/api/member` ,{
            headers:{
                token: token,
                userID: user.id,
                serverId: id
            },
            withCredentials: true
        })
        return sending?.data.metadata.data;
    } catch (error) {
        console.log(error);
        if(axios.isAxiosError(error)){
            console.log(error.response?.data.message);
            return error.code;
        }
        return null;
    }
}

const leaveFromServer = async(id:any) =>{
    try {
        const token = await localStorage.getItem("accessToken");
        const tem:any = await  localStorage.getItem("user");
        const user =  await JSON.parse(tem);
        const sending:AxiosDefaults = await instance.delete(`http://localhost:4000/api/member/${id}` ,{
            headers:{
                token: token,
                userID: user.id,
            },
            withCredentials: true
        })
        return sending?.data.code;
    } catch (error) {
        console.log(error);
        if(axios.isAxiosError(error)){
            console.log(error.response?.data.message);
            return error.code;
        }
        return null;
    }
}

const authenticationRoles = async(memberId:any,roles:any) =>{
    try {
        const token = await localStorage.getItem("accessToken");
        const tem:any = await  localStorage.getItem("user");
        const user =  await JSON.parse(tem);
        const sending:AxiosDefaults = await instance.put(`http://localhost:4000/api/member/${memberId}` ,
        {
            roles
        }
        ,{
            headers:{
                token: token,
                userID: user.id,
            },
            withCredentials: true
        })
        return sending?.data.code;
    } catch (error) {
        console.log(error);
        if(axios.isAxiosError(error)){
            console.log(error.response?.data.message);
            return error.code;
        }
        return null;
    }
}

const KickMember = async(memberId:any) =>{
    try {
        const token = await localStorage.getItem("accessToken");
        const tem:any = await  localStorage.getItem("user");
        const user =  await JSON.parse(tem);
        const sending:AxiosDefaults = await instance.delete(`http://localhost:4000/api/member`,{
            headers:{
                token: token,
                userID: user.id,
                memberId: memberId
            },
            withCredentials: true
        })
        return sending?.data.code;
    } catch (error) {
        console.log(error);
        if(axios.isAxiosError(error)){
            console.log(error.response?.data.message);
            return error.code;
        }
        return null;
    }
}

// Channel
const CreateChannel = async (id:any,name: string,type: string) => {
    try {
        const token = await localStorage.getItem("accessToken");
        const tem:any = await  localStorage.getItem("user");
        const user =  await JSON.parse(tem);
        const sending:AxiosDefaults = await axios.post(`http://localhost:4000/api/channel/${id}`,{
            name,
            type
        },{
            headers:{
                token: token,
                userID: user.id,
            },
            withCredentials: true
        })
        return sending?.data.code;
    } catch (error) {
        console.log(error);
        if(axios.isAxiosError(error)){
            console.log(error.response?.data.message);
            return error.code;
        }
        return null;
    }
} 

const getChannel = async (id:any) => {
    try {
        const token = await localStorage.getItem("accessToken");
        const tem:any = await  localStorage.getItem("user");
        const user =  await JSON.parse(tem);
        const sending:AxiosDefaults = await axios.get(`http://localhost:4000/api/channel` ,{
            headers:{
                token: token,
                userID: user.id,
                serverId: id
            },
            withCredentials: true
        })
        return sending?.data.metadata.data;
    } catch (error) {
        console.log(error);
        if(axios.isAxiosError(error)){
            console.log(error.response?.data.message);
            return error.code;
        }
        return null;
    }
} 

const editChannel = async (channelId:any,serverId:any ,name: string,type: string) => {
    try {
        const token = await localStorage.getItem("accessToken");
        const tem:any = await  localStorage.getItem("user");
        const user =  await JSON.parse(tem);
        const sending:AxiosDefaults = await instance.put(`http://localhost:4000/api/channel/${channelId}`,{
            name,
            type
        },{
            headers:{
                token: token,
                userID: user.id,
                serverId: serverId
            },
            withCredentials: true
        })
        return sending?.data.code;
    } catch (error) {
        console.log(error);
        if(axios.isAxiosError(error)){
            console.log(error.response?.data.message);
            return error.code;
        }
        return null;
    }
} 

const deleteChannel = async (channelId:any,serverId:any ) => {
    try {
        const token = await localStorage.getItem("accessToken");
        const tem:any = await  localStorage.getItem("user");
        const user =  await JSON.parse(tem);
        const sending:AxiosDefaults = await instance.delete(`http://localhost:4000/api/channel/${channelId}`,{
            headers:{
                token: token,
                userID: user.id,
                serverId: serverId
            },
            withCredentials: true
        })
        return sending?.data.code;
    } catch (error) {
        console.log(error);
        if(axios.isAxiosError(error)){
            console.log(error.response?.data.message);
            return error.code;
        }
        return null;
    }
} 

// message 
const createMessage = async (content:string ,file: File ,channelId:string)=>{
    try {
        const formData:any = new FormData();
        formData.append("content",content);
        formData.append("channelId",channelId);
        if(file){
            formData.append("file",file,file.name);
            formData.append("type",file.type);

        }
        const token = localStorage.getItem("accessToken");
        const tem:any = localStorage.getItem("user");
        const user = JSON.parse(tem);
        const sending = await instance.post("http://localhost:4000/api/message",formData,{
            headers:{
                "Content-Type": "multipart/form-data",
                "token": token,
                "userID" : user.id
            },
            withCredentials: true
        },)
        return sending.data.code;
    } catch (error) {
        if(axios.isAxiosError(error)){
            console.log(error.response?.data.message);
            return error.response?.data.code;
        }
        console.log(error);
    }
}

const getMessage= async (channelId: string ,page:number)=>{
    try {
        const token = localStorage.getItem("accessToken");
        const tem:any = localStorage.getItem("user");
        const user = JSON.parse(tem);
        const sending:AxiosDefaults = await instance.get(`http://localhost:4000/api/message?page=${page}` ,{
            headers:{
                token: token,
                userID: user.id,
                channelId: channelId
            },
            withCredentials: true
        })
        return sending.data.metadata.data;
    } catch (error) {
        if(axios.isAxiosError(error)){
            console.log(error.response?.data.message);
            return error.response?.data.message;
        }
        console.log(error);
        return null;
    }
}

const updateMessage = async (content:string  ,messageId:string)=>{
    try {
        const formData:any = new FormData();
        formData.append("content",content);
        const token = localStorage.getItem("accessToken");
        const tem:any = localStorage.getItem("user");
        const user = JSON.parse(tem);
        const sending = await instance.put(`http://localhost:4000/api/message/${messageId}`,formData,{
            headers:{
                "Content-Type": "multipart/form-data",
                "token": token,
                "userID" : user.id
            },
            withCredentials: true
        },)
        return sending.data.code;
    } catch (error) {
        if(axios.isAxiosError(error)){
            console.log(error.response?.data.message);
            return error.response?.data.code;
        }
        console.log(error);
    }
}

const deleteMessage = async (messageId:string)=>{
    try {
        const token = localStorage.getItem("accessToken");
        const tem:any = localStorage.getItem("user");
        const user = JSON.parse(tem);
        const sending = await instance.delete(`http://localhost:4000/api/message/${messageId}`,{
            headers:{
                "Content-Type": "multipart/form-data",
                "token": token,
                "userID" : user.id
            },
            withCredentials: true
        },)
        return sending.data.code;
    } catch (error) {
        if(axios.isAxiosError(error)){
            console.log(error.response?.data.message);
            return error.response?.data.code;
        }
        console.log(error);
    }
}

const getToken = async (room:any)=>{
    try {
        const tem:any = localStorage.getItem("user");
        const user = JSON.parse(tem);
        const sending = await axios.post("http://localhost:4000/api/video",{
            user: user.name,
            room: room
        },{
            withCredentials: true
        })

        console.log(sending)
        return sending.data.metadata.videoToken;
    } catch (error) {
        if(axios.isAxiosError(error)){
            console.log(error.response?.data.message);
            return error.response?.data.code;
        }
        console.log(error);
    }
}

export {
    getToken,
    register,
    login,
    logout,
    loginSuccess,
    reset,
    HandelToken,
    getUser,
    updateUser,
    createServer,
    editServer,
    getServerById,
    deleteServerById,
    generateCode,
    verifyInvite,
    getMemberByServerId,
    KickMember,
    CreateChannel,
    deleteChannel,
    authenticationRoles,
    getChannel,
    leaveFromServer,
    editChannel,
    createMessage,
    getMessage,
    updateMessage,
    deleteMessage,
}