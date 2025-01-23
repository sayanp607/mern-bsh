import React, { useState } from "react";
import axios from "axios";

const CreateQuestion = () => {
  const [form, setForm] = useState({
    question: "",
    options: ["", "", "", ""],
    correctOption: 0,
  });

  const handleChange = (e, index = null) => {
    if (index !== null) {
      const newOptions = [...form.options];
      newOptions[index] = e.target.value;
      setForm({ ...form, options: newOptions });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:5000/api/questions/create`, form);
      alert("Question created successfully!");
    } catch (error) {
      console.error("Error creating question:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create Question</h2>
      <label>
        Question:
        <input name="question" value={form.question} onChange={handleChange} />
      </label>
      <h3>Options:</h3>
      {form.options.map((opt, index) => (
        <label key={index}>
          Option {index + 1}:
          <input value={opt} onChange={(e) => handleChange(e, index)} />
        </label>
      ))}
      <label>
        Correct Option (0-3):
        <input
          name="correctOption"
          value={form.correctOption}
          onChange={handleChange}
        />
      </label>
      <button type="submit">Create Question</button>
    </form>
  );
};

export default CreateQuestion;
