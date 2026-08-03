import React, { useEffect, useState } from "react";
import "./table.css";
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import { db } from "./Config/Config";

function Messages() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    getMessages();
  }, []);

  const getMessages = async () => {
    try {
        const  Ref=collection(db,"messages")
        const q=query(Ref,orderBy("date","desc"),limit(50))
      const querySnapshot = await getDocs(q);

      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setMessages(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="messages-container">
      <h1>Contact Messages</h1>

      <table>
        <thead>
          <tr>
            <th>Serial No</th>
            <th>Name</th>
            <th>Email</th>
            <th>Message</th>
            <th>Date</th>
          </tr>
        </thead>

        <tbody>
          {messages.map((item, index) => (
            <tr>
              <td>{index + 1}</td>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{item.message}</td>
              <td>
                {item.date?.seconds
                  ? new Date(item.date.seconds * 1000).toLocaleDateString()
                  : ""}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Messages;