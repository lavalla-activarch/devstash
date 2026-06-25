import GitHub from "next-auth/providers/github"
import type { NextAuthConfig } from "next-auth"

export default {
  providers: [GitHub],
  callbacks: {
    authorized({ auth, request }) {
      const { pathname } = request.nextUrl
      if (pathname.startsWith("/dashboard")) {
        return !!auth
      }
      return true
    },
  },
} satisfies NextAuthConfig
