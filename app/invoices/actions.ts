'use server'
import { getUser, getUserById } from "../login/actions"
import { redirect } from "next/navigation"


export async function createInvoice(prevState: any, formData: FormData) {
    //zod
    //get user
    //if pass zod save to db
    //create pdf
    console.log('hola')
    const result = await getUser()
    const id = result.data.user?.id as string

    const userName = await getUserById(id)



    redirect(`/invoices`)
}

export async function downloadInvoice(prevState: any, formData: FormData) {
    console.log(formData)
}


