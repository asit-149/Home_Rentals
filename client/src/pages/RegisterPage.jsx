import React, { useState, useEffect } from 'react';
import '../styles/Register.scss';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    profileImage: null
  });

  const [passwordMatch, setPasswordMatch] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setPasswordMatch(formData.password === formData.confirmPassword || formData.confirmPassword === "");
  }, [formData.password, formData.confirmPassword]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: name === "profileImage" ? files[0] : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const register_form = new FormData();

      for (let key in formData) {
        if (formData[key] !== null) { // Avoid appending null values
          register_form.append(key, formData[key]);
        }
      }

      const response = await fetch("http://localhost:3001/auth/register", {
        method: "POST",
        body: register_form
      });

      if (response.ok) {
        navigate("/login");
      } else {
        console.log("Registration failed: ", response.statusText);
      }
    } catch (err) {
      console.log("Registration failed", err.message);
    }
  };

  return (
    <div className='register'>
      <div className="register_content">
        <form className="register_content_form" onSubmit={handleSubmit}>
          <input
            onChange={handleChange}
            type="text"
            value={formData.firstName}
            placeholder='First Name'
            name='firstName'
            required
          />
          <input
            onChange={handleChange}
            type="text"
            value={formData.lastName}
            placeholder='Last Name'
            name='lastName'
            required
          />
          <input
            onChange={handleChange}
            type="email"
            value={formData.email}
            placeholder='Email'
            name='email'
            required
          />
          <input
            onChange={handleChange}
            type="password"
            value={formData.password}
            placeholder='Password'
            name='password'
            required
          />
          <input
            onChange={handleChange}
            type="password"
            value={formData.confirmPassword}
            placeholder='Confirm Password'
            name='confirmPassword'
            required
          />
          {!passwordMatch && (
            <p style={{ color: "red" }}>Passwords do not match!</p>
          )}
          <input
            id='image'
            type="file"
            name='profileImage'
            accept='image/*'
            onChange={handleChange}
            style={{ display: "none" }}
          />
          <label htmlFor='image'>
            <img src="/assets/addImage.png" alt="add profile image" />
            Upload Profile Photo
          </label>
          {formData.profileImage && (
            <img
              src={URL.createObjectURL(formData.profileImage)}
              alt='profile preview'
              style={{ maxWidth: '80px' }}
            />
          )}
          <button type='submit' disabled={!passwordMatch}>REGISTER</button>
        </form>
        <a href="/login">Already have an account? login</a>
      </div>
    </div>
  );
};

export default RegisterPage;
