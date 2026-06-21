import Credentials from "next-auth/providers/credentials";
import type { JWT } from "next-auth/jwt";
import type { Session } from "next-auth";
import connectDB from "./lib/connedtDB";
import User from "./model/user.model";
import bcrypt from "bcryptjs";

export const authOptions = {
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
        jwt({ token, user }: { token: JWT; user: any }) {
            if (user) {
                token.id = user.id;
                token.email = user.email;
                token.name = user.name;
                token.role = user.role;
            }
            return token;
        },
        session({ session, token }: { session: Session; token: JWT }) {
            if (session.user) {
                session.user.id = token.id as string;
                session.user.email = token.email as string;
                session.user.name = token.name as string;
                (session.user as any).role = token.role;
            }
            return session;
        }
    },
    pages: {
        signIn: "/login",
        error: "/login"
    },
    session: {
        strategy: "jwt" as const,
        maxAge: 10 * 24 * 60 * 60 * 1000
    },
    secret: process.env.AUTH_SECRET
};
