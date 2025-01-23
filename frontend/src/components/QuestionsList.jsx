import React, { useEffect, useState } from "react";
import axios from "axios";

const QuestionsList = () => {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:5000/api/questions/all`
        );
        setQuestions(data);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    fetchQuestions();
  }, []);

  return (
    <div>
      <h2>Questions</h2>
      <ul>
        {questions.map((q) => (
          <li key={q._id}>
            {q.question}
            <ul>
              {q.options.map((opt, index) => (
                <li key={index}>{opt}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuestionsList;
