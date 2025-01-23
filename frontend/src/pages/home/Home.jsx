import React from "react";
import { useNavigate } from "react-router-dom";
import "./home.css";
import Testimonials from "../../components/testimonials/Testimonials";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div>
      <Testimonials />
      <div className="home">
        <div className="home-content">
          <h1>Welcome to Bong Study Hub</h1>
          <h3>Learn, Grow, Excel</h3>
          <button onClick={() => navigate("/courses")} className="common-btn">
            Check Courses
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
