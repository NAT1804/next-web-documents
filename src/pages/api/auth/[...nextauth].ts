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
          throw new Error('There was an error on uer authentication');
        }
      }
    })
    // ...add more providers here
  ],
  // pages: {
  //   signIn: '/auth/credentials-signin'
  // },
  callbacks: {
    async jwt({ token, user, account }) {
      console.log('user in jwt', user);
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
  },
  // secret: process.env.NEXTAUTH_SECRET,
  jwt: {
    secret: process.env.NEXTAUTH_SECRET
  },
  session: {
    strategy: 'jwt'
  }
  // theme: {
  //   colorScheme: 'auto', // "auto" | "dark" | "light"
  //   brandColor: '', // Hex color code #33FF5D
  //   logo: '/logo.png' // Absolute URL to image
  // },
  // debug: process.env.NODE_ENV === 'development'
});
