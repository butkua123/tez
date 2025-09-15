import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const Profile = () => {
    const [user, setUser] = useState(null); // Current user data
    const [houses, setHouses] = useState([]); // User's houses
    const [isEditing, setIsEditing] = useState(false); // Editing profile state
    const [isAddingHouse, setIsAddingHouse] = useState(false); // Adding house state
    const [editFormData, setEditFormData] = useState({
        name: '',
        email: '',
        profilePhoto: ''
    });
    const [houseFormData, setHouseFormData] = useState({
        location: '',
        availabilityStart: '',
        availabilityEnd: '',
        description: '',
        photos: []
    });
    const navigate = useNavigate(); // For redirecting after logout


    useEffect(() => {
        // Fetch user data from localStorage
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            //console.log("Fetched user data:", parsedUser);
            setUser(parsedUser);
            setEditFormData({
                name: parsedUser.name,
                email: parsedUser.email,
                profilePhoto: parsedUser.profilePhoto || ''
            });
            fetchUserHouses(parsedUser.id);
            console.log("Fetched houses:", houses);
        }
    }, []);

    const fetchUserHouses = async (userId) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/houses/user/${userId}`);
            console.log("Fetched houses:", response.data);
            setHouses(Array.isArray(response.data) ? response.data : []); // Ensure it's an array
        } catch (error) {
            console.error("Error fetching user houses:", error);
            setHouses([]); // Set an empty array to prevent errors
        }
    };

    const handleEditFormChange = (e) => {
        const { name, value } = e.target;
        setEditFormData({ ...editFormData, [name]: value });
    };

    const handleUpdateProfile = async () => {
        try {
            const response = await axios.put(`http://localhost:8080/api/users/${user.id}`, editFormData);
            setUser(response.data);
            localStorage.setItem('user', JSON.stringify(response.data));
            alert('Profile updated successfully!');
            setIsEditing(false);
        } catch (error) {
            console.error('Error updating profile:', error);
            alert('Failed to update profile.');
        }
    };

    const handleHouseFormChange = (e) => {
        const { name, value } = e.target;
        setHouseFormData({ ...houseFormData, [name]: value });
    };

    const handleAddHouse = async () => {
        try {
            await axios.post('http://localhost:8080/api/houses', {
                user: { id: user.id }, // User ID from the logged-in user
                location: houseFormData.location,
                availabilityStart: houseFormData.availabilityStart,
                availabilityEnd: houseFormData.availabilityEnd,
                description: houseFormData.description,
                photoUrls: houseFormData.photos // This should be an array of strings (URLs)
            });

            alert('House added successfully!');
            setIsAddingHouse(false); // Close the house form
            fetchUserHouses(user.id); // Refresh house list
        } catch (error) {
            console.error('Error adding house:', error);
            alert('Failed to add house.');
        }
    };

    const handleDeleteHouse = async (houseId) => {
        if (!window.confirm("Are you sure you want to delete this house?")) return;
    
        try {
            await axios.delete(`http://localhost:8080/api/houses/${houseId}`);
            alert("House deleted successfully!");
            setHouses(houses.filter(house => house.id !== houseId)); // Remove house from UI
        } catch (error) {
            console.error("Error deleting house:", error);
            alert("Failed to delete house.");
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("user"); // Clear user data from local storage
        navigate("/login"); // Redirect to login page after logout
    };

    return (
        <div>
            <h1>Profile</h1>
            {user ? (
                <div>
                    <img
                        src={`http://localhost:8080/api/proxy-image?url=${encodeURIComponent(user.profilePhoto)}`} 
                        alt="Profile"
                        style={{ width: '150px', height: '150px', borderRadius: '50%' }}
                    />
                    <h2>{user.name}</h2>
                    <p>{user.email}</p>

                    <button onClick={() => setIsEditing(true)}>Edit Profile</button>    
                    <button onClick={() => setIsAddingHouse(true)}>Open House</button>
                    <button onClick={handleLogout}>Logout</button>
                        
                    <h3>My Open Houses</h3>
                    {Array.isArray(houses) && houses.length > 0 ? (
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
                                                    src={`http://localhost:8080/api/proxy-image?url=${encodeURIComponent(photo.photoUrl)}`}
                                                    alt={`House Photo ${index + 1}`}
                                                    style={{ width: '100px', height: '100px', marginRight: '10px' }}
                                                />
                                            ))}
                                        </div>
                                    )}
                                    <button onClick={() => handleDeleteHouse(house.id)}>Delete</button>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>You have not opened any houses yet.</p>
                    )}

                    {isEditing && (
                        <div style={{ marginTop: '20px' }}>
                            <h3>Edit Profile</h3>
                            <form>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Name"
                                    value={editFormData.name}
                                    onChange={handleEditFormChange}
                                />
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    value={editFormData.email}
                                    onChange={handleEditFormChange}
                                />
                                <input
                                    type="text"
                                    name="profilePhoto"
                                    placeholder="Profile Photo URL"
                                    value={editFormData.profilePhoto}
                                    onChange={handleEditFormChange}
                                />
                                <br />
                                <button type="button" onClick={handleUpdateProfile}>Save</button>
                                <button type="button" onClick={() => setIsEditing(false)}>Cancel</button>
                            </form>
                        </div>
                    )}

                    {isAddingHouse && (
                        <div style={{ marginTop: '20px' }}>
                            <h3>Add House</h3>
                            <form>
                                <input
                                    type="text"
                                    name="location"
                                    placeholder="Location"
                                    value={houseFormData.location}
                                    onChange={handleHouseFormChange}
                                />
                                <input
                                    type="date"
                                    name="availabilityStart"
                                    placeholder="Start Date"
                                    value={houseFormData.availabilityStart}
                                    onChange={handleHouseFormChange}
                                />
                                <input
                                    type="date"
                                    name="availabilityEnd"
                                    placeholder="End Date"
                                    value={houseFormData.availabilityEnd}
                                    onChange={handleHouseFormChange}
                                />
                                <textarea
                                    name="description"
                                    placeholder="Description"
                                    value={houseFormData.description}
                                    onChange={handleHouseFormChange}
                                ></textarea>
                                <input
                                    type="text"
                                    name="photos"
                                    placeholder="Photo URLs (comma-separated)"
                                    value={houseFormData.photos}
                                    onChange={(e) => {
                                        setHouseFormData({
                                            ...houseFormData,
                                            photos: e.target.value.split(',')
                                        });
                                    }}
                                />
                                <br />
                                <button type="button" onClick={handleAddHouse}>Submit</button>
                                <button type="button" onClick={() => setIsAddingHouse(false)}>Cancel</button>
                            </form>
                        </div>
                    )}
                </div>
            ) : (
                <p>Please log in to view your profile.</p>
            )}
        </div>
    );
};

export default Profile;
