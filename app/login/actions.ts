"use server"

import { cookies } from "next/headers"
import { createClient } from "../utils/supabase/server"
import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"

export async function login(formData: FormData){
    const email = formData.get('email')
    const password = formData.get('password')
}
export async function signup(formData: FormData){
    //zod - TODO
    //supabase server client
    const cookieStore = cookies()
    const supabase = createClient(cookieStore)

    const email = formData.get('email')
    const password = formData.get('password')

    console.log({email, password})

    const data = {
        email,
        password
    }

    const {error} = await supabase.auth.signUp(data)

    console.log({error})

    if(error){
        redirect('/error')
    }
    revalidatePath('/')
    redirect('/')
}

