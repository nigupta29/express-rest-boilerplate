import { compare, hash } from "bcryptjs"

export const getEnvValue = (value: string): string => {
  if (process.env[value]) return process.env[value] as string
  else throw new Error(`Environment Variable : ${value} not defined`)
}

export const matchPassword = async (
  plainPassword: string,
  hashedPassword: string
): Promise<boolean> => {
  return await compare(plainPassword, hashedPassword)
}

export const hashPassword = async (plainPassword: string): Promise<string> => {
  return await hash(plainPassword, 10)
}
