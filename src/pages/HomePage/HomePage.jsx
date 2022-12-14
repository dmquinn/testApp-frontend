import { Table } from "antd";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Chat from "../../components/Chat/Chat";
import Tab from "../../components/Table";
import { AuthContext } from "../../context/auth.context";

import "./HomePage.css";

function HomePage() {
  const { user } = useContext(AuthContext);

  user && console.log(user._id);

  const [showChat, setShowChat] = useState(false);
  const [users, setUsers] = useState([]);
  const [chatPartner, setChatPartner] = useState("");

  const API_URL = "http://localhost:5005";

  const getUsers = () =>
    axios.get(`${API_URL}/api/users/`).then((response) => {
      setUsers(response.data);
    });
  useEffect(() => {
    getUsers();
  }, []);
  return (
    <div className="homePage">
      <Link to="/posts">projects</Link>
      {/* <Tab /> */}
      <button
        className={showChat ? "chatButtonHide" : "chatButton"}
        onClick={() => setShowChat(!showChat)}
      >
        CHAT
      </button>
      <Chat showChat={showChat} chatPartner={chatPartner} />
    </div>
  );
}

export default HomePage;
