import './Cases.css';
import StatsCards from '../../components/statsCards/StatsCards';
import Container from '../../components/ui/Container';

import { GoLaw } from 'react-icons/go';
import { FiCheckCircle, FiPlus } from 'react-icons/fi';
import { IoCloseCircleOutline } from 'react-icons/io5';
import HeadTitle from '../../components/headTitle/HeadTitle';
import SubTitle from '../../components/subTitle/SubTitle';
import InputSelect from '../../components/ui/inputs/InputSelect';
import CustomButton from '../../components/ui/buttons/CustomButton';
import CustomCard from '../../components/ui/card/CustomCard';
import { Pagination } from '@heroui/react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { useEffect } from 'react';
import thunkGetAllCases from '../../redux/cases/thunk/thunkGetAllCases';
import { setPageNumber } from '../../redux/cases/casesSlice';
import moment from "moment";
import NotFoundImage from '../../components/notFound/NotFoundImage';
import SkeletonCards from '../../components/skeleton/SkeletonCards';

const Cases = () => {
    const dispatch = useAppDispatch();
    const { cases, pageNumber, totalPages, loading } = useAppSelector((state) => state.cases);
    const { user } = useAppSelector((state) => state.auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            dispatch(thunkGetAllCases({ pageNumber, pageSize: 10, lawyerId: user.userId }));
        }
    }, [dispatch, pageNumber, user]);

    const formDate = (date: string) => {
        return moment(date).format('L')
    }
    return (
        <section className='cases'>
            <Container>
                <HeadTitle title='إدارة القضايا' />
                <StatsCards
                    card1={{
                        icon: <GoLaw />,
                        iconColor: 'var(--main-color)',
                        text: 'إجمالي القضايا',
                        number: 22,
                    }}
                    card2={{
                        icon: <FiCheckCircle />,
                        iconColor: '#34BF49',
                        text: 'القضايا النشطة',
                        number: 10,
                    }}
                    card3={{
                        icon: <IoCloseCircleOutline />,
                        iconColor: '#06B6D4',
                        text: 'القضايا المنتهية ',
                        number: 15,
                    }}
                />

                <SubTitle
                    title='تقارير تفصيلية :'
                    components={
                        <div className='sub-title-component'>
                            <div className='sub-title-component-select'>
                                <InputSelect
                                    label='الحالة'
                                    data={['مفتوحة', 'مغلقة']}
                                    radius='full'
                                    isDisabled={loading === 'pending' || cases.length < 1 ? true : false}
                                />
                            </div>
                            <div>
                                <CustomButton
                                    type='button'
                                    text='إنشاء قضية'
                                    color='primary'
                                    radius='full'
                                    size='lg'
                                    startContent={<FiPlus />}
                                    onClick={() => navigate('/documents')}
                                />
                            </div>
                            {/* <InputSelect /> */}
                        </div>
                    }
                />
                <div className="flex flex-wrap">
                    {loading === 'pending' && (
                        <SkeletonCards />
                    )}

                    {loading === 'failed' && (
                        <div className="text-center p-5">
                            <p>حدث خطأ في تحميل البيانات، يرجى إعادة تسجيل الدخول.</p>
                            <CustomButton text="تسجيل الدخول" onClick={() => navigate('/auth/login')} />
                        </div>
                    )}

                    {cases.length === 0 && loading === 'succeeded' && (
                        <NotFoundImage text='قائمة القضايا فارغة' />
                    )}

                    {cases.length > 0 && loading === 'succeeded' && (
                        <div className='flex flex-wrap'>
                            {cases.map((caseItem) => (
                                <div key={caseItem.id} className="card w-full md:w-6/12 lg:w-4/12 p-4">
                                    <CustomCard>
                                        <h3>{caseItem.title}</h3>
                                        <h5>رقم القضية: {caseItem.number}</h5>
                                        <h6>نوع القضية : {caseItem.type}</h6>
                                        <p>{caseItem.description}</p>
                                        <span>{formDate(caseItem.creationDate)}</span>
                                        <h4> ضد السيد {caseItem.clientName}</h4>
                                        <h4>{caseItem.apponentName}</h4>
                                        <div className="flex justify-end mt-5">
                                            <Link to={`/cases/${caseItem.id}`}>مفتوحة</Link>
                                        </div>
                                    </CustomCard>
                                </div>
                            ))}
                        </div>
                    )}


                </div>

                {loading !== 'pending' && cases.length > 0 && (
                    <div className="pagination-box">
                        <Pagination
                            initialPage={1}
                            page={pageNumber}
                            total={totalPages}
                            onChange={(page) => setPageNumber(page)}
                            color='primary'
                            className='cursor-pointer'
                        />
                    </div>
                )}
            </Container>
        </section>
    );
};

export default Cases;