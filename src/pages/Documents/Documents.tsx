import './Documents.css';
import HeadTitle from '../../components/headTitle/HeadTitle';
import Container from '../../components/ui/Container';
import CustomButton from '../../components/ui/buttons/CustomButton';
import { FiUpload } from 'react-icons/fi';
import { useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import thunkOcrExtract from '../../redux/ocr/thunk/thunkOcrExtract';

import toast, { Toaster } from 'react-hot-toast';
import { Skeleton, useDisclosure } from '@heroui/react';
import CustomModal from '../../components/ui/modal/CustomModal';
import AddNewCaseFromOCRForm from '../../components/forms/AddNewCaseFromOCRForm';
import thunkGenerateCase from '../../redux/ocr/thunk/thunkGenerateCase';
import { IoMdAdd } from 'react-icons/io';

const Documents = () => {

    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const dispatch = useAppDispatch();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { extractedText, loading } = useAppSelector((state) => state.ocr);
    const inputFileRef = useRef<HTMLInputElement | null>(null);
    //! كل صورة هيبقى ليها نص خاص بيها
    const [results, setResults] = useState<
        { file: File, imageUrl: string, text: string }[]
    >([]);

    const handleClick = () => {
        inputFileRef.current?.click();
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {

        const selectedFiles = e.target.files ? Array.from(e.target.files) : [];

        if (selectedFiles.length === 0) return;

        // preview images
        const previews = selectedFiles.map((file) => ({
            file,
            imageUrl: URL.createObjectURL(file),
            text: "",
        }));

        setResults(previews);

        await handleUpload(selectedFiles);
    };

    // Upload images for ocr API
    const handleUpload = async (selectedFiles: File[]) => {
        console.log('handleUpload go');
        toast.loading("جاري معالجة الصور...");

        for (let i = 0; i < selectedFiles.length; i++) {
            const file = selectedFiles[i]
            try {
                const extractedText = await dispatch(thunkOcrExtract(file)).unwrap();

                setResults((prev) => {
                    const updated = [...prev];
                    updated[i] = { ...updated[i], text: extractedText };
                    return updated;
                })
            } catch (errorMessage) {
                toast.error(`حدث خطأ أثناء رفع الملفات \n ${errorMessage}`);
                setResults((prev) => {
                    const updated = [...prev];
                    updated[i] = { ...updated[i], text: "— حدث خطأ أثناء استخراج النص —" };
                    return updated;
                });
            }
        }
        toast.dismiss();
        toast.success("تم استخراج النصوص بنجاح");
    };


    const getAllText = async () => {
        console.log('getAllText go');
        const allText = results.map((r) => r.text).join();
        await dispatch(thunkGenerateCase(allText));
        onOpen();
    }

    return (
        <section className='documents'>
            <Container>
                <HeadTitle title='إدارة المستندات' />

                <div className="flex flex-wrap justify-center items-center">
                    <div className="w-full flex justify-end">
                        <div className="w-full sm:w-6/12 md:w-4/12 lg:max-w-3/12">
                            <CustomButton
                                type='button'
                                text='إضافة قضية جديدة'
                                size='md'
                                radius='full'
                                variant='solid'
                                color='primary'
                                endContent={<IoMdAdd />}
                                onClick={onOpen}
                            />
                        </div>
                    </div>
                    <div className="documents-box mt-4">
                        <input type="file"
                            ref={inputFileRef}
                            accept=".pdf, .jpg, .jpeg, .png"
                            multiple
                            onChange={handleFileChange}
                        />
                        <div className="flex items-center gap-5">
                            <div className="icon">
                                <FiUpload />
                            </div>
                            <div className="text">
                                <h3>اسحب الملفات هنا أو انقر للرفع</h3>
                                <p>يدعم صيغ: PDF، JPG، PNG، GIF</p>
                            </div>
                        </div>
                        <div className="btn mt-10 w-full flex justify-center">
                            <CustomButton
                                type='button'
                                text='اختر الملفات'
                                size='lg'
                                radius='md'
                                color='primary'
                                startContent={<FiUpload />}
                                onClick={handleClick}
                            />
                        </div>
                    </div>
                </div>

                {/* Results */}
                {results.length > 0 && (
                    <div className="mt-8 space-y-8">
                        {results.map((item, idx) => (
                            <div
                                key={idx}
                                className="document flex-col md:flex-row"
                            >
                                <img
                                    src={item.imageUrl}
                                    alt={item.file.name}
                                    className="w-full md:w-[50%]"
                                />

                                <div className='extracted-text w-full md:w-[50%]'>
                                    {loading === 'pending' ? (
                                        <Skeleton className="rounded-lg">
                                            <div className="h-[40vh] rounded-lg bg-default-300" />
                                        </Skeleton>
                                    ) : (
                                        <textarea
                                            value={
                                                item.text || "— لم يتم استخراج نص بعد —"
                                            }
                                            readOnly
                                        >
                                        </textarea>
                                    )}

                                </div>
                            </div>
                        ))}

                        <div className="flex justify-center">
                            <CustomButton
                                type='button'
                                text={loading === "pending" ? "جارٍ الإنشاء..." : "تحليل المستند تفصيلياً وإنشاء قضية جديدة"}
                                size="lg"
                                radius="md"
                                color="primary"
                                onClick={() => getAllText()}
                                isDisabled={loading === "pending"}
                                startContent={<img src='/images/ai-icon-white.png' alt='icon' />}
                            />
                        </div>
                    </div>
                )}

                <CustomModal isOpen={isOpen} onOpenChange={onOpenChange} title='إضافة قضية جديد' size='2xl' >
                    <AddNewCaseFromOCRForm />
                </CustomModal>
            </Container>
            <Toaster />
        </section >
    );
};

export default Documents;