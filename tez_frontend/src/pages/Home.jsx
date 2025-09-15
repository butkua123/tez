import { Box, Typography, Button, TextField } from '@mui/material';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from 'react-router';

const Home = () => {
  const testimonials = [
    { name: "John Doe", photo: "https://via.placeholder.com/100", comment: "Amazing platform for students!" },
    { name: "Jane Smith", photo: "https://via.placeholder.com/100", comment: "Helped me find a place quickly!" },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const [availableHouses, setAvailableHouses] = useState([]);

  const [searchParams, setSearchParams] = useState({
    city: "",
    startDate: "",
    endDate: ""
});

  useEffect(() => {
    const fetchAvailableHouses = async () => {
        try {
            const response = await axios.get("http://localhost:8080/api/houses/available");
            setAvailableHouses(response.data);
        } catch (error) {
            console.error("Error fetching available houses:", error);
        }
    };
    fetchAvailableHouses();
}, []);

    const handleSearch = async () => {
        try {
            const response = await axios.get("http://localhost:8080/api/houses/search", {
                params: {
                    city: searchParams.city,
                    startDate: searchParams.startDate ? searchParams.startDate.toISOString().split('T')[0] : "",
                    endDate: searchParams.endDate ? searchParams.endDate.toISOString().split('T')[0] : ""
                }
            });
            setAvailableHouses(response.data); // Update available houses based on search
        } catch (error) {
            console.error("Error searching houses:", error);
        }
    };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h3" textAlign="center" gutterBottom>Welcome to StudentStay</Typography>
      
      {/* Search Bar */}
        <Box
    sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 2,
        marginTop: 4,
    }}
    >
    {/* Input for City Search */}
    <TextField 
        label="Search Location (City, Country)" 
        variant="outlined" 
        fullWidth 
        sx={{ maxWidth: 500 }} 
        value={searchParams.city} 
        onChange={(e) => setSearchParams({ ...searchParams, city: e.target.value })} 
    />

    {/* DatePicker for Start Date */}
    <DatePicker
        placeholderText="Start Date"
        selected={searchParams.startDate}
        onChange={(date) => setSearchParams({ ...searchParams, startDate: date })}
        isClearable
        wrapperClassName="date-picker"
    />

    {/* DatePicker for End Date */}
    <DatePicker
        placeholderText="End Date"
        selected={searchParams.endDate}
        onChange={(date) => setSearchParams({ ...searchParams, endDate: date })}
        isClearable
        wrapperClassName="date-picker"
    />

    {/* Search Button */}
    <Button variant="contained" color="primary" onClick={handleSearch}>Search</Button>
    </Box>

      {/* Slideshow */}
      <Box sx={{ marginTop: 6 }}>
        <Typography variant="h5" textAlign="center" gutterBottom>User Testimonials</Typography>
        <Slider {...settings}>
          {testimonials.map((item, index) => (
            <Box key={index} sx={{ textAlign: 'center', padding: 3 }}>
              <img
                src={item.photo}
                alt={`${item.name}'s photo`}
                style={{ borderRadius: '50%', width: 100, height: 100 }}
              />
              <Typography variant="body1" gutterBottom>&quot;{item.comment}&quot;</Typography>
              <Typography variant="subtitle2">- {item.name}</Typography>
            </Box>
          ))}
        </Slider>
      </Box>

      <div>
            <h1>Available Houses</h1>
            <div style={{ display: "flex", flexWrap: "wrap" }}>
                {availableHouses.length > 0 ? (
                    availableHouses.map((house) => (
                        <div key={house.id} style={{ border: "1px solid #ccc", padding: "10px", margin: "10px" }}>
                            <h3>{house.location}</h3>
                            <p>Available from {house.availabilityStart} to {house.availabilityEnd}</p>
                            <p>{house.description}</p>
                            
                            {house.photos?.length > 0 && (
                                <img
                                    src={house.photos[0].photoUrl}
                                    alt="House"
                                    style={{ width: "200px", height: "150px" }}
                                />
                            )}
                            <Link to={`/house/${house.id}`}>View Details</Link>
                        </div>
                    ))
                ) : (
                    <p>No available houses at the moment.</p>
                )}
            </div>
        </div>
    </Box>
  );
};

export default Home;
