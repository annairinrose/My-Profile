import "./App.css";
import "./About.css";
import React, {  useEffect, useState } from "react";
import {auth, db} from "./Config/Config";
import {
  getDoc,
  addDoc,
  collection,
  doc,
  updateDoc,
} from "firebase/firestore";

export default function About() {
  const [originalAbout, setOriginalAbout] = useState("");
  const [editing, setEditing] = useState(false);
  const [about, setAbout] = useState(
    "I have a strong interest in technology and enjoy learning through hands-on projects. As a beginner programmer, I am constantly improving my skills by exploring programming languages, web development, and data analytics. I enjoy solving problems, experimenting with new ideas, and turning concepts into simple, functional applications. Every project I complete helps me gain confidence and motivates me to keep learning. Outside of academics, I believe in continuous self-improvement, teamwork, and adapting to new challenges. My goal is to build a successful career where I can contribute as both a Web Developer and a Data Analyst while continuing to learn and grow."
  );

  const [docId, setDocId] = useState("");

  useEffect(() => {
    fetchAbout();
  }, []);

  const fetchAbout = async () => {
    try {
      const querySnapshot = await getDoc(collection(db, "about"));

      if (!querySnapshot.empty) {
        const document = querySnapshot.docs[0];
        setDocId(document.id);
        setAbout(document.data().about);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSave = async () => {
    try {
      if (docId) {
        // Update existing document
        await updateDoc(doc(db, "about", docId), {
          about: about,
        });

        alert("About Updated Successfully");
      } else {
        // Add new document
        const docRef = await addDoc(collection(db, "about"), {
          about: about,
        });

        setDocId(docRef.id);

        alert("About Added Successfully");
      }

      setEditing(false);
      fetchAbout();
    } catch (error) {
      console.log(error);
      alert(error.message);
    }
  };
         

  return (
    <div className="page">
      <h2>ABOUT ME</h2>
      {editing ? (
        <>
          <textarea
            rows="6"
            cols="60"
            value={about}
            onChange={(e) => setAbout(e.target.value)}
          />

          <br />
          <br />

          <button className="btn" onClick={handleSave}>Save</button>

        <button
  type="button"
  className="btn"
  onClick={() => {
    setAbout(originalAbout);
    setEditing(false);
  }}
  style={{ marginLeft: "10px" }}
>
  Cancel
</button>
        </>
      ) : (
        <>
          <p>{about}</p>
{auth.currentUser?(
         <button
  className="btn"
  onClick={() => {
    setOriginalAbout(about);
    setEditing(true);
  }}
>
Edit
</button>):null}
        </>
      )}
    </div>
  );
}