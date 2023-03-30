import './App.css';
import React, {useState} from "react";
import axios from "axios";

function App() {
  const [formData, setFormData] = useState({
    firstName:"",
    lastName: "",
    email : "",
    password: ""
  })

  const [errors, setErros] = useState({});
  const [message, setMessage]= useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    //FORM VALIDATION

    let errors = {};
    if (!formData.firstName?.trim()){
      errors.firstName = "First Name is must";
    }
    if (!formData.lastName?.trim()){
      errors.lastName = "Last Name is must";
    }
    if (!formData.email?.trim()){
      errors.email = "First Name is must";
    }else if(!/\s+@(\s+).\s+/.test(formData.email)){
      errors.email = "Email is invlid";
    }
    if (!formData.password?.trim()){
      errors.password = "Password Name is must"
    }

    if (Object.keys(errors).length > 0){
      setErros(errors);
      return;
    }

    //send POST request to backend 

    axios.post("https://example.com/api/users", formData)
      .then(response => {
        console.log(response);

        //reser form data after submission

        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          password:""        
        });
        setMessage("User created sucessfully");
      })
      .catch(error => {
        console.error(error);
        setMessage("User create is failed")
      });

  };

  const handleChange= (event) => {
    const {name, value} = event.target;
    setFormData(prevState => ({...prevState, [name]: value}));
    setErros(prevState => ({...prevState, [name]: " "}));
  }

  return (
    <div className='form-container'>
    {message && <div>{message}</div>}
    <form onSubmit={handleSubmit}>
      <label htmlFor='firstName'> First Name:</label>
      <input type='text' id='firstName' name='firstName' value={formData.firstName} onChange={handleChange} />
      {errors.firstName && <div>{errors.firstName}</div>}

      <label htmlFor='lasttName'> Last Name:</label>
      <input type='text' id='lastName' name='lastName' value={formData.lastName} onChange={handleChange} />
      {errors.lastName && <div>{errors.lastName}</div>}

      <label htmlFor='email' >Email:</label>
      <input type='email' id='email' name='email' value={formData.email} onChange={handleChange} />
      {errors.email && <div>{errors.email}</div>}

      <label htmlFor='password'> Password:</label>
      <input type='password' id='password' name='password' value={formData.password} onChange={handleChange} />
      {errors.password && <div>{errors.password}</div>}

      <button type='submit'>Submit</button>

   </form>
   </div>
  );
}

export default App;
