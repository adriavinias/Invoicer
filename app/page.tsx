import Link from "next/link";
import { createClient } from './utils/supabase/server'
import { cookies } from "next/headers";
const cookieStore = cookies()

export default async function Home() {
  const supabase = createClient(cookieStore)
  const {data: {user}} = await supabase.auth.getUser()
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {!user ? (<Link href="/login">Login</Link>) : (<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"> Sign out</button>)}
      
      <p>{user ? user?.email : ''}</p>
    </main>
  );
}
