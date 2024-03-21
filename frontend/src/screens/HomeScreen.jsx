import React from 'react';
import { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import Header from '../components/Header.jsx';
import GroupCard from '../components/GroupCard.jsx';
import { useGetGroupsQuery } from '../slices/groupsApiSlice';
import Loader from '../components/Loader.jsx';
import Message from '../components/Message.jsx';


const HomeScreen = () => {
    // const [groups, setGroups] = useState([]);
    // const [members, setMembers] = useState([]);

    // useEffect(() => {
    //     fetchGroups();
    // }, []);

    // const fetchGroups = async () => {
    //     try {
    //         const response = await fetch('http://localhost:8000/api/groups');
    //         const data = await response.json();
    //         setGroups(data);
    //         console.log(groups);
    //     } catch (error) {
    //         console.error('Error fetching groups:', error);
    //     }
    // };

    const { data: groups, isLoading, error } = useGetGroupsQuery();


    return (
        <div>

            {/* <button>Add New Group</button> */}
            {isLoading ? (
                <Loader />
                ) : error ? (
                    <Message variant='danger'>
                        {error?.data?.message || error.error}
                    </Message>
                ) : (
                    <Row>
                        {groups.map((group) => (
                            <Col key={group.id} sm={12} md={6} lg={4} xl={3}>
                                <GroupCard group={group}/>
                            </Col>
                        ))}
                    </Row>
                )}
        </div>
    );
};

export default HomeScreen;