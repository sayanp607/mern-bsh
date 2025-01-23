import React, { useEffect, useState } from "react";
import "./coursedescription.css";
import { useNavigate, useParams } from "react-router-dom";
import { CourseData } from "../../context/CourseContext";
import { server } from "../../main";
import axios from "axios";
import toast from "react-hot-toast";
import { UserData } from "../../context/UserContext";
import Loading from "../../components/loading/Loading";

const CourseDescription = ({ user }) => {
  const params = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("overview"); // State to track active tab

  const { fetchUser } = UserData();
  const { fetchCourse, course, fetchCourses, fetchMyCourse } = CourseData();

  useEffect(() => {
    fetchCourse(params.id);
  }, []);

  const checkoutHandler = async () => {
    const token = localStorage.getItem("token");
    setLoading(true);

    const {
      data: { order },
    } = await axios.post(
      `${server}/api/course/checkout/${params.id}`,
      {},
      {
        headers: {
          token,
        },
      }
    );

    const options = {
      key: "rzp_test_W4QHp3KSrawzYv",
      amount: order.id,
      currency: "INR",
      name: "Bong Study Hub",
      description: "Learn with us",
      order_id: order.id,
      handler: async function (response) {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
          response;

        try {
          const { data } = await axios.post(
            `${server}/api/verification/${params.id}`,
            {
              razorpay_order_id,
              razorpay_payment_id,
              razorpay_signature,
            },
            {
              headers: {
                token,
              },
            }
          );

          await fetchUser();
          await fetchCourses();
          await fetchMyCourse();
          toast.success(data.message);
          setLoading(false);
          navigate(`/payment-success/${razorpay_payment_id}`);
        } catch (error) {
          toast.error(error.response.data.message);
          setLoading(false);
        }
      },
      theme: {
        color: "#8a4baf",
      },
    };
    const razorpay = new window.Razorpay(options);
    razorpay.open();
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <form className="formcourse">
            {course && (
              <div className="course-description">
                <div className="course-header">
                  <img
                    src={`${server}/${course.image}`}
                    alt=""
                    className="course-image"
                  />
                  <div className="course-info">
                    <h2>{course.title}</h2>
                    <p>Instructor: {course.createdBy}</p>
                    <p>Duration: {course.duration} weeks</p>
                  </div>
                </div>

                <p>{course.description}</p>
                <p>Let's get started with course At ₹{course.price}</p>

                {user && user.subscription.includes(course._id) ? (
                  <button
                    onClick={() => navigate(`/course/study/${course._id}`)}
                    className="common-btn"
                  >
                    Study
                  </button>
                ) : (
                  <button onClick={checkoutHandler} className="common-btn">
                    Buy Now
                  </button>
                )}
              </div>
            )}
          </form>

          {/* Section with tabs */}
          <div className="tab-section">
            <div className="tab-buttons">
              <button
                className={activeTab === "overview" ? "active-tab" : ""}
                onClick={() => setActiveTab("overview")}
              >
                Overview
              </button>
              <button
                className={activeTab === "demo" ? "active-tab" : ""}
                onClick={() => setActiveTab("demo")}
              >
                Demo
              </button>
            </div>

            <div className="tab-content">
              {activeTab === "overview" && (
                <div className="tab-content">
                  <div className="overview-section">
                    <div className="video-container">
                      <iframe
                        src="/vdo.mp4"
                        title="Course Overview"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    </div>
                    <div className="overview-text">
                      <h3>About the Course</h3>
                      <p>
                        Welcome to the course! In this section, you'll find an
                        introduction to what you'll be learning. This course
                        covers all the basics and advanced topics to help you
                        achieve mastery. Start your journey today!
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "demo" && (
                <div className="demo-content">
                  <h3>Demo Content</h3>
                  <p>Some demo lectures of this course.</p>
                  <iframe
                    src="/vdo.mp4"
                    title="Course Overview"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default CourseDescription;
