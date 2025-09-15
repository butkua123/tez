import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Link } from 'react-router';

const PublicProfile = () => {
    const { userId } = useParams(); // Get userId from URL
    const [user, setUser] = useState(null);
    const [houses, setHouses] = useState([]);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userResponse = await axios.get(`http://localhost:8080/api/users/${userId}`);
                setUser(userResponse.data);

                const housesResponse = await axios.get(`http://localhost:8080/api/houses/user/${userId}`);
                setHouses(housesResponse.data);
            } catch (error) {
                console.error("Error fetching user profile:", error);
            }
        };

        fetchUserData();
    }, [userId]);

    return (
        <div>
            {user ? (
                <div>
                    <img
                        src={`http://localhost:8080/api/proxy-image?url=${encodeURIComponent(user.profilePhoto)}`}
                        alt="Profile"
                        style={{ width: '150px', height: '150px', borderRadius: '50%' }}
                    />
                    <h2>{user.name}</h2>
                    <h3>Open Houses</h3>

                    {houses.length > 0 ? (
                        <ul>
                            {houses.map((house) => (
                                <li key={house.id} style={{ marginBottom: '20px' }}>
                                    <h4>{house.location}</h4>
                                    <p>{house.description}</p>
                                    <p>
                                        Available from {house.availabilityStart} to {house.availabilityEnd}
                                    </p>
                                    {house.photos?.length > 0 && (
                                        <div>
                                            {house.photos.map((photo, index) => (
                                                <img
                                                    key={index}
                                                    src={photo.photoUrl}
                                                    alt={`House Photo ${index + 1}`}
                                                    style={{ width: '100px', height: '100px', marginRight: '10px' }}
                                                />
                                            ))}
                                        </div>
                                    )}
                                    <Link to={`/house/${house.id}`}>View Details</Link>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>This user has not opened any houses yet.</p>
                    )}
                </div>
            ) : (
                <p>Loading user profile...</p>
            )}
        </div>
    );
};

export default PublicProfile;
