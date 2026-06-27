export default function Input({
    variant='default',
    ...props
}){
    const variants={
        default:'bg-white text-black focus:outline-none focus:bg-white focus:text-black w-full tracking-widest',
    };
    
    const className= `${variants[variant]}`;

    return (
        <input 
        className={className}
        {...props}
        />
    );
}