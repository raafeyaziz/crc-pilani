import Row from "./Row";

export default function MainButton({
    src='',
    title='',
    body='',
    ...props
}){
    return(
        <button {...props} className='group p-10 gap-8 border-white flex items-center justify-center hover:bg-white flex-col border-t-2 border-l-2 border-r-[1rem] border-b-[1rem]'>
            <img src={src} alt='announce' className='md:w-20 md:h-20 w-12 h-12  group-hover:invert'></img>
            <p className='text-xl md:text-2xl group-hover:text-black'>&gt;{title}</p>
            <p className='text-sm md:text-base text-grey'>{body}</p>
        </button>
    )
}