import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Header from "./components/header/Header";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Verify from "./pages/auth/Verify";
import Footer from "./components/footer/Footer";
import About from "./pages/about/About";
import Account from "./pages/account/Account";
import { UserData } from "./context/UserContext";
import Loading from "./components/loading/Loading";
import Courses from "./pages/courses/Courses";
import CourseDescription from "./pages/coursedescription/CourseDescription";
import PaymentSuccess from "./pages/paymentsuccess/PaymentSuccess";
import Dashboard from "./pages/dashboard/Dashboard";
import CourseStudy from "./pages/coursestudy/CourseStudy";
import Lecture from "./pages/lecture/Lecture";
import AdminDashboard from "./admin/Dashboard/AdminDashboard";
import AdminCourses from "./admin/Courses/AdminCourses";
import AdminUsers from "./admin/Users/AdminUsers";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";
import Terms from "./pages/Terms/Terms";
import Privacy from "./pages/privacy/Privacy";
import RefundPolicy from "./pages/refund/Refund";
import Contact from "./pages/contact/Contact";
import Notes from "./pages/notes/Notes";
import CreateQuestion from "./components/CreateQuestion";
import QuestionsList from "./components/QuestionsList";
import SubmitAnswer from "./components/SubmitAnswer";
import Leaderboard from "./components/Leaderboard";
import LiveClass from "./pages/liveclass/LiveClass";
import Notification from "./pages/notification/Notification";
import Test from "./pages/test/Test";
import Contactus from "./pages/contactus/Contactus";
const App = () => {
  const { isAuth, user, loading } = UserData();
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <BrowserRouter>
          <Header isAuth={isAuth} user={user}/>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/about" element={<About />} />
            <Route path="/contactus" element={<Contactus />} />
            <Route path="/sendmail" element={<Notification />} />
            <Route path="/createquestion" element={<CreateQuestion />} />
            <Route path="/testseries" element={<Test />} />
            <Route path="/getquestion" element={<QuestionsList />} />
            <Route path="/submitanswer" element={<SubmitAnswer />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/mycourse" element={<Dashboard />} />
            <Route
              path="/liveclass"
              element={isAuth ? <LiveClass user={user} /> : <Login />}
            />
            <Route
              path="/notes/:id"
              element={isAuth ? <Notes user={user} /> : <Login />}
            />
            <Route path="/courses" element={<Courses />} />
            <Route
              path="/account"
              element={isAuth ? <Account user={user} /> : <Login />}
            />
            <Route
              path="/login"
              element={isAuth ? <Home /> : <Login />}
            ></Route>
            <Route
              path="/register"
              element={isAuth ? <Home /> : <Register />}
            ></Route>
            <Route
              path="/verify"
              element={isAuth ? <Home /> : <Verify />}
            ></Route>
            <Route
              path="/forgot"
              element={isAuth ? <Home /> : <ForgotPassword />}
            ></Route>
            <Route
              path="/reset-password/:token"
              element={isAuth ? <Home /> : <ResetPassword />}
            ></Route>

            <Route
              path="/course/:id"
              element={isAuth ? <CourseDescription user={user} /> : <Login />}
            ></Route>
            <Route
              path="/payment-success/:id"
              element={isAuth ? <PaymentSuccess user={user} /> : <Login />}
            ></Route>
            <Route
              path="/:id/dashboard"
              element={isAuth ? <Dashboard user={user} /> : <Login />}
            ></Route>
            <Route
              path="/course/study/:id"
              element={isAuth ? <CourseStudy user={user} /> : <Login />}
            ></Route>
            <Route
              path="/lectures/:id"
              element={isAuth ? <Lecture user={user} /> : <Login />}
            ></Route>
            <Route
              path="/admin/dashboard"
              element={isAuth ? <AdminDashboard user={user} /> : <Login />}
            ></Route>
            <Route
              path="/admin/course"
              element={isAuth ? <AdminCourses user={user} /> : <Login />}
            ></Route>
            <Route
              path="/admin/users"
              element={isAuth ? <AdminUsers user={user} /> : <Login />}
            ></Route>
            <Route path="/terms" element={<Terms />}></Route>
            <Route path="/privacy" element={<Privacy />}></Route>
            <Route path="/refund" element={<RefundPolicy />}></Route>
          </Routes>
          <Footer />
        </BrowserRouter>
      )}
    </>
  );
};

export default App;
