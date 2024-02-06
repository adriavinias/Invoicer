import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { db } from "./app/lib/db"


export const {
  handlers: { GET, POST },
  auth,
} = NextAuth({
  providers: [
    GitHub({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string
    })
  ],
  adapter: PrismaAdapter(db)
})