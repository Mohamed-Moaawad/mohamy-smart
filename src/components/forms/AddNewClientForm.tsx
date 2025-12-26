import { Button, ModalFooter, Textarea } from "@heroui/react";
import CustomInput from "../ui/inputs/CustomInput";
import { useForm, type SubmitHandler } from "react-hook-form";
import { addNewClientSchema, type addNewClientType } from "../../validations/addNewClientSchema";
import { zodResolver } from "@hookform/resolvers/zod";

const AddNewClientForm = () => {
    const { register, handleSubmit, formState: { errors }, } = useForm<addNewClientType>({
        mode: 'onChange',
        resolver: zodResolver(addNewClientSchema),
    });

    const onSubmit: SubmitHandler<addNewClientType> = (data) => console.log(data)

    return (
        <form className="flex flex-wrap"
            onSubmit={handleSubmit(onSubmit)}
        >
            <div className="w-full md:w-6/12 p-4">
                <CustomInput
                    type="text"
                    label="الاسم الكامل"
                    isInvalid={!!errors.fullName}
                    errorMessage={errors.fullName?.message}
                    {...register('fullName')}
                />
            </div>
            <div className="w-full md:w-6/12 p-4">
                <CustomInput
                    type="text"
                    label="رقم الهاتف"
                    isInvalid={!!errors.phone}
                    errorMessage={errors.phone?.message}
                    {...register('phone')}
                />
            </div>
            <div className="w-full p-4">
                <CustomInput
                    type="email"
                    label="البريد الإلكتروني"
                    isInvalid={!!errors.email}
                    errorMessage={errors.email?.message}
                    {...register('email')}
                />
            </div>
            <div className="w-full p-4">
                <CustomInput
                    type="text"
                    label="الرقم القومي"
                    isInvalid={!!errors.nationalId}
                    errorMessage={errors.nationalId?.message}
                    {...register('nationalId')}
                />
            </div>
            <div className="w-full p-4">
                <Textarea className="w-full" label="ملاحظات"
                    isInvalid={!!errors.notes}
                    errorMessage={errors.notes?.message}
                    {...register('notes')}
                />
            </div>

            <ModalFooter className="w-full">
                <Button color="danger" variant="light" type='reset'>
                    حذف
                </Button>
                <Button color="primary" type='submit'
                    style={{ color: '#fff' }}
                >
                    إضافة
                </Button>
            </ModalFooter>
        </form>
    );
};

export default AddNewClientForm;