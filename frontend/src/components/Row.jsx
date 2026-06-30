export default function Row({
    className="",
    children,
    ...props
}){
    const spec= `flex  ${className}`;
    return(
        <div className={spec} {...props}>
            {children}
        </div>
    )
}