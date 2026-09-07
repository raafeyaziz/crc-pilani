import instagramIcon from '../assets/instagram.svg';
import linkedinIcon from '../assets/linkedin.svg';
import avatarIcon from "../assets/avatar.png"

import { useState, useEffect } from 'react';
import { api } from '../context/AuthContext';

export default function AboutCard({ member,isAdmin=false, onDeleteSuccess=false, onEdit=null, ...props }) {

    const [isDeleting, setIsDeleting]= useState(false);

    const roleColor = {
        signatory: "text-green",
        volunteer: "text-red",
    };

    const handleDelete = async () => {
            const confirmed = window.confirm("are you sure?");
            if (!confirmed) return;
            setIsDeleting(true);
            try {
                await api.delete(`/api/crc-members/${member.id}/`);
                if (onDeleteSuccess) {
                    onDeleteSuccess();
                }
            } catch (error) {
                console.error("failed to delete:", error);
                alert(">not deleted hehe");
            } finally {
                setIsDeleting(false);
            }
        };
    
    return (
        <div
            className="
            border border-white
            p-4
            flex
            items-center
            md: justify-between
            flex-col
            md:flex-row
            gap-1
            m-10
            md:m-0
            "
        >

            {/* Left */}

            <div className="flex flex-col md:flex-row items-center md:items-start font-light gap-5">

                <img
                    src={member.avatar}
                    alt={member.name}
                    className=" w-32 h-32 border bg-grey border-white"
                />

                <div className='flex items'>
                    <h2 className='text-3xl md:text-4xl'>
                        &gt;
                    </h2>

                    <div className='flex flex-col items-center md:items-stretch'>

                    <h2 className="text-3xl md:text-4xl text-white">
                        {member.name.toLowerCase()}
                    </h2>

                    <p
                        className={`text-base md:text-xl ${roleColor[member.role]}`}
                    >
                        {member.role}
                    </p>

                    </div>
                </div>

            </div>

            {/* Right */}

            <div className="flex flex-col flex-1 truncate items-end gap-5">

                <div className="text-grey font-mono text-base md:text-xl flex flex-col items-center md:items-end">
                    {isAdmin && (
                        <div className='flex text-white md:text-sm text-xs gap-4'>
                            <button className='hover:text-green' onClick={onEdit}>
                                <u>edit</u>
                            </button>
                            <button className='hover:text-red' onClick={handleDelete}>
                                <u>delete</u>
                            </button>
                        </div>
                    )}
                    <span>
                        //{member.bits_id}
                    </span>
                </div>

                <div className="flex gap-3">

                    <a
                        href={member.instagram}
                        target="_blank"
                        rel="noreferrer"
                        className="
                        border border-white
                        p-2
                        hover:bg-white
                        hover:text-black
                        transition
                        group
                        h-12 w-12
                        border-t-[2px] border-l-[2px] border-r-[6px] border-b-[6px]
                        "
                    >
                        <img src={instagramIcon} alt='insta' className='group-hover:invert'/>
                    </a>

                    <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noreferrer"
                        className="
                        border border-white
                        p-2
                        hover:bg-white
                        hover:text-black
                        transition
                        group
                        h-12 w-12
                        border-t-[2px] border-l-[2px] border-r-[6px] border-b-[6px]
                        "
                    >
                        <img src={linkedinIcon} alt='link' className='group-hover:invert' />
                    </a>

                </div>

            </div>

        </div>
    );
}