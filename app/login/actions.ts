"use server"

import { cookies } from "next/headers"
import { createClient } from "../utils/supabase/server"
import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"
import { string } from "zod"

export async function login(formData: FormData){
    const email = formData.get('email')
    const password = formData.get('password')

    const cookieStore = cookies()
    const supabase = createClient(cookieStore)
    const {error} = await supabase.auth.signInWithPassword({
        email,
        password
    })

    console.log(error)

    if(error){
        redirect('/error')
    }
    revalidatePath('/')
    redirect('/')
}
export async function signup(formData: FormData){
    //zod - TODO
    //supabase server client
    const cookieStore = cookies()
    const supabase = createClient(cookieStore)

    const email = formData.get('email')
    const password = formData.get('password')


    const {error} = await supabase.auth.signUp({
        email,
        password
    })
    
    if(error){
        redirect('/error')
    }
    revalidatePath('/')
    redirect('/')
}

