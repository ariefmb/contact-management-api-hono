export const hashing = async (password: string): Promise<string> => {
  return await Bun.password.hash(password, {
    algorithm: 'bcrypt',
    cost: 10,
  })
}

export const verifyHashing = async (password: string, hash: string): Promise<boolean> => {
  return await Bun.password.verify(password, hash)
}
