import Container from '../../components/ui/Container';
import HeadTitle from '../../components/headTitle/HeadTitle';
import CustomCard from '../../components/ui/card/CustomCard';
import ChangePassword from './subPagesSettings/ChangePassword';
import Subscription from './subPagesSettings/Subscription';
import ProfileComponent from './subPagesSettings/ProfileComponent';
import { Tab, Tabs } from '@heroui/react';

const Settings = () => {
    return (
        <section className='settings'>
            <Container>
                <HeadTitle title='الإعدادات' />
                <CustomCard>
                    <Tabs aria-label="Options" variant='underlined' color='primary'>
                        <Tab key="1" title="الملف الشخصى">
                            <ProfileComponent />
                        </Tab>
                        <Tab key="2" title="الامان">
                            <ChangePassword />
                        </Tab>
                        <Tab key="3" title="الاشتراك">
                            <Subscription />
                        </Tab>
                    </Tabs>
                </CustomCard>
            </Container>
        </section>
    );
};

export default Settings;