import React from 'react';

const MembersRow = ({ member, isAddButton, deleteMember, addMember}) => {
    const handleButtonClick = () => {
        if (isAddButton) {
            // Add button logic
            console.log(`Adding ${member.name} to the list`);
            addMember(member.id);

        } else {
            // Delete button logic
            console.log(`Deleting ${member.name} from the list`);
            deleteMember(member.id);
        }
    };

    return (
        <div className="member-row">
            <span>{member.name}</span>
            <button className='btn btn-light my-1' onClick={handleButtonClick}>
                {isAddButton ? '+' : 'x'}
            </button>
        </div>
    );
};

export default MembersRow;