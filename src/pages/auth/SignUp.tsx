import { Link, useNavigate } from "react-router-dom";
import CustomButton from "../../components/ui/buttons/CustomButton";
import CustomInput from "../../components/ui/inputs/CustomInput";
import InputPassword from "../../components/ui/inputs/InputPassword";

// React Hook Form
import { useForm, type SubmitHandler } from "react-hook-form";
import { signupSchema, type signupSchemaType } from "../../validations/signupSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppDispatch } from "../../hooks/reduxHooks";
import thunkAuthRegister from "../../redux/auth/thunk/thunkAuthRegister";

import toast from 'react-hot-toast';

const SignUp = () => {
    const dispatch = useAppDispatch();

    const navigate = useNavigate()

    const { register, handleSubmit, formState: { errors, isSubmitting }, } = useForm<signupSchemaType>({
        mode: 'onChange',
        resolver: zodResolver(signupSchema),
    });

    const onSubmit: SubmitHandler<signupSchemaType> = async (data) => {
        await dispatch(thunkAuthRegister(data)).unwrap()
            .then(async (data) => {
                toast.success("تم تسجيل بياناتك بنجاح")
                console.log('data-S-1', data);
                setTimeout(() => {
                    console.log('data-S-2', data);
                    navigate('/auth/login', { replace: true });
                }, 2000)
            })
            .catch((errorMessage: string) => {
                toast.error(errorMessage);
            });
    };

    return (
        <form className="sign-up flex flex-col gap-8"
            onSubmit={handleSubmit(onSubmit)}
        >
            <h2>أنشئ حسابك!</h2>
            <h5>أدخل التفاصيل الكاملة الخاصة بك</h5>
            <CustomInput
                type="text"
                label="اسم المستخدم"
                isInvalid={!!errors.fullName}
                errorMessage={errors.fullName?.message}
                {...register('fullName')}
            />
            <CustomInput
                type="text"
                label="الهاتف"
                isInvalid={!!errors.phoneNumber}
                errorMessage={errors.phoneNumber?.message}
                {...register('phoneNumber')}
            />
            <InputPassword
                label="كلمة المرور"
                isInvalid={!!errors.password}
                errorMessage={errors.password?.message}
                {...register('password')}
            />

            <CustomButton
                type="submit"
                text="تسجيل الدخول"
                // variant="flat"
                color="primary"
                radius="md"
                size="lg"
                isLoading={isSubmitting}
            />
            <p>هل لديك حساب بالفعل؟ <Link to='/auth/login'>تسجيل الدخول</Link></p>
        </form>
    );
};

export default SignUp;