"use server"

import { cookies } from "next/headers"
import { createClient } from "../utils/supabase/server"
import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"
import { string } from "zod"
import { db } from "../lib/db"

export async function login(formData: FormData) {
    const email = formData.get('email')
    const password = formData.get('password')

    const cookieStore = cookies()
    const supabase = createClient(cookieStore)
    const { error } = await supabase.auth.signInWithPassword({
        email,
        password
    })

    console.log(error)

    if (error) {
        redirect('/error')
    }
    revalidatePath('/')
    redirect('/')
}
export async function signup(formData: FormData) {
    //zod - TODO
    //supabase server client
    const supabase = createClient()

    const email = formData.get('email')
    const password = formData.get('password')


    const { error } = await supabase.auth.signUp({
        email,
        password
    })

    if (error) {
        redirect('/error')
    }
    revalidatePath('/')
    redirect('/')
}

export async function getUser() {
    const supabase = createClient()
    const user = await supabase.auth.getUser()
    return user
}

export async function signOut() {
    try {
        const supabase = createClient()
        await supabase.auth.signOut()
        redirect('/')
    } catch (error) {
        console.log(error)
    }

}

export async function getUserById(id: string) {
    try {
        const user = db.user.findUnique({
            where: {
                id: id
            },
            select: {
                name: true,
                surname: true
            }
        })
        return user
    } catch (error) {
        console.error(error)
    }

}
