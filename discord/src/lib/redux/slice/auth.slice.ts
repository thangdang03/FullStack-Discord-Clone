import {createSlice,PayloadAction} from "@reduxjs/toolkit"

const initialState = { 
    currentUser: null,
    isFreshing: false,
    isError: false
}


const ahtSlice = createSlice({
    name: "Auth",
    initialState,
    reducers:{
        loginStart:(state,action: PayloadAction<any>)=>{
            const {token,user} = action.payload;
            return 
         }
    }
})