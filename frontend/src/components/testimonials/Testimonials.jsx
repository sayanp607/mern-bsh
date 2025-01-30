import React, { useEffect, useRef, useState } from "react";
import "./testimonials.css";

const Testimonials = () => {
  const testimonialsData = [
    {
      id: 1,
      name: "John Doe",
      message:
        "This platform helped me learn so effectively. The courses are amazing and the instructors are top-notch.",
      image:
        "https://th.bing.com/th?q=Current+Bachelor&w=120&h=120&c=1&rs=1&qlt=90&cb=1&dpr=1.3&pid=InlineBlock&mkt=en-IN&cc=IN&setlang=en&adlt=moderate&t=1&mw=247",
    },
    {
      id: 2,
      name: "Jane Smith",
      message:
        "I've learned more here than in any other place. The interactive lessons and quizzes make learning enjoyable.",
      image:
        "https://th.bing.com/th/id/OIP.GKAiW3oc2TWXVEeZAzrWOAHaJF?w=135&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
    },
    {
      id: 3,
      name: "Jane Smith",
      message:
        "I've learned more here than in any other place. The interactive lessons and quizzes make learning enjoyable.",
      image:
        "https://th.bing.com/th/id/OIP.GKAiW3oc2TWXVEeZAzrWOAHaJF?w=135&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
    },
    {
      id: 4,
      name: "Jane Smith",
      message:
        "I've learned more here than in any other place. The interactive lessons and quizzes make learning enjoyable.",
      image:
        "https://th.bing.com/th/id/OIP.GKAiW3oc2TWXVEeZAzrWOAHaJF?w=135&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
    },
    {
      id: 5,
      name: "Jane Smith",
      message:
        "I've learned more here than in any other place. The interactive lessons and quizzes make learning enjoyable.",
      image:
        "https://th.bing.com/th/id/OIP.GKAiW3oc2TWXVEeZAzrWOAHaJF?w=135&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
    },
    {
      id: 6,
      name: "Jane Smith",
      message:
        "I've learned more here than in any other place. The interactive lessons and quizzes make learning enjoyable.",
      image:
        "https://th.bing.com/th/id/OIP.GKAiW3oc2TWXVEeZAzrWOAHaJF?w=135&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
    },
    {
      id: 7,
      name: "Jane Smith",
      message:
        "I've learned more here than in any other place. The interactive lessons and quizzes make learning enjoyable.",
      image:
        "https://th.bing.com/th/id/OIP.GKAiW3oc2TWXVEeZAzrWOAHaJF?w=135&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
    },
    {
      id: 8,
      name: "Jane Smith",
      message:
        "I've learned more here than in any other place. The interactive lessons and quizzes make learning enjoyable.",
      image:
        "https://th.bing.com/th/id/OIP.GKAiW3oc2TWXVEeZAzrWOAHaJF?w=135&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
    },
    // Add more testimonials as needed
  ];

  const scrollRef = useRef(null);
  const colors = ["#ff9a8b", "#fa709a", "#a18cd1", "#fbc2eb", "#f6d365"];
  const [bgColors, setBgColors] = useState(
    testimonialsData.map((_, index) => colors[index % colors.length])
  );

  useEffect(() => {
    let colorIndex = 0;
    const colorInterval = setInterval(() => {
      setBgColors((prevColors) =>
        prevColors.map(
          () => colors[(colorIndex = (colorIndex + 1) % colors.length)]
        )
      );
    }, 2000);

    const scrollContainer = scrollRef.current;
    let scrollInterval;
    const startAutoScroll = () => {
      scrollInterval = setInterval(() => {
        if (scrollContainer) {
          scrollContainer.scrollBy({ left: 50, behavior: "smooth" });
          if (
            scrollContainer.scrollLeft + scrollContainer.offsetWidth >=
            scrollContainer.scrollWidth
          ) {
            scrollContainer.scrollTo({ left: 0, behavior: "smooth" });
          }
        }
      }, 5);
    };

    startAutoScroll();

    return () => {
      clearInterval(colorInterval);
      clearInterval(scrollInterval);
    };
  }, []);

  return (
    <section className="testimonials">
      <h2>What our students say</h2>
      <div className="testimonials-container">
        <div className="testimonials-wrapper" ref={scrollRef}>
          {testimonialsData.map((testimonial, index) => (
            <div
              className="testimonial-card"
              key={testimonial.id}
              style={{ backgroundColor: bgColors[index] }}
            >
              <div className="student-image">
                <img src={testimonial.image} alt={testimonial.name} />
              </div>
              <p className="message">{testimonial.message}</p>
              <div className="info">
                <p className="name">{testimonial.name}</p>
                <p className="position">{testimonial.position}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
