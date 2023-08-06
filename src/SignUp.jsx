import "./App.css";
import "./Compenent/Themes.css";
import Header from "./Compenent/Header";
import Footer from "./Compenent/Footer";
import { Helmet } from "react-helmet-async";
import { NavLink } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "./Firebase/Config";
import ThemeContext from "./Context/DataContext.jsx";
import { useContext } from "react";
import { useState } from "react";
import Loading from "./Compenent/loading";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth, signOut, sendEmailVerification } from "firebase/auth";
const SignUp = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [Name, setName] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  if (!user) {
    return (
      <div>
        <Helmet>
          <title>SignUp</title>
          <link rel="canonical" href="https://www.tacobell.com/" />
        </Helmet>
        <Header></Header>
        <div>
          <form
            className="form"
            onSubmit={(eo) => {
              eo.preventDefault();
            }}
          >
            <h1>Register : </h1>
            <br />
            <input
              required
              className="txt"
              type="text"
              placeholder="UserName"
              onChange={(eo) => {
                setName(eo.target.value);
              }}
            />
            {/*<input
            required
            className="txt"
            type="text"
            placeholder="Your Phone Number"
          
          /> */}
            <input
              required
              className="txt"
              type="email"
              placeholder="Tapez Votre Email"
              name="email"
              onChange={(eo) => {
                setemail(eo.target.value);
              }}
            />
            <input
              required
              className="txt PassWord"
              type="password"
              placeholder="Password"
              name="PassWord"
              onChange={(eo) => {
                setpassword(eo.target.value);
              }}
            />
            <input
              className="txt"
              type="password"
              onChange={(eo) => {
                const pst = document.querySelector(".PassWord");
                // @ts-ignore
                if (eo.target.value !== pst.value) {
                  eo.target.setAttribute("Style", "border: red 3px solid;");
                } else {
                  eo.target.setAttribute("Style", "border: green 3px solid;");
                }
              }}
              placeholder="Repeat password"
              name="PassWord"
            />
            <div>
              <button
                className="btnLogin btn btn-primary"
                onClick={() => {
                  createUserWithEmailAndPassword(auth, email, password)
                    .then((userCredential) => {
                      const user = userCredential.user;
                      updateProfile(auth.currentUser, {
                        displayName: Name,
                      })
                        .then(() => {
                          console.log("Success Name");
                        })
                        .catch((error) => {
                          console.log("Failed Name");
                        });
                      sendEmailVerification(auth.currentUser).then(() => {
                        alert("Please Verifié Your Email");
                      });
                    })
                    .catch((error) => {
                      const errorCode = error.code;
                      const errorMessage = error.message;
                      console.log("Failed");
                    });
                }}
                type="submit"
              >
                Create Account
              </button>
            </div>
            <NavLink
              className="Link bold"
              style={{ fontWeight: "bold" }}
              to="/SignIn"
            >
              Login ..
            </NavLink>
          </form>
        </div>
        <Footer></Footer>
      </div>
    );
  }
  if (loading) {
    return (
      <div>
        <Helmet>
          <title>Home-Page</title>
          <link rel="canonical" href="https://www.tacobell.com/" />
        </Helmet>
        <Loading/>
      </div>
    );
  }
  if (user) {
    navigate("/");
  }
};

export default SignUp;
