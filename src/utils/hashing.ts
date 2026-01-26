export const hashing = (password: string): string => {
  return Bun.password.hashSync(password, {
    algorithm: 'bcrypt',
    cost: 10,
  })
}

export const verifyHashing = (password: string, hash: string): boolean => {
  return Bun.password.verifySync(password, hash)
}
