import React, { useState, useEffect } from "react";
import "./App.css";
import "./Projects.css";
import { collection,getDocs,addDoc,updateDoc,deleteDoc,doc } from "firebase/firestore";
import {auth, db} from "./Config/Config"

export default function Projects() {
  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");

  const [projects, setProjects] = useState([]);
  const [editId, setEditId] = useState(null);

  useEffect(() => { 
    fetchProjects();
  }, []);

  // Fetch Projects
  const fetchProjects = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "Projects"));

      const data = querySnapshot.docs.map((document) => ({
        id: document.id,
        ...document.data(),
      }));

      setProjects(data);
    } catch (error) {
      console.log(error);
    }
  };

  // Add / Update
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!projectName || !description) {
      alert("Please fill all fields");
      return;
    }

    try {
      if (editId) {
        await updateDoc(doc(db, "Projects", editId), {
          projectName,
          description,
        });

        alert("Project Updated Successfully");
      } else {
        await addDoc(collection(db, "Projects"), {
          projectName,
          description,
        });

        alert("Project Added Successfully");
      }

      setProjectName("");
      setDescription("");
      setEditId(null);

      fetchProjects();
    } catch (error) {
      console.log(error);
    }
  };

  // Edit
  const handleEdit = (item) => {
    setProjectName(item.projectName);
    setDescription(item.description);
    setEditId(item.id);
  };

  // Delete
  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "Projects", id));
      alert("Project Deleted Successfully");
      fetchProjects();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="projects">
      <h2>My Projects</h2>
{auth.currentUser?(
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Project Name"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
        />

        <textarea
          placeholder="Project Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button className="btn" type="submit">
          {editId ? "Update Project" : "Add Project"}
        </button>

      </form>
):null}

      <h3 className="list_hd">Project List</h3>


      <table className="project-card">
        <thead>
          <tr>
            <th>No.</th>
            <th>Project Name</th>
            <th>Description</th>
          </tr>
        </thead>

        <tbody>
          {projects.length === 0 ? (
            <tr>
              <td colSpan="5">No Projects Added</td>
            </tr>
          ) : (
            projects.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>{item.projectName}</td>
                <td>{item.description}</td>
{auth.currentUser?(
                <td>
                  <button
                    type="button"
                    className="btn"
                    onClick={() => handleEdit(item)}
                  >
                    Edit
                  </button>
                </td>
):null}
{auth.currentUser?(
                <td>
                  <button
                    type="button"
                    className="btn"
                    onClick={() => handleDelete(item.id)}
                  >
                    Delete
                  </button>
                </td>
):null}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </section>
  );
}