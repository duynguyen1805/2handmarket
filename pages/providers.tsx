// "use client";

// import { SessionProvider } from "next-auth/react";

// type Props = {
//   children?: React.ReactNode;
// };

// export const NextAuthProvider = ({ children }: Props) => {
//   return <SessionProvider>{children}</SessionProvider>;
// };

// pages/providers/NextAuthProvider.ts

import { SessionProvider } from "next-auth/react";

type Props = {
  children?: React.ReactNode;
};

const NextAuthProvider = ({ children }: Props) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default NextAuthProvider;
