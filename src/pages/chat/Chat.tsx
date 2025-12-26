import './Chat.css';
import { useState } from 'react';
import Container from '../../components/ui/Container';
import HeadTitle from '../../components/headTitle/HeadTitle';
import CustomButton from '../../components/ui/buttons/CustomButton';

import { Avatar, Textarea } from '@heroui/react';

import { VscSend } from 'react-icons/vsc';

import { chatFormSchema, type chatFormType } from '../../validations/chatFormSchema';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { motion, AnimatePresence } from 'framer-motion';


const Chat = () => {
    const [messages, setMessages] = useState<string[]>([])

    const { register, handleSubmit, formState: { errors }, reset } = useForm<chatFormType>({
        mode: 'onChange',
        resolver: zodResolver(chatFormSchema),
    })
    const onSubmit: SubmitHandler<chatFormType> = (data) => {
        setMessages((pre) => [...pre, data.message]);
        reset();
    }

    return (
        <section className='chat'>
            <Container>
                <HeadTitle title='المساعد القانوني الذكي' />
                <div className="chat-container">
                    <div className="chat-body">
                        {messages.length < 1 ? (
                            <div className="not-message">
                                <div className="images">
                                    <img src="/images/chat.png" alt="chat" />
                                    <img className='light' src="/images/chat-light.png" alt="chat" />
                                </div>
                                <h3>أهلاً بك في المساعد القانوني</h3>
                                <p>اكتب سؤالك القانوني وسأقوم بمساعدتك بإجابة شاملة ومفصلة</p>
                            </div>
                        ) : (
                            <ul className='chat-messages'>
                                <AnimatePresence>
                                    {messages.map((message, idx) => (
                                        <motion.li className='user' key={idx}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -20 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <Avatar size='md' isBordered src="https://i.pravatar.cc/150?u=a04258a2462d826712d" />
                                            <p>{message}</p>
                                        </motion.li>
                                    ))}
                                </AnimatePresence>
                                <li>
                                    <Avatar isBordered src="https://i.pravatar.cc/150?u=a042581f4e29026704d" />
                                    <p>Welcome</p>
                                </li>
                            </ul>
                        )}

                    </div>
                    <form className="chat-footer"
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <Textarea
                            className="textarea-box"
                            // label="Description"
                            placeholder="🔗 رسالة إلى Chat... "
                            isInvalid={!!errors.message}
                            errorMessage={errors.message?.message}
                            {...register('message')}
                        />
                        <div className='mt-4 flex justify-end'>
                            <CustomButton
                                type='submit'
                                text='ارسل'
                                endContent={<VscSend className='rotate-180' size={20} />}
                                size='md'
                                radius='full'
                                color='primary'
                            />
                        </div>
                    </form>
                </div>
            </Container>
        </section>
    );
};

export default Chat;