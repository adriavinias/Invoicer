'use client'

import { Button } from "@nextui-org/react"
import { signOut } from "../login/actions"
export default function SignOut({ children }) {
    return (
        <Button
            onClick={async () => { await signOut() }}>{children}</Button>
    )
}