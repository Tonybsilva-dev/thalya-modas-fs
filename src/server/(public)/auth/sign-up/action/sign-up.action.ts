"use server"

import { SignupRepository } from "../repository/sign-up.repository"

export const signUpCredentails = async (input: any) => {
  try {
    const signUpRepository = new SignupRepository()

    // TODO: validar o input antes de passar para o repositório
    return await signUpRepository.signUpCredentials(input)
  } catch (error) {
    throw error
  }
}