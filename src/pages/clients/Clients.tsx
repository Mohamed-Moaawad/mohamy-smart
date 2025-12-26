import './Clients.css';
import { Link } from 'react-router-dom';
import HeadTitle from '../../components/headTitle/HeadTitle';
import SubTitle from '../../components/subTitle/SubTitle';
import CustomButton from '../../components/ui/buttons/CustomButton';
import Container from '../../components/ui/Container';
import CustomCard from '../../components/ui/card/CustomCard';

import { Pagination, useDisclosure } from '@heroui/react';

import { FiPlus } from 'react-icons/fi';
import CustomModal from '../../components/ui/modal/CustomModal';
import AddNewClientForm from '../../components/forms/AddNewClientForm';
import { useAppSelector } from '../../hooks/reduxHooks';

const Clients = () => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const { clients, loading } = useAppSelector((state) => state.clients);

    return (
        <section className='clients'>
            <Container>
                <HeadTitle title='إدارة الموكلين' />

                <SubTitle
                    title='تقارير تفصيلية :'
                    components={
                        <div className='sub-title-component'>
                            <CustomButton
                                type='button'
                                text='إضافة موكل جديد'
                                startContent={<FiPlus />}
                                size='md'
                                color='primary'
                                radius='full'
                                onClick={onOpen}
                            />
                        </div>
                    }
                />

                <div className="flex flex-wrap">
                    {loading === 'pending' ? (
                        <p className="text-center text-gray-500 mt-10">جارِ التحميل...</p>
                    ) : clients.length === 0 ? (
                        <div className="warning-image">
                            <img src="/images/case_warning_2.svg" alt="warning" />
                        </div>
                    ) : (
                        <div className="card w-full md:w-6/12 lg:w-4/12 p-4">
                            <CustomCard>
                                <h3>محمد احمد</h3>
                                <h5>رقم القضية: 4258 لسنة 2021 </h5>
                                <h6>01273939519</h6>
                                <p>جنح ثان مدينة نصر - جنح مستأنف مدينة نصر</p>
                                <span>12\3\2025</span>
                                <h4>أضيف: 19/08/2025</h4>
                                <div className="flex justify-end mt-5">
                                    <Link to='/clients/id'>التفاصيل</Link>
                                </div>
                            </CustomCard>
                        </div>
                    )}
                </div>
                {loading !== 'pending' && clients.length > 0 && (
                    <div className="pagination-box ">
                        <Pagination initialPage={1} total={10}
                            color='primary'
                            className='cursor-pointer'
                        />
                    </div>
                )}

            </Container>
            <CustomModal isOpen={isOpen} onOpenChange={onOpenChange} title='إضافة موكل جديد' size='3xl'>
                <AddNewClientForm />
            </CustomModal>
        </section>
    );
};

export default Clients;