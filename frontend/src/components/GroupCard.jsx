import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import MembersCard from './MembersCard';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import logo from '../assets/logo.jpg'

const GroupCard = ({ group }) => {

    const [members, setMembers] = useState([]);

    // Fetch list of members in the group
    axios.get(`http://localhost:8000/api/groups/${group.id}/users`)
    .then(response => {
        setMembers(response.data);
    })
    .catch(error => {
        console.error(error);
    });


    return (

        <Card className='my-3 p-3 rounded'>
      

      <Card.Body>
      <Link to={`/group/${group.id}`}>
        <Card.Img src={logo} variant='top' />
      </Link>
        <Link to={`/group/${group.id}`}>
          <Card.Title as='div' className='group-title'>
            <strong>{group.name}</strong>
          </Card.Title>
        </Link>

        {/* <Card.Text as='div'>
          <Rating
            value={product.rating}
            text={`${product.numReviews} reviews`}
          />
        </Card.Text> */}

        <Card.Text as='p'>{group.description}</Card.Text>
        <Card.Text as='p'>{members ? members.length : 0} Members</Card.Text>
      </Card.Body>
    </Card>
    );
};

export default GroupCard;