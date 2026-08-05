import { useState, useEffect } from "react";
import "./App.css";
import { getAuth } from "firebase/auth";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getDoc,doc, setDoc } from "firebase/firestore";
import { storage, db, auth } from "./Config/Config";


function Home() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [profileImage, setProfileImage] = useState(
  "https://i.pinimg.com/736x/c9/0f/1a/c90f1a58fd9a373d7fddbf339aefb8f5.jpg"
);

useEffect(() => {
  const loadProfileImage = async () => {
 

    const docRef = doc(db, "profile", "profile_image");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setProfileImage(docSnap.data().img_url);
    }
  };

  loadProfileImage();
}, []);

  const uploadProfileImage = async (file) => {
  try {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      alert("Please login first.");
      return;
    }

    const uid = user.uid;

    const storageRef = ref(storage, `profile_images/${uid}`);

    await uploadBytes(storageRef, file);

    const imageUrl = await getDownloadURL(storageRef);

    await setDoc(doc(db, "profile", "profile_image"), {
      img_url: imageUrl,
    }, {merge: true});

    // Update the image on the page immediately
    setProfileImage(imageUrl);

    console.log("Profile image updated successfully!");
  } catch (error) {
    console.error(error);
  }
};


  const handleSubmit = (e) => {
    e.preventDefault();

    localStorage.setItem("name", name);
    localStorage.setItem("email", email);
    localStorage.setItem("message", message);

    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Message:", message);

    alert("Form submitted successfully!");

    setName("");
    setEmail("");
    setMessage("");
  };


  return (
    <div className="container">
      
      {/* Home */}
      <section id="home" className="section">
        <div className="profile">
         <img
  src={profileImage}
  alt="Anna Irin Rose"
/>
{auth.currentUser?(
          <input
  type="file"
  accept="image/*"
  onChange={(e) => {
    const file = e.target.files[0];
    if (file) {
      uploadProfileImage(file);
    }
  }}
/>):null}
        </div>

        <h2>Hello, I'm Anna Irin Rose</h2>

        <p>
          BCA Student | Aspiring Web Developer | Aspiring Data Analyst
          <br /><br />
          I am a third-year (5th Semester) BCA student at Nilgiri College of Arts and Science (Autonomous). I am passionate about learning new technologies and building projects that help me improve my programming skills.
        </p>
      </section>

      {/* About */}
      <section id="about" className="section">
        <h2>About Me</h2>

        <p>
          I have a strong interest in technology and enjoy learning through
          hands-on projects. As a beginner programmer, I am constantly improving
          my skills by exploring programming languages, web development, and
          data analytics.
          I enjoy solving problems, experimenting with new ideas, and turning
          concepts into simple, functional applications.
          Outside of academics, I believe in continuous self-improvement,
          teamwork, and adapting to new challenges. My goal is to build a
          successful career where I can contribute as both a Web Developer and a
          Data Analyst while continuing to learn and grow.
        </p>
      </section>

      {/* Skills */}
      <section id="skills" className="section">
        <h2>Skills</h2>

        <div className="skills">
          <span>HTML</span>
          <span>CSS</span>
          <span>Linux</span>
          <span>Java</span>
          <span>Python</span>
          <span>C</span>
          <span>C++</span>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="section">
        <h2>Projects</h2>

        <div className="pct-crd">
          <h3>GooLite</h3>
          <p>A Mini College Search Engine.</p>
        </div>

        <div className="pct-crd">
          <h3>Traffic Prediction</h3>
          <p>Machine Learning Project using Python.</p>
        </div>
      </section>

      {/* Download Button */}
      <div className="button-container">
        <a href="/Anna_Irin_Rose_Portfolio.pdf" download>
          <button className="download-btn">
            Download Portfolio
          </button>
        </a>
      </div>

      {/* Contact */}
      <section id="contact" className="section">
        <h2>Contact</h2>
        <p>Email: annairinrose@gmail.com</p>
      </section>

      {/* Contact Form */}
      <section className="section">
  <h2>Contact Me</h2>

  <form className="contact-form" onSubmit={handleSubmit}>
    <input
      type="text"
      placeholder="Your Name"
      value={name}
      required
      onChange={(e) => setName(e.target.value)}
    />

    <input
      type="email"
      placeholder="Your Email"
      value={email}
      required
      onChange={(e) => setEmail(e.target.value)}
    />

    <textarea
      placeholder="Enter your message"
      value={message}
      rows="6"
      onChange={(e) => setMessage(e.target.value)}
    />

    <button className="submit-btn">Send Message</button>
  </form>
</section>

      {/* Footer */}
      <footer >
        <p style={{color:'white'}}>© 2026 Anna. All Rights Reserved.</p>
      </footer>

    </div>
  );
}

export default Home;