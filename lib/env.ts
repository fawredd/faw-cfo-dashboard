import zod from "zod"

const envSchema = zod.object({
    SOS_USER: zod.string().trim().min(1, { message: 'required' }),
    SOS_PASS: zod.string().trim().min(1, { message: 'required' }),
    CUIT: zod.string().trim().min(11, { message: 'required' }).max(11, { message: 'required' }),
})

export const env = envSchema.parse(process.env)