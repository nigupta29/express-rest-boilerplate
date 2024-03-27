import { compare, genSalt, hash } from "bcryptjs"

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
  const salt = await genSalt(10)
  const hashedPwd = await hash(plainPassword, salt)
  return hashedPwd
}
