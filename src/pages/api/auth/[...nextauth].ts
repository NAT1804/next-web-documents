import api from 'api';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: {
          label: 'email',
          type: 'email',
          placeholder: 'jsmith@example.com'
        },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        try {
          const user = await api.post(
            `${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`,
            {
              email: credentials.email,
              password: credentials.password
            },
            {
              headers: {
                accept: '*/*',
                'Content-Type': 'application/json'
              }
            }
          );

          if (user) {
            return user.data;
          }
          return null;
        } catch (error) {
          throw new Error('There was an error on user authentication');
        }
      }
    })
    // ...add more providers here
  ],
  // secret: process.env.JWT_SECRET,
  pages: {
    signIn: '/login'
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.accessToken = user.token;
        token.user = user.data;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.accessToken = token.accessToken;
        session.user = token.user;
      }
      return session;
    }
    // async redirect({ url, baseUrl }) {
    //   if (url.startsWith(baseUrl)) return url;
    //   // Allows relative callback URLs
    //   else if (url.startsWith('/')) return new URL(url, baseUrl).toString();
    //   return baseUrl;
    // }
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET
  },
  session: {
    strategy: 'jwt'
  },
  debug: process.env.NODE_ENV === 'development'
});
