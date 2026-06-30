export default function Column({
    className="",
    children,
    ...props
}){
    const spec= `flex flex-col ${className}`;
    return(
        <div className={spec} {...props}>
            {children}
        </div>
    )
}