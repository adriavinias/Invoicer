'use server'
import { getUser, getUserById } from "../login/actions"
import { redirect } from "next/navigation"

export async function createInvoice(prevState: any, formData: FormData){
    console.log('hola')
    console.log(formData)
    //zod
    //get user
    //if pass zod save to db
    //create pdf
    const result = await getUser()
    const id = result.data.user?.id as string

    const userName = await getUserById(id)
    console.log(userName)

    redirect('/invoices/download')
}





