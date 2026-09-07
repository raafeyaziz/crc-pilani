import { useState, useEffect } from 'react';
import { api } from '../context/AuthContext';
import CreatableSelect from 'react-select/creatable'; 
import Row from "./Row";
import Column from "./Column";
import InputBox from "./InputBox";
import Button from './Button';
import Modal from './Modal';


export default function PayletModal({
    transaction,
    onClose,
    ...props
}){
    const [loading, setLoading]= useState(false);
    const [payee, setPayee]= useState('');
    const [reason, setReason]= useState('');
    const [accName, setAccName] = useState('');
    const [accNo, setAccNo] = useState('');
    const [bank, setBank] = useState('');
    const [ifsc, SetIfsc] = useState('');
    
    const [pan, setPan] = useState('');
    const [gstin, setGstin] = useState('');
    
    const [vendors, setVendors]= useState([]);
    const [vendor, setVendor]= useState('');

    const [isDownloading, setIsDownloading]= useState(false);

    const inputDisabled= loading || isDownloading;
    const postDisabled= isDownloading || loading;

    useEffect(()=>{
        const fetchVendors = async () => {
            try{
                const res= await api.get("/api/vendors/");
                const formattedData= res.data.map(vendor => ({
                    value: vendor,
                    label: vendor.name
                }));
                setVendors(formattedData);
            } catch (error){
                console.error("Error fetching subcategories:", error);
            }
        };
        fetchVendors();
    }, []);

    const handleCreateVendor= async (inputValue) => {
        setLoading(true);
        setVendor({value:{name:inputValue, created:true}, label:inputValue});
        setPayee(inputValue);
        setLoading(false);
    };

    const handleSelectVendor= async (input) => {
        setVendor(input);
        if (!input) return;
        setPayee(input.value.name);
        if (!input.value.created){
            setAccName(input.value.acc_name);
            setAccNo(input.value.acc_number);
            setBank(input.value.bank);
            SetIfsc(input.value.ifsc);
            setPan(input.value.pan);
            setGstin(input.value.gstin);
        }
    }


    const handleDownload= async (format='docx') => {
        setIsDownloading(true);
        try{
            const payload= {
                payee: payee.trim(),
                reason: reason.trim(),
                accName: accName.trim(),
                accNo: accNo.trim(),
                bank: bank.trim(),
                ifsc: ifsc.trim(),
                pan: pan.trim(),
                gstin: gstin.trim(),
            }
            const response= await api.post(`/api/transactions/${transaction.id}/generate_paylet/?file_ext=${format}`, payload,
                {
                    responseType: 'blob'
                }
            );
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `Paylet_${transaction.title}.${format}`);

            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
            window.URL.revokeObjectURL(url);

        } catch (e){
            console.error('could not create paylet:', e);
        } finally{
            setIsDownloading(false);
        }
    }

    return(
    <Modal title='get_paylet' onClose={onClose}>
        <div className='overflow-y-auto flex flex-col gap-4'>
            <div className="flex flex-col md:flex-row w-full px-10 gap-1 md:gap-10 md:items-center">
                <p className='w-20 flex-shrink-0'>&gt;payee</p>
                <div className="flex flex-1">
                    <CreatableSelect className='flex-1'
                    disabled={inputDisabled}
                    isClearable
                    isDisabled={loading}
                    isLoading= {loading}
                    options= {vendors}
                    value= {vendor}
                    formatOptionLabel={(option)=> `>${option.label}`}
                    onChange={handleSelectVendor}
                    onCreateOption={handleCreateVendor}
                    placeholder='search'
                    unstyled={true}
                    classNames={{
                        control: (state) => 
                        `border px-4 py-1 border-white text-m font-mono rounded-none bg-black cursor-text ${
                            state.isFocused ? 'shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]' : ''
                        }`,
                        menu: () => 
                        "border border-white text-xs rounded-none font-mono bg-black mt-1 cursor-text",
                        singleValue: ()=> 'text-white',
                        placeholder: ()=> "text-grey",
                        indicatorSeparator: ()=> "bg-grey  mx-2 my-1",
                        option: (state) => 
                        `border-white border cursor-pointer px-4 py-2 ${
                            state.isSelected 
                            ? 'bg-white text-black' 
                            : state.isFocused 
                                ? 'bg-white text-black' 
                                : 'bg-black text-white'
                        }`
                    }} />
                </div>
            </div>
            <div className="flex flex-col md:flex-row w-full px-10 gap-1 md:gap-10 md:items-center">
                <p className='w-20 flex-shrink-0'>&gt;for</p>
                <div className="flex flex-1">
                    <InputBox disabled={inputDisabled} type="text"
                    value={reason}
                    onChange={(e)=> setReason(e.target.value)}/>
                </div>
            </div>
            <div className="flex flex-col md:flex-row w-full px-10 gap-1 md:gap-10 md:items-center">
                <p className='w-20 font-mono flex-shrink-0'></p>
                <div className="flex flex-1">
                    <Column className='flex-1 gap-2'>
                        <Row className='flex flex-col  gap-2'>
                            <Column className='flex-1'>
                                <p className='md:text-sm text-xs'>&gt;acc_name</p>
                                <InputBox disabled={inputDisabled} type="text"
                                value={accName}
                                onChange={(e)=> setAccName(e.target.value)}/>
                            </Column>
                            <Column className='flex-1'>
                                <p className='md:text-sm text-xs'>&gt;acc_number</p>
                                <InputBox disabled={inputDisabled} type="text"
                                value={accNo}
                                onChange={(e)=> setAccNo(e.target.value)}/>
                            </Column>
                        </Row>

                        <Row className='flex flex-col  gap-2'>
                            <Column className='flex-1'>
                                <p className='md:text-sm text-xs'>&gt;bank</p>
                                <InputBox disabled={inputDisabled} type="text"
                                value={bank}
                                onChange={(e)=> setBank(e.target.value)}/>
                            </Column>
                            <Column className='flex-1'>
                                <p className='md:text-sm text-xs'>&gt;ifsc</p>
                                <InputBox disabled={inputDisabled} type="text"
                                value={ifsc}
                                onChange={(e)=> SetIfsc(e.target.value)}/>
                            </Column>
                        </Row>

                        <Row className='flex flex-col  gap-2'>
                            <Column className='flex-1'>
                                <p className={`md:text-sm text-xs ${pan? 'text-white' :'text-grey'}`}>&gt;pan</p>
                                <InputBox disabled={inputDisabled} type="text"
                                value={pan}
                                onChange={(e)=> setPan(e.target.value)}/>
                            </Column>
                            <Column className='flex-1'>
                                <p className={`md:text-sm text-xs ${gstin? 'text-white' :'text-grey'}`}>&gt;gstin</p>
                                <InputBox disabled={inputDisabled} type="text"
                                value={gstin}
                                onChange={(e)=> setGstin(e.target.value)}/>
                            </Column>
                        </Row>
                        
                    </Column>
                </div>
            </div>

            <Row className='px-10 py-1 justify-end gap-6'>
                
                <button 
                    disabled={postDisabled} 
                    onClick= {()=>handleDownload('docx')}
                    className={`px-6 py-2 group flex justify-center items-center bg-black transition-all duration-200 border-t-[2px] border-l-[2px] border-r-[6px] border-b-[6px] ${
                        postDisabled 
                        ? 'text-zinc-600 border-zinc-600 cursor-not-allowed opacity-50' 
                        : 'border-white text-white hover:text-black hover:bg-white cursor-pointer active:translate-x-[2px] active:translate-y-[2px] active:border-r-[4px] active:border-b-[4px]'
                    }`}
                >
                    .docx
                </button>
            </Row>

        </div>
    </Modal>
    )
}