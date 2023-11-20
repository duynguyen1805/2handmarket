// "use client";

import Image from "next/image";
import icon_google from "../../assets/icon/icon_google.png";
// import githubLogo from "@/public/github.png";
import { signIn } from "next-auth/react";

export function GoogleSignInButton() {
  const handleClick = () => {
    let currentURL = new URL(window.location.href);
    let callback_URL = `${currentURL.protocol}//${currentURL.host}/`;
    signIn("google", { callbackUrl: callback_URL });
  };

  return (
    <button onClick={handleClick}>
      <Image
        src={icon_google}
        alt="Đăng nhập bằng Google"
        className="h-[32px] w-[32px] cursor-pointer"
      />
    </button>
  );
}

// export function GithubSignInButton() {
//   const handleClick = () => {
//     signIn("github");
//   };

//   return (
//     <button
//       onClick={handleClick}
//       className="w-full flex items-center font-semibold justify-center h-14 px-6 mt-4 text-xl transition-colors duration-300 bg-white border-2 border-black text-black rounded-lg focus:shadow-outline hover:bg-slate-200"
//     >
//       <Image src={githubLogo} alt="Github Logo" width={20} height={20} />
//       <span className="ml-4">Continue with Github</span>
//     </button>
//   );
// }

// export function CredentialsSignInButton() {
//   const handleClick = () => {
//     signIn();
//   };

//   return (
//     <button
//       onClick={handleClick}
//       className="w-full flex items-center font-semibold justify-center h-14 px-6 mt-4 text-xl transition-colors duration-300 bg-white border-2 border-black text-black rounded-lg focus:shadow-outline hover:bg-slate-200"
//     >
//       {/* <Image src={githubLogo} alt="Github Logo" width={20} height={20} /> */}
//       <span className="ml-4">Continue with Email</span>
//     </button>
//   );
// }
