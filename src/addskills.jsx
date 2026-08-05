import React, { useEffect, useState } from "react";
import "./addskills.css";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "./Config/Config";
import { useNavigate } from "react-router-dom";

function AddSkills() {
  const [skills, setSkills] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getSkills();
  }, []);

  const getSkills = async () => {
    const querySnapshot = await getDocs(collection(db, "skills"));

    const data = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    data.sort((a, b) => a.order - b.order);

    setSkills(data);
  };

  const deleteSkill = async (id) => {
    if (!window.confirm("Delete this skill?")) return;

    await deleteDoc(doc(db, "skills", id));

    getSkills();
  };

  return (
    <div className="skills-container">

      <div className="top-bar">

        <h1>   Skills Management   </h1>
&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;
        <button className="add" onClick={() => navigate("/addskillsform")}>
          Add Skill
        </button>
      </div>

      <table className="tbl" >

        <thead >
          <tr>
            <th>Skill</th>
            <th>Order</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>

          {skills.map((item) => (

            <tr key={item.id}>

              <td>{item.skillname}</td>

              <td>{item.order}</td>

              <td>

               <button
  className="edit-btn"
  onClick={() => navigate(`/editskill`, {state:{
    id: item.id,
    ...item
  }})}
>
  Edit
</button>

                <button
                className="dlt-btn"
                  onClick={() => deleteSkill(item.id)}
                >
                  Delete
                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}

export default AddSkills;