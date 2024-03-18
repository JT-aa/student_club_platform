import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import MembersCard from '../components/MembersCard';
import Header from '../components/Header';
import { Container } from 'react-bootstrap';
import Footer from '../components/Footer';

const GroupScreen = () => {
    //const { id } = useParams();
    const id = 3;
    const [group, setGroup] = useState(null);
    const [users, setUsers] = useState([]);
    const [members, setMembers] = useState([]);

    useEffect(() => {
        // Fetch group information based on the id in the URL
        axios.get(`http://localhost:8000/api/groups/${id}`)
            .then(response => {
                setGroup(response.data);
            })
            .catch(error => {
                console.error(error);
            });

        // Fetch list of members in the group
        axios.get(`http://localhost:8000/api/groups/${id}/users`)
            .then(response => {
                setMembers(response.data);
            })
            .catch(error => {
                console.error(error);
            });

        // Fetch list of all users
        axios.get('http://localhost:8000/api/users')
            .then(response => {
                setUsers(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, [members]);


    if (!group) {
        return <div>Loading...</div>;
    }

    function deleteMember(memberId) {
        axios.delete(`http://localhost:8000/api/users/${memberId}/groups/${id}`)
            .then(response => {
                console.log('Member deleted:', response.data);
                setMembers(members.filter(member => member.id !== memberId));
            })
            .catch(error => {
                console.error('Error deleting member:', error);
            });
    }

    function addMember(memberId) {
        console.log('Adding member:', memberId);
        axios.post(`http://localhost:8000/api/users/${memberId}/groups/${id}`, { role: 'member' })
            .then(response => {
                console.log('Member added:', response.data);
                setMembers([...members, response.data]);
            })
            .catch(error => {
                console.error('Error adding member:', error);
            });
    }

    return (
        <div>
            <h1>{group.name}</h1>
            <p>{group.description}</p>

            <div>
                <MembersCard users={users} members={members} setMembers={setMembers} deleteMember={deleteMember} addMember={addMember}/>
            </div> 
        </div>
    );
};

export default GroupScreen;