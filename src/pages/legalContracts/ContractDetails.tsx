import React from 'react'
import { useParams } from 'react-router-dom'
import Container from '../../components/ui/Container';
import HeadTitle from '../../components/headTitle/HeadTitle';
import SubTitle from '../../components/subTitle/SubTitle';
import CustomInput from '../../components/ui/inputs/CustomInput';
import { Textarea } from '@heroui/react';

const ContractDetails = () => {
    const { id } = useParams();
    return (
        <section>
            <Container>
                <HeadTitle title='العقود القانونية' />
                <SubTitle title={`تفاصيل العقد ${id} :`} />
                <div className="flex flex-wrap">
                    <div className="w-full md:w-6/12 p-4">
                        <CustomInput
                            type='text'
                            label='اسم الموكل'
                            value='عبدالعزيز حمدي'
                            readOnly
                        />
                    </div>
                    <div className="w-full md:w-6/12 p-4">
                        <CustomInput
                            type='text'
                            label='نوع العقد'
                            value='--'
                            readOnly
                        />
                    </div>
                    <div className="w-full md:w-6/12 p-4">
                        <CustomInput
                            type='text'
                            label='نوع التوكيل'
                            value='عام'
                            readOnly
                        />
                    </div>
                    <div className="w-full md:w-6/12 p-4">
                        <CustomInput
                            type='text'
                            label='تاريخ الإنشاء'
                            value='12\3\2025'
                            readOnly
                        />
                    </div>
                </div>

                <div className="w-full mt-8 px-4">
                    <Textarea className="full" label="ملاحظات"
                        value={'إخلاء سبيل المتهم السيد مصطفى السيد محمد المصري بتنديد ضمان مالي قدره ألفي جنيه تكليف السيد المهندس ...'}
                        readOnly
                    />
                </div>
            </Container>
        </section>
    )
}

export default ContractDetails