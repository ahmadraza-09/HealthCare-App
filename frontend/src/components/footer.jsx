import React from 'react'

const Footer = () => {
  return (
    <>
      <footer>
        <div class="row">
            <div class="footer-col">
                <h2>Health<span>Care</span></h2>
                <p>Your trusted partner in wellness, offering comprehensive medical resources and services.</p>
            </div>
            <div class="footer-col">
                <h4>company</h4>
                <a>about us</a>
                <a>doctors</a>
                <a>appointment</a>
                <a>our services</a>
                <a>contact us</a>
            </div>
            <div class="footer-col">
                <h4>get help</h4>
                <a>FAQ</a>
                <a>shipping</a>
                <a>privacy policy</a>
                <a>payment options</a>
            </div>
            <div class="footer-col">
                <h4>online appointment</h4>
                <a>appointment status</a>
                <a>check availability</a>
                <a>online Medicine Delivery</a>
                <a>buy medicine's</a>
            </div>
            <div class="footer-col">
                <h4>follow us</h4>
                <div class="social-links">
                    <a><i class="fab fa-facebook-f"></i></a>
                    <a><i class="fab fa-twitter"></i></a>
                    <a><i class="fab fa-instagram"></i></a>
                    <a><i class="fab fa-linkedin-in"></i></a>
                </div>
            </div>
        </div>

        <div className="footer-copyright">
            <div className="footer-copyright-left">
                <p>© 2024</p> <h2>Health<span>Care</span></h2>
            </div>

            <div className="footer-copyright-right">
                All Rights Reserved
            </div>
        </div>
      </footer>
    </>
  )
}

export default Footer
