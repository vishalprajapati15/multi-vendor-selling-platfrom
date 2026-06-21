import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import connectDB from "./lib/connedtDB";
import User from "./model/user.model";
import bcrypt from "bcryptjs";

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Credentials({
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials, request) {
                await connectDB();
                const email = credentials?.email as string
                const password = credentials?.password as string

                const user = await User.findOne({ email });
                if (!user) {
                    throw new Error('User is not found!!');
                }

                const isMatched = await bcrypt.compare(password, user.password);
                if (!isMatched) {
                    throw new Error('Incorrect Password!!');
                }
                return {
                    id: user._id.toString(),
                    email: user.email,
                    name: user.name,
                    role: user.role
                }
            },
        }),
    ],
    callbacks: {
        jwt({ token, user }) {
            if (user) {
                token.id = user.id,
                    token.email = user.email,
                    token.name = user.name,
                    token.role = user.role
            }
            return token
        },
        session({ session, token }) {
            if (session.user) {
                session.user.id = token.id,
                session.user.email = token.email,
                session.user.name = token.name,
                session.user.role = token.role
            }
            return session
        }
    },
    pages: {
        signIn: "/login",
        error: "/login"
    },
    session: {
        strategy: "jwt",
        maxAge: 10 * 24 * 60 * 60 * 1000
    },
    secret: process.env.AUTH_SECRET
})
