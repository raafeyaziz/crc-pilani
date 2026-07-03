import Row from "./Row";
import Column from "./Column";
import InputBox from "./InputBox";
import crossIcon from "../assets/cross.svg";
import Button from './Button';

export default function Modal({
    title='',
    onClose,
    children,
    ...props
}){
    return(
        <div className='fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm'>
                    
            <Column className="max-h-[90dvh] w-full max-w-2xl md:max-w-3xl text-sm md:text-base pb-4 gap-4 md:gap-10 bg-black text-white border-2 border-white z-50 shadow-[8px_8px_0px_0px_rgba(255,255,255,1)]">
                
                <Row className='border border-white justify-between bg-white text-black text-xl md:text-2xl' >
                    <div className="selection:bg-black selection:text-white px-2">
                        &gt;{title}
                    </div>
            
                    <button className="bg-black hover:bg-red h-full w-auto px-1 py-1 cursor-pointer" onClick={onClose}>
                        <img src={crossIcon} alt='close' className="h-[1em] w-auto"/>
                    </button>
                    </Row>
                {children}
            </Column>
        </div>
        )

}