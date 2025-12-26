import CustomButton from "../../components/ui/buttons/CustomButton";
import CustomInput from "../../components/ui/inputs/CustomInput";

import { IoIosArrowForward } from "react-icons/io";

// React Hook Form
import { useForm, type SubmitHandler } from "react-hook-form";
import { forgotPasswordSchema, type forgotPasswordSchemaType } from "../../validations/forgotPasswordSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
    const { register, handleSubmit, formState: { errors }, } = useForm<forgotPasswordSchemaType>({
        mode: 'onChange',
        resolver: zodResolver(forgotPasswordSchema),
    })
    const onSubmit: SubmitHandler<forgotPasswordSchemaType> = (data) => console.log(data);

    return (
        <form className="forgot-password flex flex-col gap-8"
            onSubmit={handleSubmit(onSubmit)}
        >
            <div className="flex justify-start">
                <Link to='/auth/login' className="back-to-login">
                    <IoIosArrowForward />
                    العودة لتسجيل الدخول
                </Link>
            </div>
            <h2>نسيت كلمة السر؟</h2>
            <p>لا تقلق، هذا يحدث لنا جميعًا. أدخل بريدك الإلكتروني أدناه لاستعادة كلمة المرور.</p>

            <CustomInput
                type="text"
                label="الهاتف"
                isInvalid={!!errors.phone}
                errorMessage={errors.phone?.message}
                {...register('phone')}
            />

            <CustomButton
                type="submit"
                text="إرسال"
                color="primary"
                size="md"
                radius="lg"
            />
        </form>
    );
};

export default ForgotPassword;