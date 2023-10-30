import React, { useState } from "react";
import axios from 'axios';
import {
    Row,
    Col,
    Button,
    Image,
    Container,
    Form,
} from "react-bootstrap";
import CustomNavbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import { Link } from "react-router-dom";
import Swal from 'sweetalert2';


function Registration() {
    const [fullName, setFullName] = useState('');
    const [dob, setDOB] = useState('');
    const [mobile, setMobile] = useState('');
    const [otp, setOtp] = useState('');
    const [verificationMessage, setVerificationMessage] = useState('');
    const [error, setError] = useState('');

    const appurl = "http://localhost:5000";

    const handleRegistration = () => {
      axios
          .post(appurl + `/api/auth/register`, { fullName, dob, mobile })
          .then((response) => {
              console.log(response.data);
              Swal.fire({
                  title: 'Registration Successful',
                  text: response.data.message,
                  icon: 'success',
              }).then(() => {
                  // Redirect or perform other actions as needed
              });
          })
          .catch((error) => {
              console.error(error);
              Swal.fire({
                  title: 'Registration Failed',
                  text: 'Please fill all valid inputs',
                  icon: 'error',
              });
          });
  }
  
  const handleOtpVerification = () => {
      axios
          .post(appurl + `/api/auth/verify`, { mobile, otp })
          .then((response) => {
              console.log(response.data);
              if (response.data.message === 'OTP verified successfully') {
                  Swal.fire({
                      title: 'OTP Verification Successful',
                      text: 'Registration successful.',
                      icon: 'success',
                  }).then(() => {
                      setVerificationMessage('Registration successful.');
                  });
              } else {
                  Swal.fire({
                      title: 'OTP Verification Failed',
                      text: 'OTP verification failed. Please check your OTP and try again.',
                      icon: 'error',
                  }).then(() => {
                      setError('OTP verification failed. Please check your OTP and try again.');
                  });
              }
          })
          .catch((error) => {
              console.error(error);
              Swal.fire({
                  title: 'OTP Verification Failed',
                  text: 'An error occurred during OTP verification',
                  icon: 'error',
              }).then(() => {
                  setError('OTP verification failed. Please check your OTP and try again.');
              });
          });
  }
  

    return (
        <>
            <CustomNavbar />
            <div className="container mt-2">
                <Container className="py-3">
                    <Row className="justify-content-around">
                        <Col sm={5} className="border-0 border border-radius-5 text-white h-100 py-5">
                            <div className="d-flex flex-column align-items-center">
                                <Image src="./Assets/images/digi2.png" alt="Logo" fluid className="w-100 my-4" />
                            </div>
                        </Col>
                        <Col sm={6}>
                            <div className="my-4">
                                <Form.Group>
                                    <Form.Control type="text" placeholder="Full Name" value={fullName} onChange={(e) => setFullName(e.target.value)} />
                                </Form.Group>
                            </div>
                            <div className="my-4">
                                <Form.Group>
                                    <Form.Control type="date" value={dob} onChange={(e) => setDOB(e.target.value)} />
                                </Form.Group>
                            </div>
                            <div className="my-4">
                                <Form.Group>
                                    <Form.Control type="text" placeholder="+919597334983" value={mobile} onChange={(e) => setMobile(e.target.value)} />
                                </Form.Group>
                            </div>
                            <Button onClick={handleRegistration} variant="dark" className="my-3">
                                Register
                            </Button>
                            <div className="my-4">
                                <Form.Group>
                                    <Form.Control type="text" placeholder="Enter OTP" value={otp} onChange={(e) => setOtp(e.target.value)} />
                                </Form.Group>
                                {verificationMessage && <p>{verificationMessage}</p>}
                                {error && <p style={{ color: 'red' }}>{error}</p>}
                            </div>
                            <div className="text-center justify-content-center my-3 d-lg-flex d-grid">
                           
                                <Button onClick={handleOtpVerification} variant="success" className="my-2 mx-3">
                                    Verify OTP
                                </Button>
                                <Link to="/login">
                                    <Button variant="danger" className="my-2 mx-3">
                                        Login
                                    </Button>
                                </Link>
                               
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
            <Footer />
        </>
    );
}

export default Registration;
