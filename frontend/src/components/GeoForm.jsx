import React, { useState } from "react";

const apiUrl =
  "https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyCAUphBTKR28ZDZjYGys_NXANgx4uw5tPo";

export default function GeoForm({ setLatLng }) {
  // city represents the city name entered by the user in the form below
  const [city, setCity] = useState("");

  const getLatLng = (city) => {
    // fetch the latitude and longitude of the city using the google maps api
    fetch(`${apiUrl}&address=${city}`)
      .then((res) => res.json())
      .then((response) => {
        const { lat, lng } = response.results[0].geometry.location;
        // update the state with the latitude and longitude, this will trigger a re-render
        setLatLng({ lat, lng });
      });
  };

  function handleSubmit(e) {
    e.preventDefault();
    // call the getLatLng function with the city name entered by the user
    getLatLng(city);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
    </form>
  );
}
