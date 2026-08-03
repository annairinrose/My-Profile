import { Routes, Route } from "react-router-dom";

import Navbar from "./Navbar";
import Home from "./Home";
import About from "./About";
import Skills from "./Skills";
import Projects from "./Projects";
import Contact from "./Contact";
import Login from "./Login";
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Messages from "./table";
import AddSkills from "./addskills";
import AddSkillForm from "./addskillsform";


function App() {
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
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/skills" element={<Skills />} />
        <Route path="/addskills" element={<AddSkills/>}/>
        <Route path="/addskillsform"element={<AddSkillForm/>}/>
        <Route path="/editskill" element={<AddSkillForm />} />
        <Route path="/skillsmanage" element={<AddSkills />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/table" element={<Messages/>}/>
        {!isauthenticated?(
        <Route path="/login" element={<Login/>}/>
        ):null}
      </Routes>
    </>
  );
}

export default App;