import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useEffect, useState } from "react";

function Navbar() {
  const [isauthenticated,setisauthenticated]=useState(false);
    const auth = getAuth();
    useEffect(()=>{
  onAuthStateChanged(auth, (user) => {
    if (user) {
      setisauthenticated(true)
      const uid = user.uid;
      console.log(uid)
      // ...
    } else {
      setisauthenticated(false)
    }
  });
    },[auth])
  const navigate = useNavigate();
  const handleLogOut = ()=>{
    signOut(auth)
    .then(()=>{
      navigate("/");
    })
    .catch((error)=>{
      console.log(error);
    })

  }
  return (
    <>
    <nav className="navbar">
      <div className="logo">
        Anna<span></span>
      </div>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/skills">Skills</Link>
        <Link to="/projects">Projects</Link>
        <Link to="/contact">Contact</Link>
        {isauthenticated && (
        <>
          <Link to="/table">Messages</Link>
          <Link to="/addskills">Add Skills</Link>
        </>
        )}
        {isauthenticated ?(
          <li onClick={handleLogOut}>LogOut</li>
        ):(
          <li onClick={() => navigate("/login")}>Login</li>
        )}
      </div>
    </nav>
    </>
  );
}

export default Navbar;