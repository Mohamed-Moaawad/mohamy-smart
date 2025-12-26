import './Settings.css';
import { Avatar, Badge } from '@heroui/react';
import { FaPencilAlt } from 'react-icons/fa';

import { useAppSelector } from '../../../hooks/reduxHooks';
import CustomInput from '../../../components/ui/inputs/CustomInput';
import CustomButton from '../../../components/ui/buttons/CustomButton';

const ProfileComponent = () => {
    const { user, } = useAppSelector(state => state.auth);

    return (
        <div className='profile-component'>
            <div className="flex flex-wrap py-10">
                <div className="w-full md:w-2/12 mb-5 flex justify-center  items-start">
                    <Badge color="primary" placement="bottom-right"
                        content={
                            <span className='edit-user-img'>
                                <FaPencilAlt />
                            </span>
                        }
                    >
                        <Avatar
                            className="w-30 h-30 text-large"
                            src="https://i.pravatar.cc/150?u=a04258a2462d826712d"
                            alt='user'
                            // size='lg'
                            isBordered
                            color='primary'
                        />
                    </Badge>
                </div>

                <div className="w-full md:w-10/12 mb-5">
                    <form className="flex flex-wrap">
                        <div className="w-full md:w-6/12 p-4">
                            <CustomInput
                                type='text'
                                label='الاسم الكامل'
                                value={user?.fullName}
                                readOnly
                            />
                        </div>
                        <div className="w-full md:w-6/12 p-4">
                            <CustomInput
                                type='text'
                                label='رقم الهاتف'
                                value={user?.phone}
                                readOnly
                            />
                        </div>
                        {/* <div className="w-full md:w-6/12 p-4">
                            <CustomInput
                                type='email'
                                label='البريد الإلكتروني'
                                value='charlenereed@gmail.com '
                                readOnly
                            />
                        </div> */}
                        <div className="w-full md:w-6/12 p-4">
                            <CustomInput
                                type='text'
                                label='تاريخ الميلاد'
                                value='25 January 1990'
                                readOnly
                            />
                        </div>
                        <div className="w-full md:w-6/12 p-4">
                            <CustomInput
                                type='text'
                                label='رقم القيد بالنقابة'
                                value='541241910'
                                readOnly
                            />
                        </div>
                        <div className="w-full md:w-6/12 p-4">
                            <CustomInput
                                type='text'
                                label='مكتب المحاماة'
                                value='الاسكندرية'
                                readOnly
                            />
                        </div>
                        <div className="w-full md:w-6/12 p-4">
                            <CustomInput
                                type='text'
                                label='الاشتراك'
                                value='الباقة المتقدمة'
                                readOnly
                            />
                        </div>
                        <div className="w-full flex justify-end mt-28">
                            <CustomButton
                                type='submit'
                                text='حفظ المتغيرات'
                                radius='md'
                                size='lg'
                                color='primary'
                            />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ProfileComponent;