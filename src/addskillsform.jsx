import React, {  useEffect, useState } from "react";
import "./addskillsform.css";
import { db } from "./Config/Config";
import {
  addDoc,
  collection,
  doc,
  updateDoc,
} from "firebase/firestore";
import { useLocation, useNavigate } from "react-router-dom";

function AddSkillForm() {
  const [skillname, setSkillname] = useState("");
  const [order, setOrder] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

useEffect(()=>{
  if(!location.state) return
    setSkillname(location.state.skillname);
    setOrder(location.state.order)
},[location])



  const saveSkill = async (e) => {
    e.preventDefault();
    if(location.state) {
    updateDoc(doc(db,"skills",location.state.id),{
        skillname: skillname,
        order:order
    });
  } else {
    addDoc(collection(db,"skills"),{
       skillname: skillname,
        order:order
    })
  }
    navigate("/addskills")
  };

  return (
  <div className="skill-form-container">
    
    <h1>{location.state ? "Edit Skill" : "Add Skill"}</h1>

    <form className="skill-form" onSubmit={saveSkill}>

      <label>Skill Name</label>

      <input
        type="text"
        placeholder="Enter Skill Name"
        value={skillname}
        onChange={(e) => setSkillname(e.target.value)}
      />

      <label>Order</label>

      <input
        type="number"
        placeholder="Enter Order"
        value={order}
        onChange={(e) => setOrder(e.target.value)}
      />

      <button type="submit">
        {location.state ? "Update Skill" : "Save Skill"}
      </button>

    </form>

  </div>
);
}

export default AddSkillForm;