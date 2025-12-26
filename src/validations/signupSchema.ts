import z from "zod";

const signupSchema = z.object({
    fullName: z.string()
        .nonempty("اسم المستخدم مطلوب"),
    phoneNumber: z.string()
        .nonempty("رقم الهاتف مطلوب")
        .regex(/^01[0-9]{9}$/, "رقم الهاتف غير صالح"),
    password: z.string()
        .nonempty('كلمة المرور مطلوبة')
        .min(6, "كلمة المرور يجب أن تكون على الأقل 6 أحرف")
        .max(30, "كلمة المرور لا يجب أن تزيد عن 30 حرف")
        .regex(/[A-Z]/, "يجب أن تحتوي كلمة المرور على حرف كبير واحد على الأقل")
        .regex(/[a-z]/, "يجب أن تحتوي كلمة المرور على حرف صغير واحد على الأقل")
        .regex(/[0-9]/, "يجب أن تحتوي كلمة المرور على رقم واحد على الأقل")
        .regex(/[@$!%*?&#+\-_.]/, "يجب أن تحتوي كلمة المرور على رمز خاص واحد على الأقل")
});

type signupSchemaType = z.infer<typeof signupSchema>;
export { signupSchema, type signupSchemaType };