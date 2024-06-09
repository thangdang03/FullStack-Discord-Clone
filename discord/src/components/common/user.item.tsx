'use client'
import { useState } from "react";
import UserButton from "../user/buttonUser";
import { EditUser } from "../user/edit.user";
import { ModeToggle } from "./ModeToggle";
const UserItem = () => {
    const [editUser,setEditUser] = useState(false);
    return ( 
        <div>
            <EditUser
                open={editUser}
                setOpen={setEditUser}
            />
            <ModeToggle/>
            <UserButton setEditUser={setEditUser} />
        </div>
    );
}
 
export default UserItem;