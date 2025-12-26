import z from "zod";

const forgotPasswordSchema = z.object({
    phone: z.string()
        .nonempty("رقم الهاتف مطلوب")
        .regex(/^01[0-9]{9}$/, "رقم الهاتف غير صالح"),
});

type forgotPasswordSchemaType = z.infer<typeof forgotPasswordSchema>;

export { forgotPasswordSchema, type forgotPasswordSchemaType };