export default function Button({
    size='small',
    shape='square',
    also,
    children,
    ...props
}){
    const sizes= {
        small: 'group flex justify-center items-center bg-black text-white text-xl hover:text-black hover:bg-white transition-all duration-200 cursor-pointer border-t-[2px] border-l-[2px] border-r-[6px] border-b-[6px] border-white',
        big: 'group flex justify-center items-center bg-black text-3xl text-white  hover:bg-white hover:text-black border-t-[3px] border-l-[3px] border-b-[10px] border-r-[10px] border-white transition-all duration-200 cursor-pointer',
    };
    const shapes= {
        square: 'px-3.5 py-3.5',
        
        rectangle: 'gap-4 px-5 py-4'
    };

    const className= `${sizes[size]} ${shapes[shape]} ${also}`;
    return (
        <button className={className} {...props}>
            {children}
        </button>
    );
}