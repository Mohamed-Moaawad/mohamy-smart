import { Modal, ModalBody, ModalContent, ModalHeader } from '@heroui/react'

type TCustomModal = {
    isOpen: boolean;
    onOpenChange: () => void;
    title: string;
    size: 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';
    children: React.ReactNode;
};

const CustomModal = ({ isOpen, onOpenChange, title, size, children }: TCustomModal) => {
    return (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} size={size}
            backdrop='blur'
        >
            <ModalContent>
                <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
                <ModalBody>
                    {children}
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}

export default CustomModal