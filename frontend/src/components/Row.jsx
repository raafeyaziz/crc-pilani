export default function Row({
    className="",
    children,
    ...props
}){
    const spec= `flex ${className} md:flex-row`;
    return(
        <div className={spec} {...props}>
            {children}
        </div>
    )
}