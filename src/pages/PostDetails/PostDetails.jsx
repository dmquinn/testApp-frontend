import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AddTask from "./components/AddTask";

const PostDetails = () => {
  const [post, setPost] = useState([]);
  const { postId } = useParams();
  const API_URL = "http://localhost:5005";

  const getPost = () =>
    axios.get(`${API_URL}/api/posts/${postId}`).then((response) => {
      setPost(response.data);
    });

  const handleLike = () => {
    axios.post(`${API_URL}/api/posts/${postId}/like`).then((response) => {
      getPost();
    });
  };

  useEffect(() => {
    getPost();
  }, []);

  return (
    <>
      {post && (
        <>
          <h1>{post.title}</h1>
          <h2>{post.description}</h2>
          <h1>Tasks</h1>
          <button onClick={(e) => handleLike(e)}>❤️</button>
          <h1>Likes: {post.likes}</h1>
        </>
      )}
      <AddTask postId={postId} refresh={getPost} />
    </>
  );
};

export default PostDetails;
