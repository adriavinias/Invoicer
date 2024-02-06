import { signOut } from "next-auth/react";

export default function SignOutButton({children}){
    return(
        <button
        className="flex"
        onClick={()=>signOut()}>
            {children}
        </button>
    )
}