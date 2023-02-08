import { compare, genSalt, hash } from 'bcryptjs'

//Numero para gerar um conjunto de caracter que aumenta a complexidade da senha criptografada
const SALT_RANDOMS = 8

const hashPassword = async (password: string) =>{
	const saltGenerated = await genSalt(SALT_RANDOMS)

	const hashPass = await hash(password, saltGenerated)

	return hashPass
}

const verifyPassword = async (password: string, hashedPassword: string) =>{
	return await compare(password, hashedPassword)
}

export const PasswordCrypto = {
	hashPassword,
	verifyPassword
}