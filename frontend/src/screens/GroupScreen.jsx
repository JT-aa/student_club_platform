import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Row, Col, Image, ListGroup, Card, Button, Container } from 'react-bootstrap';
import MembersCard from '../components/MembersCard';
import Header from '../components/Header';
import Footer from '../components/Footer';

import logo from '../assets/logo.jpg'



const GroupScreen = () => {
    const { id: groupId } = useParams();
    const [group, setGroup] = useState(null);
    const [users, setUsers] = useState([]);
    const [members, setMembers] = useState([]);

    useEffect(() => {
        // Fetch group information based on the id in the URL
        axios.get(`http://localhost:8000/api/groups/${groupId}`)
            .then(response => {
                setGroup(response.data);
            })
            .catch(error => {
                console.error(error);
            });

        // Fetch list of members in the group
        axios.get(`http://localhost:8000/api/groups/${groupId}/users`)
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
        axios.delete(`http://localhost:8000/api/users/${memberId}/groups/${groupId}`)
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
        axios.post(`http://localhost:8000/api/users/${memberId}/groups/${groupId}`, { role: 'member' })
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
            <Link className='btn btn-light my-3' to='/'>
                Go Back
            </Link>
            <Row>
            <Col md={6}>

                <ListGroup variant='flush'>
                    <ListGroup.Item>
                        <h1>{group.name}</h1>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Image src={logo} alt={group.name} height={200} width={200}/>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <p>{group.description}</p>
                    </ListGroup.Item>
                </ListGroup>
            </Col>

            <Col md={6}>
                <MembersCard users={users} members={members} setMembers={setMembers} deleteMember={deleteMember} addMember={addMember}/>
            </Col>

            </Row>
        </div>
    );
};

export default GroupScreen;