import { Skeleton } from '@mantine/core'

const SkeletonForm = () => {
    return (
        <div className='flex flex-wrap'>
            <div className="w-full flex gap-3 p-4 ">
                <Skeleton height={30} width={'30%'} radius={'md'} />
                <Skeleton height={30} width={25} radius={'md'} />
            </div>
            <div className="w-full sm:w-6/12 p-4">
                <Skeleton height={20} mb={5} width={'30%'} radius={'sm'} />
                <Skeleton height={55} width={'100%'} radius={'md'} />
            </div>
            <div className="w-full sm:w-6/12 p-4">
                <Skeleton height={20} mb={5} width={'30%'} radius={'sm'} />
                <Skeleton height={55} width={'100%'} radius={'md'} />
            </div>
            <div className="w-full sm:w-6/12 p-4">
                <Skeleton height={20} mb={5} width={'30%'} radius={'sm'} />
                <Skeleton height={55} width={'100%'} radius={'md'} />
            </div>
            <div className="w-full sm:w-6/12 p-4">
                <Skeleton height={20} mb={5} width={'30%'} radius={'sm'} />
                <Skeleton height={55} width={'100%'} radius={'md'} />
            </div>
            <div className="w-full sm:w-6/12 p-4">
                <Skeleton height={20} mb={5} width={'30%'} radius={'sm'} />
                <Skeleton height={55} width={'100%'} radius={'md'} />
            </div>
            <div className="w-full sm:w-6/12 p-4">
                <Skeleton height={20} mb={5} width={'30%'} radius={'sm'} />
                <Skeleton height={55} width={'100%'} radius={'md'} />
            </div>
            <div className="w-full sm:w-6/12 p-4">
                <Skeleton height={20} mb={5} width={'30%'} radius={'sm'} />
                <Skeleton height={55} width={'100%'} radius={'md'} />
            </div>
            <div className="w-full sm:w-6/12 p-4">
                <Skeleton height={20} mb={5} width={'30%'} radius={'sm'} />
                <Skeleton height={55} width={'100%'} radius={'md'} />
            </div>
        </div>
    )
}

export default SkeletonForm