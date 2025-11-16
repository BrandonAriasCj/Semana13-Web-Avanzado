import NextAuth, { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "@/lib/db";
import { verifyPassword, isAccountLocked, calculateLockTime, shouldLockAccount } from "@/lib/auth-utils";

export const authOptions: AuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
        GitHubProvider({
            clientId: process.env.GITHUB_CLIENT_ID as string,
            clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Email y contraseña son requeridos");
                }

                const user = db.users.findByEmail(credentials.email);

                if (!user) {
                    throw new Error("Credenciales inválidas");
                }

                // Verificar si la cuenta está bloqueada
                if (isAccountLocked(user.lockedUntil)) {
                    throw new Error("Cuenta bloqueada por múltiples intentos fallidos. Intenta más tarde.");
                }

                // Verificar contraseña
                const isValid = await verifyPassword(credentials.password, user.password);

                if (!isValid) {
                    // Incrementar intentos fallidos
                    const newAttempts = user.loginAttempts + 1;
                    const lockedUntil = shouldLockAccount(newAttempts) ? calculateLockTime() : undefined;
                    
                    db.users.updateLoginAttempts(user.email, newAttempts, lockedUntil);

                    if (lockedUntil) {
                        throw new Error("Demasiados intentos fallidos. Cuenta bloqueada por 15 minutos.");
                    }

                    throw new Error(`Credenciales inválidas. Intentos restantes: ${5 - newAttempts}`);
                }

                // Login exitoso - resetear intentos
                db.users.resetLoginAttempts(user.email);

                return {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                };
            }
        }),
    ],
    pages: {
        signIn: '/signin',
    },
    session: {
        strategy: "jwt",
    },
    callbacks: {
        async jwt({ token, user }) {
            // No exponemos el ID en el token
            if (user) {
                token.email = user.email;
                token.name = user.name;
            }
            return token;
        },
        async session({ session }) {
            // Solo exponemos nombre y email, no el ID
            return session;
        },
    },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
