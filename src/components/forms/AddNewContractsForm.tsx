import CustomInput from '../ui/inputs/CustomInput';
import InputSelect from '../ui/inputs/InputSelect';
import { Button, ModalFooter, Textarea } from '@heroui/react';
import { FormProvider, useForm, type SubmitHandler } from 'react-hook-form';
import { addNewContractsSchema, type addNewContractsType } from '../../validations/AddNewContractsSchema';
import { zodResolver } from '@hookform/resolvers/zod';

const AddNewContractsForm = () => {
    const methods = useForm<addNewContractsType>({
        mode: 'onChange',
        resolver: zodResolver(addNewContractsSchema)
    });
    const { register, handleSubmit, formState: { errors } } = methods;

    const onSubmit: SubmitHandler<addNewContractsType> = (data) => console.log(data);

    return (
        <FormProvider {...methods}>
            <form className='flex flex-col gap-5'
                onSubmit={handleSubmit(onSubmit)}
            >
                <CustomInput
                    type='text'
                    label='اسم الموكل'
                    isInvalid={!!errors.contractName}
                    errorMessage={errors.contractName?.message}
                    {...register('contractName')}
                />
                <InputSelect
                    name='contractType'
                    label='نوع العقد'
                    data={['عقد إيجار', 'عقد بيع', 'عقد عمل', 'مذكرة دعوى', 'لائحة دعوى', 'مذكرة دفاع', 'توكيل', 'اعتراض', 'طعن']}
                    radius='md'
                />
                <Textarea label="ملاحظات"
                    isInvalid={!!errors.notes}
                    errorMessage={errors.notes?.message}
                    {...register('notes')}
                />

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
        </FormProvider>
    );
};

export default AddNewContractsForm;