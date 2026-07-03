import { useState, useEffect } from 'react';
import { api } from '../context/AuthContext';
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
    
    const inputDisabled= loading;
    return(
    <Modal title='get_paylet' onClose={onClose}>
        <div className='overflow-y-auto flex flex-col gap-4'>
        <div className="flex flex-col md:flex-row w-full px-10 gap-1 md:gap-10 md:items-center">
            <p className='w-20 flex-shrink-0'>&gt;payee</p>
            <div className="flex flex-1">
                <InputBox disabled={inputDisabled} type="text"
                value={payee}
                onChange={(e)=> setPayee(e.target.value)}/>
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
        </div>
    </Modal>
    )
}