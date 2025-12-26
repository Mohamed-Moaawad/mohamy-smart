import './Home.css';
import HeadTitle from "../../components/headTitle/HeadTitle";
import Container from "../../components/ui/Container";
import StatsCards from '../../components/statsCards/StatsCards';
import CustomCard from '../../components/ui/card/CustomCard';
import CustomList from '../../components/ui/lists/CustomList';

import { IoArrowBack } from "react-icons/io5";
import { GoLaw } from 'react-icons/go';
import { FiCheckCircle } from 'react-icons/fi';
import { FaUsers } from 'react-icons/fa';

import { Calendar } from '@heroui/react';
import { today, getLocalTimeZone } from "@internationalized/date";
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <section className="home">
            <Container>
                <HeadTitle title="لوحة التحكم" />
                <div>
                    <StatsCards
                        card1={{
                            icon: <GoLaw />,
                            iconColor: 'var(--main-color)',
                            text: 'إجمالي القضايا',
                            number: 22,
                        }}
                        card2={{
                            icon: <FiCheckCircle />,
                            iconColor: 'var(--success-color)',
                            text: 'القضايا المفتوحة',
                            number: 10,
                        }}
                        card3={{
                            icon: <FaUsers />,
                            iconColor: '#8B5CF6',
                            text: 'الموكلين',
                            number: 22,
                        }}
                    />
                    <div className="flex flex-wrap justify-between mt-5">
                        <div className="w-full lg:w-8/12 mb-5">
                            <CustomCard>
                                <div className="head">
                                    <h3>إدارة القضايا الجارية</h3>
                                    <div className="icon">
                                        <IoArrowBack />
                                    </div>
                                </div>

                                <CustomList>
                                    <ul>
                                        <li>
                                            <div className='text'>
                                                <h4>4258 لسنة 2021 جنح - 2072 لسنة 2022 جنح مستأنف</h4>
                                                <h6>جنائي</h6>
                                            </div>
                                            <span>مفتوحة</span>
                                        </li>
                                        <li>
                                            <div className='text'>
                                                <h4>4258 لسنة 2021 جنح - 2072 لسنة 2022 جنح مستأنف</h4>
                                                <h6>جنائي</h6>
                                            </div>
                                            <span>مفتوحة</span>
                                        </li>
                                        <li>
                                            <div className='text'>
                                                <h4>4258 لسنة 2021 جنح - 2072 لسنة 2022 جنح مستأنف</h4>
                                                <h6>جنائي</h6>
                                            </div>
                                            <span>مفتوحة</span>
                                        </li>
                                    </ul>
                                </CustomList>
                            </CustomCard>
                            <CustomCard className='mt-5'>
                                <div className="head">
                                    <h3>إدارة الموكلين</h3>
                                    <div className="icon">
                                        <IoArrowBack />
                                    </div>
                                </div>
                                <CustomList>
                                    <ul>
                                        <li>
                                            <div className="text">
                                                <h4>ندى سمير</h4>
                                            </div>
                                            <span>استشارة</span>
                                        </li>
                                    </ul>
                                </CustomList>
                            </CustomCard>
                        </div>

                        <div className="w-full lg:w-4/12 mb-5 lg:pr-10">

                            <div className="calendar-container">
                                <Calendar
                                    className='calendar-box w-full'
                                    aria-label="Date (No Selection)"
                                    defaultValue={today(getLocalTimeZone())}
                                    minValue={today(getLocalTimeZone())}
                                />

                                <div className="today-appointments mt-5">
                                    <div className="flex justify-between items-center mb-4">
                                        <h3>مواعيد اليوم</h3>
                                        <Link to='/'>عرض الكل</Link>
                                    </div>
                                    <div className="appointment-card flex justify-between items-center mb-5">
                                        <div className='flex items-center gap-4'>
                                            <div className="avatar">
                                                <img src="/images/avatar-1.png" alt="avatar" />
                                            </div>
                                            <div className="text">
                                                <h4>12:30 PM - 04:36 PM</h4>
                                                <p>جلسة قضية مدنية (موكل: أحمد علي)</p>
                                            </div>
                                        </div>
                                        <span></span>
                                    </div>
                                    <div className="appointment-card flex justify-between items-center mb-5">
                                        <div className='flex items-center gap-4'>
                                            <div className="avatar">
                                                <img src="/images/avatar-2.png" alt="avatar" />
                                            </div>
                                            <div className="text">
                                                <h4>12:30 PM - 04:36 PM</h4>
                                                <p>مراجعة عقد شراكة (موكل: شركة النور)</p>
                                            </div>
                                        </div>
                                        <span></span>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
};

export default Home;