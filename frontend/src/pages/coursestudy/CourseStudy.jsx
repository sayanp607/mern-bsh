import React, { useEffect } from "react";
import "./coursestudy.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import { CourseData } from "../../context/CourseContext";
import { server } from "../../main";

const CourseStudy = ({ user }) => {
  const params = useParams();

  const { fetchCourse, course } = CourseData();
  const navigate = useNavigate();

  if (user && user.role !== "admin" && !user.subscription.includes(params.id))
    return navigate("/");

  useEffect(() => {
    fetchCourse(params.id);
  }, []);
  return (
    <>
      {course && (
        <div className="course-study-page">
          <img src={`${server}/${course.image}`} alt="" width={350} />
          <h2>{course.title}</h2>
          <h4>{course.description}</h4>
          <h5>by - {course.createdBy}</h5>
          <h5>Duration - {course.duration} weeks</h5>
          <div className="btnlink">
            <Link to={`/lectures/${course._id}`}>
              <h1>Lectures</h1>
            </Link>
            {/* {user && user.role == "admin" && (
            <Link to={`/createquestion`}>
              <h2>Create Question</h2>
            </Link>
          )}
          {user && user.role == "admin" && (
            <Link to={`/getquestion`}>
              <h2>See Questions</h2>
            </Link>
          )} */}

            {/* <Link to={`/submitanswer`}>
            <h2>submit answer</h2>
          </Link>
          <Link to={`/leaderboard`}>
            <h2>LeaderBoard</h2>
          </Link> */}
            <Link to={`/notes/${course._id}`}>
              <h1>Notes</h1>
            </Link>
            <Link to={`/liveclass`}>
              <h1>Live Class</h1>
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default CourseStudy;
