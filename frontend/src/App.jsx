import React, { useState } from "react";
import Header from './components/Header';
import { Container } from 'react-bootstrap';
import Footer from './components/Footer';
import { Outlet } from "react-router-dom";
import "./App.css";
import GroupScreen from "./screens/GroupScreen";

export default function App() {
  // latLng represents the latitude and longitude of the location
  const [latLng, setLatLng] = useState(null); // {lat: 12, lng: 333}

  return (
    <div>
      <Header title="Student Interest Groups" />
        <main className='py-3'>
            <Container>
                <Outlet />
            </Container>
        </main>
      <Footer />
    </div>
  );
}
