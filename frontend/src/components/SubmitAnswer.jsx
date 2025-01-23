import React, { useEffect, useState } from "react";
import axios from "axios";
import { UserData } from "../context/UserContext";

const SubmitAnswer = () => {
  const [questions, setQuestions] = useState([]);
  const [attemptedAnswers, setAttemptedAnswers] = useState({});
  const [reloadWarning, setReloadWarning] = useState(false); // To track reload warning status
  const { isAuth, user } = UserData(); // Fetching user data and authentication status

  // Fetch all questions on component mount
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:5000/api/questions/all`
        );
        setQuestions(data); // Assuming API returns an array of questions
      } catch (error) {
        console.error("Error fetching questions:", error);
        alert("Could not fetch questions.");
      }
    };

    fetchQuestions();
  }, []);

  // Handle answer submission
  const handleAnswerSubmit = async (questionId, selectedAnswer) => {
    if (!isAuth) {
      alert("You must be logged in to submit an answer.");
      return;
    }

    // Store the answer in the attemptedAnswers state
    setAttemptedAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: selectedAnswer,
    }));

    // If at least one question is attempted, show the reload warning
    if (Object.keys(attemptedAnswers).length === 0) {
      setReloadWarning(true);
    }

    try {
      const token = localStorage.getItem("token"); // Fetch token from local storage
      const { data } = await axios.post(
        `http://localhost:5000/api/user/answer`,
        {
          questionId,
          answer: selectedAnswer, // Send selected answer
        },
        {
          headers: { token }, // Include token in headers
        }
      );
      alert(data.message); // Show feedback from the API
    } catch (error) {
      console.error(
        "Error submitting answer:",
        error.response?.data?.message || error.message
      );
      alert(
        error.response?.data?.message ||
          "An error occurred while submitting the answer."
      );
    }
  };

  // Prevent reload or navigating away once the user has attempted at least one question
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      // If at least one question is attempted, show the warning
      if (reloadWarning) {
        const message =
          "You can no longer answer any questions if you reload or leave the page.";
        e.returnValue = message; // Standard for most browsers
        return message; // For some browsers
      }
    };

    // Show the final warning after the user has attempted a question
    const handleUnload = () => {
      if (reloadWarning) {
        alert("You cannot give any answers after leaving the page.");
        setAttemptedAnswers({}); // Clear attempted answers, as the test is locked
        setReloadWarning(false); // Disable warning once the user has been locked out
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener("unload", handleUnload);

    // Clean up the event listeners
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("unload", handleUnload);
    };
  }, [reloadWarning]);

  return (
    <div>
      <h2>Submit Your Answers</h2>
      {questions.length === 0 ? (
        <p>Loading questions...</p>
      ) : (
        <ul>
          {questions.map((q) => (
            <li key={q._id}>
              <h3>{q.question}</h3>
              <ul>
                {q.options.map((opt, index) => (
                  <li key={index}>
                    <button
                      onClick={() => handleAnswerSubmit(q._id, index)}
                      style={{
                        cursor: "pointer",
                        margin: "5px",
                        padding: "8px",
                        backgroundColor:
                          attemptedAnswers[q._id] === index
                            ? "#d3d3d3"
                            : "#f0f0f0", // Disabled style after clicked
                        border: "1px solid #ccc",
                        borderRadius: "4px",
                      }}
                      disabled={attemptedAnswers[q._id] !== undefined} // Disable button if already clicked
                    >
                      {opt}
                    </button>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SubmitAnswer;
