
import React,{ useState, useEffect} from 'react';
import "./Contact.css";
import { collection, addDoc ,getDocs} from "firebase/firestore";
import {db} from "./Config/Config";


export default function Contact()  {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  useEffect(()=>{
    fetchMessages();
  },[]);

const fetchMessages = async () => {
const querySnapshot = await getDocs(collection(db, "messages"));

console.log("Number of documents:", querySnapshot.size);

querySnapshot.forEach((doc) => {
  console.log(doc.id, doc.data());
});
} 
const handleSubmit = async (e) => {
  e.preventDefault();

  const now = new Date();

 
  try {
  const docRef = await addDoc(collection(db, "messages"), {
    name: name,
      email: email,
      message: message,
      date: now,
  });
  console.log("Document written with ID: ", docRef.id);
} catch (e) {
  console.error("Error adding document: ", e);
}
};


  return (
      <section className="contact">
      <h2>Conatct Me</h2>

      <div className="contact-container">
        <form onSubmit={handleSubmit} className="contact-form">

          <input
            type="text"
            placeholder="Your Name"
            required
            value={name}
            onChange={(e)=> setName(e.target.value)}
          />

          <input
            type="email"
            placeholder="Your Email"
            required
            value={email}
            onChange={(e)=> setEmail(e.target.value)}
          />

          <textarea
            rows="6"
            placeholder="Your Message"
            required
            value={message}
            onChange={(e)=> setMessage(e.target.value)}
          ></textarea>

          <button type="submit">Send Message</button>

        </form>

        <div className="contact-info">
          <h2>Conatct Me</h2>

          <p> Email: annairinrose@gmail.com</p>

          <p> Phone: +91 8590398563</p>

          <p> Location: Kerala, India</p>

          
        </div>

      </div>
    </section>
   
  )
}
