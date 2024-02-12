'use server'
import Link from "next/link";
import { createClient } from './utils/supabase/server'
import { getUser, signOut } from "./login/actions";
import SignOut from "./components/SignOut";
export default async function Home() {
  const supabase = createClient()
  const { data: { user } } = await getUser()
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {!user ? (<Link href="/login">Login</Link>)
        :
        (
          <SignOut onSignOut={signOut}>
            Sign Out
          </SignOut>
        )}

      <p>{user ? user?.email : ''}</p>
    </main>
  );
}

/*
  server component
    server action
    server action ----> (pass as props) ----> client component (handles click, runs server action)

*/