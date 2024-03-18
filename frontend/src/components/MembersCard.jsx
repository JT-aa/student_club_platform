import React, { useState } from 'react';
import MembersRow from './MembersRow';

const MembersCard = ({ users, members, setMembers, deleteMember, addMember}) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [showDropdown, setShowDropdown] = useState(false); // Add state for dropdown visibility

    const filteredUsers = users.filter(user => {
        return (
            user.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
            !members.some(member => member.id === user.id)
        );
    });


    const handleSearch = e => {
        setSearchTerm(e.target.value);
        console.log(e.target.value);
        setShowDropdown(true); // Show dropdown when search term changes
    };

    return (
        <div>
            <input type="text" value={searchTerm} onChange={handleSearch} placeholder="Search users" />
            {showDropdown && searchTerm && (
                <div className="dropdown">
                    {filteredUsers.map(member => (
                        <MembersRow key={member.id} member={member} isAddButton={true} deleteMember={deleteMember} addMember={addMember}/>
                    ))}
                </div>
            )}
            <div>
                <h2>Members ({members.length})</h2>
                <ul>
                    {members.map(member => (
                        <li>
                            <MembersRow key={member.id} member={member} isAddButton={false} deleteMember={deleteMember} addMember={addMember}/>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default MembersCard;