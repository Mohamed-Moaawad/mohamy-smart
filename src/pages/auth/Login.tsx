import { Link, useNavigate } from "react-router-dom";
import CustomButton from "../../components/ui/buttons/CustomButton";
import CustomInput from "../../components/ui/inputs/CustomInput";
import InputPassword from "../../components/ui/inputs/InputPassword";

// React Hook Form
import { useForm, type SubmitHandler } from "react-hook-form";
import { loginSchema, type loginSchemaType } from "../../validations/loginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppDispatch } from "../../hooks/reduxHooks";
import thunkAuthLogin from "../../redux/auth/thunk/thunkAuthLogin";
import toast from "react-hot-toast";

const Login = () => {
    const dispatch = useAppDispatch();

    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors }, } = useForm<loginSchemaType>({
        mode: 'onChange',
        resolver: zodResolver(loginSchema),
    });

    const onSubmit: SubmitHandler<loginSchemaType> = (data) => {
        dispatch(thunkAuthLogin(data)).unwrap()
            .then((data) => {
                toast.success("تم تسجيل الدخول بنجاح");
                console.log('data-L-1', data);

                setTimeout(() => {
                    console.log('data-L-2', data);
                    navigate('/', { replace: true });
                }, 2000)
            })
            .catch((errorMessage: string) => {
                toast.error(errorMessage);
            })
    };

    return (
        <form className="login flex flex-col gap-8"
            onSubmit={handleSubmit(onSubmit)}
        >
            <h2>تسجيل الدخول حسابك!</h2>
            <CustomInput
                type="text"
                label="الهاتف"
                isInvalid={!!errors.phone}
                errorMessage={errors.phone?.message}
                {...register('phone')}
            />
            <InputPassword
                label="كلمة المرور"
                isInvalid={!!errors.password}
                errorMessage={errors.password?.message}
                {...register('password')}
            />
            <div className="forgot-password">
                <Link to='/auth/forgot-password'>هل نسيت كلمة السر ؟</Link>
            </div>
            <CustomButton
                type="submit"
                text="تسجيل الدخول "
                size="md"
                radius="lg"
                color="primary"
                isLoading={false}
            />
            <p>ليس لديك حساب؟ <Link to='/auth/sign-up'>قم بالتسجيل</Link></p>
        </form>
    );
};

export default Login;