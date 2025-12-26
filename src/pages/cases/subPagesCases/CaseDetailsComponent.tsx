import './CasesComponents.css';
import CustomInput from '../../../components/ui/inputs/CustomInput';
import { Textarea } from '@heroui/react';
import moment from 'moment';

type TCaseDetailsComponent = {
    singleCase: {
        id: string;
        title: string;
        number: string;
        type: number;
        court: string;
        clientName: string;
        apponentName: string;
        description: string;
        facts: string;
        legalClaims: string;
        status: number;
        creationDate: string;
    }
}

const CaseDetailsComponent = ({ singleCase }: TCaseDetailsComponent) => {

    return (
        <div className='case-details-component'>
            <div className="flex flex-wrap">
                <div className="w-full md:w-6/12 p-4">
                    <CustomInput
                        type='text'
                        label='رقم القضية'
                        value={singleCase.number}
                        readOnly
                    />
                </div>
                <div className="w-full md:w-6/12 p-4">
                    <CustomInput
                        type='text'
                        label='المحكمة'
                        value={singleCase.court}
                        readOnly
                    />
                </div>
                <div className="w-full md:w-6/12 p-4">
                    <CustomInput
                        type='number'
                        label='نوع القضية'
                        value={singleCase.type.toString()}
                        readOnly
                    />
                </div>
                <div className="w-full md:w-6/12 p-4">
                    <CustomInput
                        type='text'
                        label='الخصم'
                        value={singleCase.apponentName}
                        readOnly
                    />
                </div>
                <div className="w-full md:w-6/12 p-4">
                    <CustomInput
                        type='text'
                        label='اسم الموكل'
                        value={singleCase.clientName}
                        readOnly
                    />
                </div>
                {/* <div className="w-full md:w-6/12 p-4">
                    <CustomInput
                        type='text'
                        label='رقم الهاتف '
                        value={singleCase.legalClaims}
                        readOnly
                    />
                </div> */}
                {/* <div className="w-full md:w-6/12 p-4">
                    <CustomInput
                        type='text'
                        label='نوع التوكيل'
                        value={}
                        readOnly
                    />
                </div> */}
                <div className="w-full md:w-6/12 p-4">
                    <CustomInput
                        type='text'
                        label='تاريخ الإنشاء'
                        value={moment(singleCase.creationDate).format('YYYY/MM/DD')}
                        readOnly
                    />
                </div>
                <div className="w-full md:w-6/12 p-4">
                    <CustomInput
                        type='text'
                        label='الحالة'
                        value={singleCase.status === 0 ? 'نشط ✅' : 'غير نشط ❌'}
                        readOnly
                    />
                </div>
            </div>

            <div className="full mt-8 px-4">
                <Textarea
                    className="full"
                    label='وصف القضية'
                    value={singleCase.description}
                    readOnly
                />
            </div>

            <div className="full mt-8 px-4">
                <Textarea
                    className="full"
                    label='وقائع القضية'
                    value={singleCase.facts}
                    readOnly
                />
            </div>

            <div className="full mt-8 px-4">
                <Textarea
                    className="full"
                    label='الطلبات القانونية'
                    value={singleCase.legalClaims}
                    readOnly
                />
            </div>
        </div>
    )
}

export default CaseDetailsComponent