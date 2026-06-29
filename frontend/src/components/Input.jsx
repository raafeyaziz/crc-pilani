export default function Input({
    variant='default',
    also='',
    ...props
}){
    const variants={
        default:'bg-white text-black focus:outline-none focus:bg-white focus:text-black w-full tracking-widest selection:text-white selection:bg-black',
    };
    
    const className= `${variants[variant]} ${also}`;

    return (
        <input 
        className={className}
        {...props}
        />
    );
}