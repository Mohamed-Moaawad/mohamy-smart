
const NotFoundData = ({ text }: { text: string }) => {
    return (
        <div className='not-found-data flex flex-col justify-center items-center gap-5 p-20 my-5'>
            x
            <p className='not-found'>{text}</p>
        </div>
    )
}

export default NotFoundData