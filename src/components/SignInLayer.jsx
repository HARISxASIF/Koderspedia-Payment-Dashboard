import { Icon } from "@iconify/react/dist/iconify.js";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import banner from "../otherImages/sigupbanner.png"
import { Formik, Form, Field } from "formik";

const SignInLayer = () => {
  const navigate = useNavigate();

  const handleLogin = (values) => {
    const { email, password } = values;

    // Dummy logic: check role based on email (replace with real API in future)
    if (email === "admin@example.com" && password === "admin123") {
      localStorage.setItem("role", "admin");
      navigate("/dashboard");
    } else if (email === "client@example.com" && password === "client123") {
      localStorage.setItem("role", "client");
      navigate("/all-packages");
    } else {
      alert("Invalid email or password");
    }
  };

  return (
    <section className='auth bg-base d-flex'>
      <div className='auth-left d-lg-block d-none'>
        <div className='d-flex align-items-center flex-column h-100 justify-content-center'>
          <img className="h-100vh w-100" src={banner} alt='' style={{ objectFit: "cover", objectPosition: "bottom" }} />
        </div>
      </div>
      <div className='auth-right py-22 px-24 d-flex flex-column justify-content-center'>
        <div className='max-w-464-px mx-auto w-100'>
          <div>
            <Link to='/' className='mb-40 max-w-290-px'>
              <img src='assets/images/logo.png' alt='' />
            </Link>
            <h4 className='mb-12 fw-bold fs-1'>Sign In</h4>
            <p className='mb-32 text-secondary-light text-lg'>
              Please enter the details to login an account
            </p>
          </div>

          {/* Formik Form Starts */}
          <Formik
            initialValues={{ email: "", password: "" }}
            onSubmit={handleLogin}
          >
            <Form>
              <div className='icon-field mb-16'>
                <span className='icon top-50 translate-middle-y'>
                  <Icon icon='mage:email' />
                </span>
                <Field
                  type='email'
                  name='email'
                  className='form-control h-56-px bg-neutral-50 radius-12'
                  placeholder='Email'
                  required
                />
              </div>

              <div className='position-relative mb-20'>
                <div className='icon-field'>
                  <span className='icon top-50 translate-middle-y'>
                    <Icon icon='solar:lock-password-outline' />
                  </span>
                  <Field
                    type='password'
                    name='password'
                    className='form-control h-56-px bg-neutral-50 radius-12'
                    placeholder='Password'
                    required
                  />
                </div>
              </div>

              <div className='d-flex justify-content-between gap-2'>
                <div className='form-check style-check d-flex align-items-center'>
                  <input
                    className='form-check-input border border-neutral-300'
                    type='checkbox'
                    id='remember'
                  />
                  <label className='form-check-label' htmlFor='remember'>
                    Remember me
                  </label>
                </div>
                <Link to='#' className='primaryColor fw-medium'>
                  Forgot Password?
                </Link>
              </div>

              <button type='submit' className='btn bg-primary py-16 w-100 radius-12 mt-32'>
                Sign In
              </button>

              <div className='mt-32 center-border-horizontal text-center'>
                <span className='bg-base z-1 px-4 fw-bold'>Or Continue With</span>
              </div>

              <div className='mt-32 d-flex align-items-center gap-3 justify-content-center'>
                <button
                  type='button'
                  className='fw-semibold text-primary-light py-16 px-24 w-50 border radius-12 text-md d-flex align-items-center justify-content-center gap-12 line-height-1 bg-hover-primary-50'
                >
                  <Icon icon='logos:google-icon' className='text-primary-600 text-xl line-height-1' />
                  Google
                </button>
              </div>

              <div className='mt-32 text-center text-sm'>
                <p className='mb-0'>
                  Don’t have an account?{" "}
                  <Link to="/signup" className='primaryColor fw-semibold'>
                    Sign Up
                  </Link>
                </p>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </section>
  );
};

export default SignInLayer;
