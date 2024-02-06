import {signIn} from 'next-auth/react'
import { auth } from "../auth"
import Image from 'next/image'
import SignInButton from './components/SiginButton'
export default async function Home() {
  const session = await auth()

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <SignInButton>Sign In</SignInButton>
      <p>Welcome {session?.user?.name}!</p>
      <Image 
      src={session?.user?.image}
      width={100}
      height={100}/>
    </main>
  );
}
