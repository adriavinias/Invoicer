'use server'
import { getUser, getUserById } from "../login/actions"
export async function createInvoice(prevState: any, formData: FormData){
    console.log('hola')
    console.log(formData)
    //zod
    //get user
    //if pass zod save to db
    //create pdf
    const result = await getUser()
    const id = result.data.user?.id

    const userName = await getUserById(id)
    console.log(userName)
    
}


