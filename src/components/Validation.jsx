import React, { useState } from "react";

function FormValidation() {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const validate = () => {
    const newErrors = {};

    if (!values.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!values.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      newErrors.email = "Email is not valid";
    }

    if (values.password.length < 6) {
      newErrors.password = "Password must be 6+ characters";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      alert("Form submitted successfully");
      console.log(values);
    }
  };

return (
  <div className="flex items-center justify-center bg-black px-4 ">
    <form
      onSubmit={handleSubmit}
      className="w-full mt-10 max-w-sm bg-[#111] p-8 rounded-xl shadow-lg border border-gray-700 mb-30"
    >
      <h3 className="text-center text-2xl font-semibold text-white mb-6 tracking-wide">
        Sign in Free
      </h3>

      {/* NAME */}
      <label className="text-gray-300 text-sm">Name</label>
      <input
        name="name"
        value={values.name}
        onChange={handleChange}
        placeholder="Enter your name"
        type="text"
        className="w-full mt-1 mb-2 p-3 rounded-md bg-black border border-gray-600 text-white focus:border-white focus:outline-none"
      />
      <p className="text-red-500 text-sm mb-3">{errors.name}</p>

      {/* EMAIL */}
      <label className="text-gray-300 text-sm">Email</label>
      <input
        name="email"
        value={values.email}
        onChange={handleChange}
        placeholder="Enter your email"
        type="email"
        className="w-full mt-1 mb-2 p-3 rounded-md bg-black border border-gray-600 text-white focus:border-white focus:outline-none"
      />
      <p className="text-red-500 text-sm mb-3">{errors.email}</p>

      {/* PASSWORD */}
      <label className="text-gray-300 text-sm">Password</label>
      <input
        name="password"
        value={values.password}
        onChange={handleChange}
        placeholder="Password"
        type="password"
        className="w-full mt-1 mb-2 p-3 rounded-md bg-black border border-gray-600 text-white focus:border-white focus:outline-none"
      />
      <p className="text-red-500 text-sm mb-4">{errors.password}</p>

      <button
        className="w-full py-3 mt-2 bg-white text-black font-semibold rounded-md hover:bg-gray-300 transition-all"
        type="submit"
      >
        Submit
      </button>
    </form>
  </div>
);
}


export default FormValidation
