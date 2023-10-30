import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFacebook,
  faTwitter,
  faInstagram,
  faLinkedin,
} from '@fortawesome/free-brands-svg-icons';



function Footer() {
  return (
    <footer className="footer bg-light py-3 mt-4">
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <h3>Quick Links</h3>
            <ul className="footer-menu list-unstyled ">
              <li>
                <a className='text-decoration-none text-dark' cl href="/">Home</a>
              </li>
              <li>
                <a className='text-decoration-none text-dark' href="/about">About Us</a>
              </li>
              <li>
                <a className='text-decoration-none text-dark' href="/services">Services</a>
              </li>
              <li>
                <a className='text-decoration-none text-dark' href="/contact">Contact</a>
              </li>
            </ul>
          </div>
          <div className="col-md-4">
            <h3>Connect with Us</h3>
            <ul className="list-inline social-icons">
              <li className="list-inline-item">
                <a href="/" className="facebook fs-3 text-dark">
                  <FontAwesomeIcon icon={faFacebook} />
                </a>
              </li>
              <li className="list-inline-item">
                <a href="/" className="twitter fs-3 text-dark">
                  <FontAwesomeIcon icon={faTwitter} />
                </a>
              </li>
              <li className="list-inline-item">
                <a href="/" className="instagram fs-3 text-dark">
                  <FontAwesomeIcon icon={faInstagram} />
                </a>
              </li>
              <li className="list-inline-item">
                <a href="/" className="linkedin fs-3 text-dark">
                  <FontAwesomeIcon icon={faLinkedin} />
                </a>
              </li>
            </ul>
          </div>
          <div className="col-md-4">
            <h3>Contact Info</h3>
            <address className="contact-info">
              <p>
                123 Main Street <br />
                City, State ZIP Code <br />
                Email: info@example.com <br />
                Phone: (123) 456-7890
              </p>
            </address>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
