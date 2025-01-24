import NextAuth, {
  Account,
  Awaitable,
  Profile,
  User,
  Session,
} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import jwt from "jsonwebtoken"; // Thêm dòng này
import { API_register } from "@/service/userService";
import axios from "axios";

type Extended_User_Type = User & {
  _id?: string | any;
  token_gg_encoded?: any;
  token_gg_decoded?: any;
  id_token_google?: any;
  accessToken_google?: any;
};

export default NextAuth({
  session: {
    strategy: "jwt",
  },
  providers: [
    // GitHubProvider({
    //   clientId: process.env.GITHUB_ID,
    //   clientSecret: process.env.GITHUB_SECRET,
    // }),
    // CredentialsProvider({
    //   async authorize(credentials, req) {
    //     dbConnect();

    //     const { email, password } = credentials;

    //     const user = await User.findOne({ email });

    //     if (!user) {
    //       throw new Error("Invalid Email or Password");
    //     }

    //     const isPasswordMatched = await bcrypt.compare(password, user.password);

    //     if (!isPasswordMatched) {
    //       throw new Error("Invalid Email or Password");
    //     }

    //     return user;
    //   },
    // }),
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  secret: process.env.NEXT_PUBLIC_NEXTAUTH_SECRET,
  pages: {
    signIn: "/account/login",
    // signOut: '/api/auth/signout', // Displays form with sign out button
    // error: '/api/auth/error', // Error code passed in query string as ?error=
    // verifyRequest: '/api/auth/verify-request', // Used for check email page
    // newUser: null // If set, new users will be directed here on first sign in
  },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }): Promise<any> {
      return Promise.resolve(true);
    },
    async session({ session, token, user }): Promise<Session | any> {
      let secret_key =
        "2handmarket_tdn" || process.env.NEXT_PUBLIC_NEXTAUTH_SECRET;
      let token_gg_encoded: string = jwt.sign(token, secret_key, {
        algorithm: "HS256",
      });
      // lấy google id từ token
      (session.user as Extended_User_Type)._id = `${token.sub}${"acc"}`;
      (session.user as Extended_User_Type).token_gg_encoded = token_gg_encoded;
      (session.user as Extended_User_Type).id_token_google = token.id_token;
      (session.user as Extended_User_Type).accessToken_google =
        token.accessToken;
      // (session.user as Extended_User_Type).token_gg_decoded = token;
      // (session.user as Extended_User_Type).id_token_google = token.id_token;

      return session;
    },
    // async redirect({ url, baseUrl }) {
    //   // let currentURL = new URL(window.location.href);
    //   // let callback_URL = `${currentURL.protocol}//${currentURL.host}/`;
    //   // console.log("check url: ", url, baseUrl);
    //   return Promise.resolve(baseUrl);
    // },

    async jwt({ token, user, account, profile, isNewUser }) {
      // if (account) {
      //   token.accessToken = account.access_token;
      //   token.id_token = account.id_token;
      // }
      if (user) {
        // lưu infor acc google về db
        let build_data = {
          _id: `${token.sub}${"acc"}`, // formated để lưu vào ObjectId của mongoDB
          name: user?.name,
          email: user?.email,
          img: user?.image,
          role: "Client",
        };
        let response: any = "";
        response = await API_register(build_data);
      }

      return token;
    },
  },
});

// let build_data = {
//   _id: token.sub,
//   name: session.user?.name,
//   email: session.user?.email,
//   img: session.user?.image,
//   role: "Client",
// };
// console.log("check builddata: ", build_data);
// let response: any = "";
// response = await API_register(build_data);
// console.log("response register when login account google: ", response);
