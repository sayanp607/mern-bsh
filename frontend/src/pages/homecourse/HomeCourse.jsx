import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./homecourse.css";
import { CourseData } from "../../context/CourseContext";
import CourseCard from "../../components/coursecard/CourseCard";

const HomeCourse = () => {
  const { courses } = CourseData();

  const settings = {
    dots: true,
    infinite: true, // Prevents infinite scrolling issues
    speed: 500,
    slidesToShow: 3, // Show 3 courses on large screens
    slidesToScroll: 1,
    centerMode: false, // Ensures courses are centered
    centerPadding: "0px", // No unnecessary padding
    adaptiveHeight: true, // Fix for cut-off courses
    responsive: [
      {
        breakpoint: 1024, // For tablets
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          centerMode: false, // Prevent unnecessary side movement
        },
      },
      {
        breakpoint: 768, // For mobile devices
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: true, // Keep course centered
        },
      },
    ],
  };

  return (
    <div className="home-course">
      <h2 className="course-title">Our Courses</h2>
      <Slider {...settings}>
        {courses && courses.length > 0 ? (
          courses.map((course) => (
            <div key={course._id} className="course-slide">
              <CourseCard course={course} />
            </div>
          ))
        ) : (
          <p>No Courses Available</p>
        )}
      </Slider>
    </div>
  );
};

export default HomeCourse;
