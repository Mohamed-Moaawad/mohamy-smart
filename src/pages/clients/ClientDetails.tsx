import React from 'react'
import Container from '../../components/ui/Container'
import CustomInput from '../../components/ui/inputs/CustomInput'
import { Textarea } from '@heroui/react'
import HeadTitle from '../../components/headTitle/HeadTitle'
import SubTitle from '../../components/subTitle/SubTitle'

const ClientDetails = () => {
    return (
        <div className='client-details'>
            <Container>
                <HeadTitle title='إدارة الموكلين' />
                <SubTitle title='تفاصيل الموكل :' />
                <div className="flex flex-wrap">
                    <div className="w-full md:w-6/12 p-4">
                        <CustomInput
                            type='text'
                            label='الاسم الكامل.'
                            value='محمد احمد'
                            readOnly
                        />
                    </div>
                    <div className="w-full md:w-6/12 p-4">
                        <CustomInput
                            type='text'
                            label='رقم الهاتف'
                            value='01273939519'
                            readOnly
                        />
                    </div>
                    <div className="w-full md:w-6/12 p-4">
                        <CustomInput
                            type='text'
                            label='رقم القضية'
                            value='4258 لسنة 2021 جنح - 2072 لسنة 2022 جنح مستأنف'
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
                            label='الحالة'
                            value='مفتوحة'
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
        </div>
    )
}

export default ClientDetails