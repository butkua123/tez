import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Link } from 'react-router';

const HouseDetails = () => {
    const { houseId } = useParams(); // Get houseId from URL parameters
    const [house, setHouse] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchHouseDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/houses/${houseId}`);
                setHouse(response.data);
            } catch (error) {
                console.error("Error fetching house details:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchHouseDetails();
    }, [houseId]);

    if (loading) return <p>Loading house details...</p>;
    if (!house) return <p>House not found.</p>;

    return (
        <div>
            <h1>{house.location}</h1>
            <p>{house.description}</p>
            <p>Available from {house.availabilityStart} to {house.availabilityEnd}</p>
            <Link to={`/profile/${house.user.id}`} style={{ textDecoration: "none", color: "blue" }}>View Host Profile</Link>

            <h3>Photos</h3>
            {house.photos?.length > 0 ? (
                <div>
                    {house.photos.map((photo, index) => (
                        <img 
                            key={index} 
                            src={photo.photoUrl} 
                            alt={`House Photo ${index + 1}`} 
                            style={{ width: "200px", height: "150px", marginRight: "10px" }}
                        />
                    ))}
                </div>
            ) : (
                <p>No photos available</p>
            )}
        </div>
    );
};

export default HouseDetails;
