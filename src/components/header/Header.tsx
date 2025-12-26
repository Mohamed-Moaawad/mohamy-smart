import './Header.css';


import { IoNotifications } from "react-icons/io5";
import { HiSun } from "react-icons/hi";


import { Avatar } from '@heroui/react';
import { FaMoon } from 'react-icons/fa';
import IconButton from '../ui/buttons/IconButton';
import { Link } from 'react-router-dom';

type THeader = {
    theme: 'dark' | 'light';
    setTheme: React.Dispatch<React.SetStateAction<'dark' | 'light'>>;
}

const Header = ({ theme, setTheme }: THeader) => {
    return (
        <header className="flex justify-between items-center p-4 sm:px-10">
            <div className='flex items-center gap-4'>
                <div className="logo">
                    <img src="/images/logo.png" alt="logo" />
                </div>
                <div className="text">
                    <h3>مرحبًا <span>محمد !</span></h3>
                    <p>كل قضاياك، موكليك، ومستنداتك في مكان واحد</p>
                </div>
            </div>

            <div className="actions flex justify-between items-center gap-4">
                <IconButton
                    icon={theme === 'light' ? <FaMoon /> : <HiSun />}
                    radius='full'
                    size='md'
                    onclick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                    backgroundColor='var(--white-color)'
                />
                <IconButton
                    icon={<IoNotifications />}
                    radius='full'
                    size='md'
                    onclick={() => { }}
                    backgroundColor='var(--white-color)'
                />
                <Link to='/settings'>
                    <Avatar size='lg' src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
                </Link>
            </div>
        </header>
    );
};

export default Header;