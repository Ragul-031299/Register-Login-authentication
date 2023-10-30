import React, { useState } from 'react';
import axios from 'axios';
import {
    Container,
    Row,
    Col,
    Button,
    Form,
    Image,
    Modal,
} from "react-bootstrap";
import CustomNavbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import { Link } from "react-router-dom";
import Swal from 'sweetalert2';

function Login() {
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [loginMessage, setLoginMessage] = useState('');
  const [user, setUser] = useState({});
  const [showUserInfoModal, setShowUserInfoModal] = useState(false);

  const appurl = "http://localhost:5000";

  const handleLogin = () => {
    console.log('Mobile:', mobile);
  console.log('Password:', password);
    if (!mobile || !password) {
      setLoginMessage('Mobile number and password are required.');
      return;
    }

    axios
      .post(appurl + `/api/auth/login`, { mobile, password })
      .then((response) => {
        if (response.data.token) {
          setLoginMessage('Login successful');
          setUser({
            token: response.data.token,
            fullName: response.data.fullName,
            dob: new Date(response.data.dob).toLocaleDateString(),
            mobileNumber: response.data.mobile,
          });
          setShowUserInfoModal(true);
          // Show a success SweetAlert here
          Swal.fire({
            icon: 'success',
            title: 'Login successful!',
            text: 'You are now logged in.',
          });
        } else {
          setLoginMessage('Login failed. Please check your mobile number and password.');
          // Show an error SweetAlert here
          Swal.fire({
            icon: 'error',
            title: 'Login failed!',
            text: 'Please check your mobile number and password.',
          });
        }
      })
      .catch((error) => {
        console.error(error);
        setLoginMessage('Login failed.');
        // Show an error SweetAlert here
        Swal.fire({
          icon: 'error',
          title: 'Login failed!',
          text: 'An error occurred during login.',
        });
      });
  }


    const ResponsiveToken = ({ text }) => {
        return (
            <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                <p><strong>Token:</strong> {text}</p>
            </div>
        );
    };

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
                                    <Form.Control type="text" placeholder="Your Registered Mobile No" value={mobile} onChange={(e) => setMobile(e.target.value)} />
                                </Form.Group>
                            </div>
                            <div className="my-4">
                                <Form.Group>
                                    <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                                </Form.Group>
                            </div>
                            <Button onClick={handleLogin} variant="dark" className="my-3">
                                Login
                            </Button>
                            {loginMessage && <p>{loginMessage}</p>}
                            <div className="text-center justify-content-center my-3">
                        <Link to="/registration">Don't have an account? Register here.</Link>
                    </div>
                        </Col>
                    
                    </Row>
                    
                </Container>
            </div>
            <Footer />

            {/* Modal to display user information */}
            <Modal show={showUserInfoModal} onHide={() => setShowUserInfoModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>User Information</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ResponsiveToken text={user.token} />
                    <p><strong>Full Name:</strong> {user.fullName}</p>
                    <p><strong>Date of Birth:</strong> {user.dob}</p>
                    <p><strong>Mobile Number:</strong> {user.mobileNumber}</p>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default Login;
