import './Settings.css';
import SubTitle from '../../../components/subTitle/SubTitle';
import CustomButton from '../../../components/ui/buttons/CustomButton';

const Subscription = () => {
    return (
        <div className='subscription pt-5 pb-10'>
            <SubTitle title='خطة الاشتراك الحالية' />
            <div className="subscription-plan">
                <div className="text mb-4">
                    <h4>الباقة الأساسية</h4>
                    <p>كل ما تحتاجه للبدء بإدارة مكتبك القانوني</p>
                    <span>299  ج.م شهريا</span>
                </div>
                <div className="mb-4">
                    <CustomButton
                        type='button'
                        text='ترقية الخطة'
                        size='md'
                        radius='lg'
                        color='primary'
                        variant='bordered'
                    />
                </div>
            </div>
        </div>
    );
};

export default Subscription;