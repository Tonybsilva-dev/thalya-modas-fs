import { Metadata } from "next";
import { SignUnPageInterface } from "../interface/register.interface";
export { SignUnPageInterface } from "../interface/register.interface";


export const metadata: Metadata = {
  title: "Register",
};

export const SignUppageContainer = () => {
  return <SignUnPageInterface />;
};