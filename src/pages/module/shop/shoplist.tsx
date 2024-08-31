import React from 'react'
import { useNavigate } from 'react-router-dom';

function Shoplist() {
  const navigate = useNavigate();
  const isAuthenticated = () => {
    return localStorage.getItem("userinfo") !== null;
  };
  React.useEffect(() => {
    if (!isAuthenticated()) {
      navigate("/login");
    }
  }, [navigate]);
  return (
    <div>Shoplist</div>
  )
}

export default Shoplist