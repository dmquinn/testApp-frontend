import "./SignupPage.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import authService from "../../services/auth.service";
import axios from "axios";

function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [image, setImage] = useState("");

  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleName = (e) => setName(e.target.value);
  const handleImage = (e) => setImage(e.target.files[0]);

  const API_URL = "http://localhost:5005";

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "pgd5xegv");
    data.append("cloud_name", "djiekzsxs");
    fetch("https://api.cloudinary.com/v1_1/djiekzsxs/image/upload", {
      method: "post",
      body: data,
    })
      .then((resp) => {
        return resp.json();
      })
      .then((data) => {
        data && console.log(data.url);
        return data.url;
      })
      .then((img) => {
        const requestBody = { email, password, name, image: img };
        const authToken = localStorage.getItem("authToken");
        console.log(authToken);
        axios
          .post(`${API_URL}/auth/signup`, requestBody, {
            headers: { Authorization: `Bearer ${authToken}` },
          })
          .then((response) => {
            console.log(response);
          });
      });
    // Create an object representing the request body

    // Or using a service
    // authService
    //   .signup(requestBody)
    //   .then((response) => {
    //     // If the POST request is successful redirect to the login page
    //     navigate("/login");
    //   })
    //   .catch((error) => {
    //     // If the request resolves with an error, set the error message in the state
    //     const errorDescription = error.response.data.message;
    //     setErrorMessage(errorDescription);
    //   });
  };

  return (
    <div className="SignupPage">
      <h1>Sign Up</h1>

      <form onSubmit={handleSignupSubmit}>
        <label>Email:</label>
        <input type="email" name="email" value={email} onChange={handleEmail} />

        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={handlePassword}
        />

        <label>Name:</label>
        <input type="text" name="name" value={name} onChange={handleName} />
        <input type="file" name="image" value={""} onChange={handleImage} />
        <button type="submit">Sign Up</button>
      </form>

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <p>Already have account?</p>
      <Link to={"/login"}> Login</Link>
    </div>
  );
}

export default SignupPage;
