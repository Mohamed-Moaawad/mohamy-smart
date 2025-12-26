import SubTitle from '../../../components/subTitle/SubTitle';
import CustomButton from '../../../components/ui/buttons/CustomButton';
import InputPassword from '../../../components/ui/inputs/InputPassword';
import './Settings.css';

const ChangePassword = () => {
    return (
        <div>
            <SubTitle title='تغيير كلمة المرور' />
            <form className='flex flex-wrap'>
                <div className="w-full md:w-6/12 p-4">
                    <InputPassword
                        label='كلمة المرور الحالية'
                        isInvalid={false}
                    />
                </div>
                <div className="w-full md:w-6/12 p-4">
                    <InputPassword
                        label='كلمة المرور الجديدة'
                        isInvalid={false}
                    />
                </div>
                <div className="w-full flex justify-end mt-28">
                    <CustomButton
                        type='submit'
                        text='حفظ المتغيرات'
                        radius='md'
                        size='lg'
                        color='var(--main-color)'
                    />
                </div>
            </form>
        </div>
    );
};

export default ChangePassword;