import vine from '@vinejs/vine'

export const signUpValidator = vine.compile(
    vine.object({
      email : vine.string().trim().email(),
      password : vine.string().minLength(10),
      fullName : vine.string().minLength(8)
    })
  )