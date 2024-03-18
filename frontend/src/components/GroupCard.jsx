import React from 'react';
import MembersCard from './MembersCard';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const GroupCard = ({ group }) => {
    return (

        <Card className='my-3 p-3 rounded'>
      {/* <Link to={`/product/${product._id}`}>
        <Card.Img src={product.image} variant='top' />
      </Link> */}

      <Card.Body>
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
      </Card.Body>
    </Card>
    );
};

export default GroupCard;