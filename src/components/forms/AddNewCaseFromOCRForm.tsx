import { Button, ModalFooter, Textarea } from "@heroui/react";
import CustomInput from "../ui/inputs/CustomInput";
import { useForm, type SubmitHandler } from "react-hook-form";
import { addNewCaseFromOCRSchema, type addNewCaseFromOCRType } from "../../validations/AddNewCaseFromOCRSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { useEffect } from "react";
import thunkAddNewCase from "../../redux/cases/thunk/thunkAddNewCase";
import toast, { Toaster } from "react-hot-toast";
// import InputSelect from "../ui/inputs/InputSelect";

const AddNewCaseFromOCRForm = () => {
    const { register, handleSubmit, formState: { errors }, setValue } = useForm<addNewCaseFromOCRType>({
        mode: 'onChange',
        resolver: zodResolver(addNewCaseFromOCRSchema),
        defaultValues: {
            caseTitle: "",
            caseNumber: "",
            caseType: 1,
            court: "",
            clientName: "",
            opponentName: "",
            caseDescription: "",
            caseFacts: "",
            legalRequests: ""
        }
    })

    const { generatedCase } = useAppSelector((state) => state.ocr);
    const dispatch = useAppDispatch();


    const onSubmit: SubmitHandler<addNewCaseFromOCRType> = async (data) => {
        console.log(data);

        toast.loading('جاري إنشاء القضية');
        try {
            await dispatch(thunkAddNewCase(data)).unwrap()
            toast.success('تم إنشاء القضية');
        } catch (error) {
            toast.success('حدث خطأ أثناء إنشاء القضية');
            console.log(error);
        } finally {
            toast.dismiss();
        }
    };


    useEffect(() => {
        console.log(generatedCase);
        if (generatedCase) {
            setValue("caseTitle", generatedCase.title || "");
            setValue("caseNumber", generatedCase.number || "");
            setValue("caseType", generatedCase.type || 1);
            setValue("court", generatedCase.court || "");
            setValue("clientName", generatedCase.clientName || "");
            setValue("opponentName", generatedCase.opponentName || "");
            setValue("caseDescription", generatedCase.description || "");
            setValue("caseFacts", generatedCase.facts || "");
            setValue("legalRequests", generatedCase.legalClaims || "");
        }
    }, [generatedCase, setValue]);

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-wrap">
                <div className="w-full md:w-6/12 p-2 mb-5">
                    <CustomInput
                        type="text"
                        label="عنوان القضية"
                        isInvalid={!!errors.caseTitle}
                        errorMessage={errors.caseTitle?.message}
                        {...register('caseTitle')}
                    />
                </div>
                <div className="w-full md:w-6/12 p-2 mb-5">
                    <CustomInput
                        type="text"
                        label="رقم القضية "
                        isInvalid={!!errors.caseNumber}
                        errorMessage={errors.caseNumber?.message}
                        {...register('caseNumber')}
                    />
                </div>
                <div className="w-full md:w-6/12 p-2 mb-5">
                    <CustomInput
                        type="number"
                        label="نوع القضية"
                        isInvalid={!!errors.caseType}
                        errorMessage={errors.caseType?.message}
                        {...register('caseType', { valueAsNumber: true })}
                    />
                </div>
                <div className="w-full md:w-6/12 p-2 mb-5">
                    <CustomInput
                        type="text"
                        label="المحكمة"
                        isInvalid={!!errors.court}
                        errorMessage={errors.court?.message}
                        {...register('court')}
                    />
                </div>
                <div className="w-full md:w-6/12 p-2 mb-5">
                    <CustomInput
                        type="text"
                        label="اسم الموكل"
                        isInvalid={!!errors.clientName}
                        errorMessage={errors.clientName?.message}
                        {...register('clientName')}
                    />
                </div>
                <div className="w-full md:w-6/12 p-2 mb-5">
                    <CustomInput
                        type="text"
                        label="اسم الخصم"
                        isInvalid={!!errors.opponentName}
                        errorMessage={errors.opponentName?.message}
                        {...register('opponentName')}
                    />
                </div>

                <div className="w-full mb-5">
                    <Textarea
                        disableAnimation
                        disableAutosize
                        classNames={{
                            input: "resize-y min-h-[40px]",
                        }}
                        label="وصف القضية"
                        variant="flat"
                        isInvalid={!!errors.caseDescription}
                        errorMessage={errors.caseDescription?.message}
                        {...register('caseDescription')}
                    />
                </div>
                <div className="w-full mb-5">
                    <Textarea
                        disableAnimation
                        disableAutosize
                        classNames={{
                            input: "resize-y min-h-[40px]",
                        }}
                        label="وقائع القضية"
                        variant="flat"
                        isInvalid={!!errors.caseFacts}
                        errorMessage={errors.caseFacts?.message}
                        {...register('caseFacts')}

                    />
                </div>
                <div className="w-full mb-5">
                    <Textarea
                        disableAnimation
                        disableAutosize
                        classNames={{
                            input: "resize-y min-h-[40px]",
                        }}
                        label="الطلبات القانونية"
                        variant="flat"
                        isInvalid={!!errors.legalRequests}
                        errorMessage={errors.legalRequests?.message}
                        {...register('legalRequests')}
                    />
                </div>
            </div>

            <ModalFooter className="w-full mt-5">
                <Button color="danger" variant="light" type='reset'>
                    حذف
                </Button>
                <Button color="primary" type='submit'
                    style={{ color: '#fff' }}
                >
                    إنشاء القضية
                </Button>
            </ModalFooter>
            <Toaster />
        </form>
    );
};

export default AddNewCaseFromOCRForm;