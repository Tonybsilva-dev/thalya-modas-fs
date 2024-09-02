import { Metadata } from "next";
import { SignInPageInterface } from "../interface/signin.interface";
export { SignInPageInterface } from "../interface/signin.interface";


export const metadata: Metadata = {
  title: "Login",
};

export const SignInpageContainer = () => {
  return <SignInPageInterface />;
};