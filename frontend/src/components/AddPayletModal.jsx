import { useState, useEffect } from 'react';
import CreatableSelect from 'react-select/creatable'; 
import { api } from '../context/AuthContext';

import Row from "./Row";
import Column from "./Column";
import InputBox from "./InputBox";
import crossIcon from "../assets/cross.svg";
import Button from './Button';
export default function AddPayetModal({
ledger,
onClose,
onSuccess
}){
    const [title, setTitle]= useState('');
    const [amount, setAmount]= useState(0);
    const [type, setType]= useState('expense');
    const [subcategory, setSubcategory]= useState('');
    const [subcategoryOptions, setSubcategoryOptions]= useState([]);
    const [isLoading, setIsLoading]= useState(false);
    const [posting, setPosting]= useState(false);

    const canPost= title.trim() && amount && amount !=0 && subcategory;
    const inputDisabled= posting;
    const postDisabled= !canPost || posting;

    const CustomControl= ({children, ...props})=>{
        return(
            <components.Control {...props}>
                <div className='w-14 flex-shrink-0 bg-white flex items-center justify-center border-r-2 border-white self-stretch'>

                </div>
                {children}
            </components.Control>
        )
    }

    useEffect(()=>{
        const fetchSubcategories = async () => {
            try{
                const res= await api.get("/api/subcategories/");
                const formattedData= res.data.map(sub => ({
                    value: sub.id,
                    label: sub.name
                }));
                setSubcategoryOptions(formattedData);
            } catch (error){
                console.error("Error fetching subcategories:", error);
            }
        };
        fetchSubcategories();
    }, []);

    const handleCreateSubcategory = async (inputValue) => {
        setIsLoading(true);
        try {
        const res = await api.post('/api/subcategories/', { name: inputValue });
        
        const newOption = { value: res.data.id, label: res.data.name };
        
        setSubcategoryOptions((prev) => [...prev, newOption]);
        
        setSubcategory(newOption);
        
        } catch (error) {
        console.error("Failed to create subcategory", error);
        } finally {
        setIsLoading(false);
        }
    };

    const handlePost= async ()=> {
        setPosting(true);
        setIsLoading(true);
        try{
            const payload= {
                title: title.trim(),
                amount: amount,
                transaction_type: type,
                ledger: ledger.id,
                subcategory: subcategory.value
            }
            await api.post("/api/transactions/", payload);
            onSuccess();
            onClose();
        
        }
        catch (e){
            console.log(`could not post: ${e}`);
        }
    };

    return(
        <div className='fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8'>
        <Column className="text-s pb-4 gap-4 bg-black text-white border border-white z-50">
        <Row className='border border-white justify-between bg-white text-black text-2xl' >
            <div className="selection:bg-black selection:text-white">
                &gt;add-transaction
            </div>
            
                <button className="bg-black h-full w-auto px-1 py-1" onClick={onClose}>
                    <img src={crossIcon} alt='close' className="h-[1em] w-auto"/>
                </button>
        </Row>
        <header className="text-grey flex items-center justify-center">
            //{ledger.name}
        </header>
        <Row className="w-full px-10 gap-4">
            <p className='w-1/6'>&gt;title</p>
            <div className="flex flex-1">
                <InputBox disabled={inputDisabled} type="text"
                value={title}
                onChange={(e)=> setTitle(e.target.value)}/>
            </div>
            
        </Row>
        <Row className="w-full px-10 gap-4">
            <p className='w-1/6'>&gt;amt</p>
            <div className="flex flex-1 gap-4">
                <InputBox disabled={inputDisabled} type="number" 
                value= {amount}
                onChange= {(e)=>setAmount(e.target.value)}/>
                <button disabled={inputDisabled} onClick= {()=>setType("revenue")} className={`border hover:bg-white hover:text-black flex items-center px-5 border-white text-xs ${type=='revenue'? 'bg-white text-black' : 'bg-black text-white'}`}>revenue</button>
                <button disabled={inputDisabled} onClick= {()=>setType("expense")} className={`border hover:bg-white hover:text-black flex items-center px-5 border-white text-xs ${type=='expense'? 'bg-white text-black' : 'bg-black text-white'}`}>expense</button>
            </div>
        </Row>

        <Row className="w-full px-10 gap-4">
            <p className='w-1/6'>&gt;cat</p>
            <div className="flex flex-1 gap-4">
                <CreatableSelect className='flex-1'
                disabled={inputDisabled}
                isClearable
                isDisabled={isLoading}
                isLoading= {isLoading}
                options= {subcategoryOptions}
                value= {subcategory}
                formatOptionLabel={(option)=> `>${option.label}`}
                onChange={(newValue)=>setSubcategory(newValue)}
                onCreateOption={handleCreateSubcategory}
                placeholder='search'
                unstyled={true}
                classNames={{
                    control: (state) => 
                    `border px-4 py-1 border-white text-m font-light rounded-none bg-black cursor-text ${
                        state.isFocused ? 'shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]' : ''
                    }`,
                    menu: () => 
                    "border border-white text-xs rounded-none font-light bg-black mt-1 cursor-text",
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
        </Row>
        <Row className='px-10 py-1 justify-end'>
            <button disabled={postDisabled} onClick= {handlePost} className={`px-6 py-2 group flex justify-center items-center bg-black ${postDisabled ? 'text-grey border-grey' : 'border-white  text-white hover:text-black hover:bg-white cursor-pointer'} transition-all duration-200 border-t-[2px] border-l-[2px] border-r-[6px] border-b-[6px] `}>
                Post
            </button>
        </Row>
        </Column>
        </div>
        
    )
}