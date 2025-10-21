import { Link } from "react-router";
import { FaEye } from "react-icons/fa";
import { IoEyeOff } from "react-icons/io5";
import MyContainer from "../components/MyContainer";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import { auth } from "../firebase/firebase.config";
import { toast } from "react-toastify";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";

const SignUp = () => {
  const [show, setShow] = useState(false);

  const result = useContext(AuthContext);
  const { user } = result;
  console.log(user);

  const handleSignup = (e) => {
    e.preventDefault();
    const email = e.target.email?.value;
    const password = e.target.password?.value;
    const displayName = e.target.name?.value;
    const photoURL = e.target.photoURL?.value;
    // console.log("signup function entered", { email, password });

    const regEx =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9])(?!.*\s).{8,}$/;

    if (!regEx.test(password)) {
      toast.error(
        "⚠️Password must be at least 8 characters long and include uppercase, lowercase, number, and special character."
      );
      return;
    }

    // 1st step create user
    createUserWithEmailAndPassword(auth, email, password)
      .then((res) => {
        // 2st step  update profile
        updateProfile(res.user, {
          displayName,
          photoURL,
        })
          .then(() => {
            // 3st email varification
            sendEmailVerification(res.user)
              .then(() => {
                console.log(res);
                toast.success(
                  "SignUp Successful. Check your email to active your account"
                );
              })
              .catch((err) => {
                console.log(err);
              });
          })
          .catch((err) => {
            toast.error(err.message);
            console.log(e);
          });
        // console.log(res.user);
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.message);
        // console.log(err.code);
        // if (err.code === "auth/email-already-in-use") {
        //   toast.error("Email already in use. Try another one.");
        // } else if (err.code === "auth/invalid-email") {
        //   toast.error("Invalid email address format.");
        // } else if (err.code === "auth/weak-password") {
        //   toast.error("Password must be at least 6 characters long.");
        // } else if (err.code === "auth/invalid-credential") {
        //   toast.error("Invalid credentials provided.");
        // } else if (err.code === "auth/network-request-failed") {
        //   toast.error("Network error. Check your internet connection.");
        // } else {
        //   toast.error(err.message);
        // }
      });
  };
  return (
    <div className="min-h-[96vh] flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 relative overflow-hidden">
      {/* Animated floating circles */}
      <div className="absolute inset-0">
        <div className="absolute w-72 h-72 bg-pink-400/30 rounded-full blur-2xl top-10 left-10 animate-pulse"></div>
        <div className="absolute w-72 h-72 bg-purple-400/30 rounded-full blur-2xl bottom-10 right-10 animate-pulse"></div>
      </div>

      <MyContainer>
        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10 p-6 lg:p-10 text-white">
          <div className="max-w-lg text-center lg:text-left">
            <h1 className="text-5xl font-extrabold drop-shadow-lg">
              Create Your Account
            </h1>
            <p className="mt-4 text-lg text-white/80 leading-relaxed">
              Join our community and unlock exclusive features. Your journey
              begins here!
            </p>
          </div>

          <div className="w-full max-w-md backdrop-blur-lg bg-white/10 border border-white/20 shadow-2xl rounded-2xl p-8">
            <h2 className="text-2xl font-semibold mb-6 text-center text-white">
              Sign Up
            </h2>

            <form onSubmit={handleSignup} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Name</label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="Enter Your Name"
                  className="input input-bordered w-full bg-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-pink-400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  PhotoURL
                </label>
                <input
                  type="text"
                  name="photoURL"
                  required
                  placeholder="Enter Your photoURL"
                  className="input input-bordered w-full bg-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-pink-400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="example@email.com"
                  className="input input-bordered w-full bg-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-pink-400"
                />
              </div>

              <div className="relative">
                <label className="block text-sm font-medium mb-1">
                  Password
                </label>
                <input
                  type={show ? "text" : "password"}
                  name="password"
                  required
                  placeholder="••••••••"
                  className="input input-bordered w-full bg-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-pink-400"
                />
                <span
                  onClick={() => setShow(!show)}
                  className="absolute right-[8px] top-[36px] cursor-pointer z-50"
                >
                  {show ? <FaEye /> : <IoEyeOff />}
                </span>
              </div>

              <button type="submit" className="my-btn">
                Sign Up
              </button>

              <div className="text-center mt-3">
                <p className="text-sm text-white/80">
                  Already have an account?{" "}
                  <Link
                    to="/Sign-In"
                    className="text-pink-300 hover:text-white font-medium underline"
                  >
                    Sign in
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </MyContainer>
    </div>
  );
};

export default SignUp;
