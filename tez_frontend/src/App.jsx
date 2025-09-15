import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile.jsx';
import HouseDetails from "./pages/HouseDetails";
import PublicProfile from "./pages/PublicProfile";

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/house/:houseId" element={<HouseDetails />} /> {/* New route */}
        <Route path="/profile/:userId" element={<PublicProfile />} />
      </Routes>
    </div>
  );
};

export default App;
