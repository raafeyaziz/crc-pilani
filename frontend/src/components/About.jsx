import editIcon from "../assets/edit.svg";
import plusIcon from '../assets/plus.svg'


import AboutCard from "./AboutCard";
import Button from "./Button";
import EditAbout from "./EditAbout";

import { AuthContext, api } from '../context/AuthContext';
import { useEffect, useState } from "react";

export default function CommitteeSection({
    
}) {
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedMember, setSelectedMember] =useState(null);
    const [edit, setEdit]= useState(false);

     const fetchCommittee = async () => {
        try {
            const res = await api.get("/api/crc-members");
            setMembers(res.data);
        } catch (err) {
            console.log(`crc not reachable ${err}`);
        } finally {
            setLoading(false);
        }
    };

    useEffect(()=>{
        fetchCommittee()
    }, [])

    if (loading) return "we're coming";

    return (
        <section className="w-full">

            <div className="flex justify-between items-center mb-6">

                <h1 className="text-2xl md:text-3xl text-white">
                    &gt;the_committee
                </h1>

                <Button
                    onClick={()=>{
                        setEdit(true);
                        setSelectedMember(null);
                    }}
                    shape='square'
                    size='small'
                    also='w-14 h-14'
                >
                    <img src={plusIcon} alt='add' className="group-hover:invert"></img>
                </Button>

            </div>

            {/* Members */}

            <div className="flex flex-col gap-4">

                {members.map((member) => (
                    <AboutCard
                        key={member.id}
                        member={member}
                        isAdmin={true}
                        onDeleteSuccess= {fetchCommittee}
                        onEdit= {()=>{
                            setSelectedMember(member)
                            setEdit(true)
                        }}
                    />
                ))}

            </div>

            {edit && (
                <EditAbout member={selectedMember} onClose={()=>setEdit(false)} onSuccess={fetchCommittee}/>
            )}

        </section>
    );
}