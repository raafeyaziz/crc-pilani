export default function InputBox({...props}){
    return(
        <div className="flex gap-2   border-white border w-full px-2 py-2">
            <div className="h-[1.25em] w-[1em] bg-white pointer-events-none" />
            <input {...props} className=" bg-black font-mono text-white w-full h-full outline-none focus:text-white focus:outline-none">
            </input>
        </div>
    )
}