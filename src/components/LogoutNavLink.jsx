// src/components/LogoutNavLink.jsx
import { useDispatch } from 'react-redux';
import { logoutUser } from '../store/slices/authSlice';
import { Icon } from '@iconify/react';
import { NavLink, useNavigate } from 'react-router-dom';

const LogoutNavLink = () => {
  const dispatch = useDispatch();
 const navigate = useNavigate();
  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logoutUser())
      .then(() => {
        window.location.href = '/'; // Full reload clears all state
        // navigate('/');
      });
  };

  return (
    <NavLink
      to="#logout" // Prevent actual navigation
      onClick={handleLogout}
    >
      <Icon 
        icon="material-symbols:logout-rounded" 
        className="mr-3" 
        width="24" 
        height="24" 
      />
      <span className="font-medium">Log Out</span>
    </NavLink>
  );
};

export default LogoutNavLink;