import { useState } from 'react'
import { Textarea } from '@heroui/react'
import CustomInput from '../../../components/ui/inputs/CustomInput';

const CaseSummary = () => {
    console.log('summary');
    const [status, setStatus] = useState<boolean>(true);

    if (status) {
        return (
            <div className='case-summary'>
                <div className="not-data">
                    <img src="/images/case_warning_2.svg" alt="error"
                        onClick={() => setStatus(false)}
                    />
                </div>
            </div>
        )
    }
    return (
        <div className='case-summary'>
            <div className="flex flex-wrap">
                <div className="w-full md:w-6/12 p-4">
                    <CustomInput
                        type='text'
                        label='المدعي'
                        value='mazenelsbagh@gmail.com'
                        readOnly
                    />
                </div>
                <div className="w-full md:w-6/12 p-4">
                    <CustomInput
                        type='text'
                        label='المدعى عليه'
                        value='السيد مصطفى السيد محمد المصري'
                        readOnly
                    />
                </div>
                <div className="w-full md:w-6/12 p-4">
                    <CustomInput
                        type='text'
                        label='المحكمة'
                        value='جنح ثان مدينة نصر - جنح مستأنف مدينة نصر'
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
                        label='الحالة'
                        value='مفتوحة'
                        readOnly
                    />
                </div>
            </div>

            <div className="full mt-8">
                <Textarea
                    className="full"
                    label='وقائع القضية'
                    value={'بتاريخ 3 سبتمبر 2021، قام السيد مصطفى السيد محمد المصري (المتهم) بقيادة السيارة رقم أ ج ط 2578 بطريق صلاح سالم - أسفل كوبري الفنجري - اتجاه العباسية في تمام الساعة الثالثة فجراً. أثناء القيادة، فوجئ المتهم بعبور أحد الأشخاص للطريق فجأة وبصورة مترددة. حاول المتهم تفادي الاصطدام بالشخص العابر ولكن حدث الاصطدام به نتيجة لتردد الشخص في العبور. بعد وقوع الحادث، قام المتهم بالاتصال بسيارة الإسعاف. تم إحالة المتهم إلى النيابة العامة التي باشرت التحقيق معه. انتهت النيابة العامة من التحقيق وأصدرت قرارها المتضمن ثلاث بنود. البند الأول: إخلاء سبيل المتهم السيد مصطفى السيد محمد المصري بتنديد ضمان مالي قدره ألفي جنيه وإلا يعرض للنظر في أمر حبسه. البند الثاني: تكليف السيد المهندس الفني بإدارة المرور بفحص السيارة رقم أ ج ط 2578 لبيان ما بها من تلفيات ومدى صلاحية المكابح وآلات التنبيه. البند الثالث: تسليم السيارة المتحفظ عليها لمالكها بالإيصال اللازم بعد تنفيذ البند السابق ما لم يكن لدى جهة المرور مانع. اتهم المتهم بارتكاب الخطأ الذي نجم عن الحادث أو نكل وقت الحادث عن مساعدة من وقعت عليه الجريمة أو عن طلب المساعدة له مع تمكنه من ذلك. عرف المشرع القتل والجرح الخطأ بأنه القتل أو الجرح الذي '}
                    readOnly
                />
            </div>

            <div className="full mt-8">
                <Textarea
                    className="full"
                    label='الطلبات القانونية'
                    value={'إخلاء سبيل المتهم السيد مصطفى السيد محمد المصري بتنديد ضمان مالي قدره ألفي جنيه تكليف السيد المهندس ...'}
                    readOnly
                />
            </div>
        </div>
    )
}

export default CaseSummary