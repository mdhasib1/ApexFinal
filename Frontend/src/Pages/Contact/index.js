import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { banner } from '../../Components/imageImport/index'

const Contact = () => {
  const navigate = useNavigate()
  // Contact Form
  function validateForm() {
    var name = document.forms["myForm"]["name"].value;
    var email = document.forms["myForm"]["email"].value;
    var subject = document.forms["myForm"]["subject"].value;
    var comments = document.forms["myForm"]["comments"].value;
    document.getElementById("error-msg").style.opacity = 0;
    document.getElementById('error-msg').innerHTML = "";
    if (name === "" || name == null) {
      document.getElementById('error-msg').innerHTML = "<div class='alert alert-warning error_message'>*Please enter a Name*</div>";
      fadeIn();
      return false;
    }
    if (email === "" || email == null) {
      document.getElementById('error-msg').innerHTML = "<div class='alert alert-warning error_message'>*Please enter a Email*</div>";
      fadeIn();
      return false;
    }
    if (subject === "" || subject == null) {
      document.getElementById('error-msg').innerHTML = "<div class='alert alert-warning error_message'>*Please enter a Subject*</div>";
      fadeIn();
      return false;
    }
    if (comments === "" || comments == null) {
      document.getElementById('error-msg').innerHTML = "<div class='alert alert-warning error_message'>*Please enter a Comments*</div>";
      fadeIn();
      return false;
    }
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
        document.getElementById("simple-msg").innerHTML = this.responseText;
        document.forms["myForm"]["name"].value = "";
        document.forms["myForm"]["email"].value = "";
        document.forms["myForm"]["subject"].value = "";
        document.forms["myForm"]["comments"].value = "";
      }
    };
    xhttp.open("POST", "php/contact.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("name=" + name + "&email=" + email + "&subject=" + subject + "&comments=" + comments);
    return false;
  }
  function fadeIn() {
    var fade = document.getElementById("error-msg");
    var opacity = 0;
    var intervalID = setInterval(function () {
      if (opacity < 1) {
        opacity = opacity + 0.5
        fade.style.opacity = opacity;
      } else {
        clearInterval(intervalID);
      }
    }, 200);
  }
  return (
    <>

      {/* Start Home */}
      <section
        className="bg-half-170 d-table w-100"
        style={{ background: `url(${banner}) bottom`, backgroundSize:'cover' }}
      >
        <div className="bg-overlay bg-gradient-overlay-2"></div>
        <div className="container">
          <div className="row mt-5 justify-content-center">
            <div className="col-12">
              <div className="title-heading text-center">
                <h5 className="heading fw-semibold sub-heading text-white title-dark">
                  Contact Us
                </h5>
                <p className="text-white-50 para-desc mx-auto mb-0">
                  Get in Touch !
                </p>
              </div>
            </div>
            {/*end col*/}
          </div>
          {/*end row*/}

          <div className="position-middle-bottom p-2">
            <nav aria-label="breadcrumb" className="d-block">
              <ul
                className="breadcrumb breadcrumb-muted mb-0 p-0"
                style={{ backgroundColor: 'transparent' }}
              >
                <li className="breadcrumb-item">
                  <Link
                    to="/index"
                    onClick={e => {
                      e.preventDefault()
                      navigate('/index')
                    }}
                  >
                    Dargon
                  </Link>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  Contact
                </li>
              </ul>
            </nav>
          </div>
        </div>
        {/*end container*/}
      </section>
      {/*end section*/}

      {/* End Home */}

      {/* Start Section */}
      <section className="section p-5">
        <div className="container">
          <div className="row mb-5">
            <div className="col-lg-4 col-md-6">
              <div className="card border-0 pb-5 text-center features feature-primary feature-clean">
                <div className="icons text-center mx-auto">
                  <i className="uil uil-phone d-block rounded-md h3 mb-0"></i>
                </div>
                <div className="content mt-4 px-4">
                  <h5 className="fw-bold">Phone</h5>
                  <p className="text-muted">
                    Start working with ApexNFTCard that can provide everything
                  </p>
                  <Link to="tel:+152534-468-854" className="text-primary">
                    +152 534-468-854
                  </Link>
                </div>
              </div>
            </div>
            {/*end col*/}

            <div className="col-lg-4 col-md-6 mt-4 mt-sm-0 pt-2 pt-sm-0">
              <div className="card border-0 pb-5 text-center features feature-primary feature-clean">
                <div className="icons text-center mx-auto">
                  <i className="uil uil-envelope d-block rounded-md h3 mb-0"></i>
                </div>
                <div className="content mt-4 px-4">
                  <h5 className="fw-bold">Email</h5>
                  <p className="text-muted">
                    Start working with ApexNFTCard that can provide everything
                  </p>
                  <Link to="mailto:contact@example.com" className="text-primary">
                    contact@apexnftcard.com
                  </Link>
                </div>
              </div>
            </div>
            {/*end col*/}

            <div className="col-lg-4 col-md-6 mt-4 mt-lg-0 pt-2 pt-lg-0">
              <div className="card border-0 pb-5 text-center features feature-primary feature-clean">
                <div className="icons text-center mx-auto">
                  <i className="uil uil-map-marker d-block rounded-md h3 mb-0"></i>
                </div>
                <div className="content mt-4 px-4">
                  <h5 className="fw-bold">Location</h5>
                  <p className="text-muted">
                    C/54 Northwest Freeway, Suite 558, <br />
                    Houston, USA 485
                  </p>
                  <Link
                    to="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d39206.002432144705!2d-95.4973981212445!3d29.709510002925988!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8640c16de81f3ca5%3A0xf43e0b60ae539ac9!2sGerald+D.+Hines+Waterwall+Park!5e0!3m2!1sen!2sin!4v1566305861440!5m2!1sen!2sin"
                    data-type="iframe"
                    className="video-play-icon text-primary lightbox"
                  >
                    View on Google map
                  </Link>
                </div>
              </div>
            </div>
            {/*end col*/}
          </div>
          {/*end row*/}
        </div>
        {/*end container*/}

        <div className="container mt-100 mt-60">
          <div className="row align-items-center">
            <div className="col-lg-10 m-auto col-md-6 pt-2 pt-sm-0 order-2 order-md-1">
              <div className="card shadow p-5 rounded border-0">
                <div className="card-body py-5">
                  <h4 className="card-title">Get In Touch !</h4>
                  <div className="custom-form mt-3">
                    <form
                      method="post"
                      name="myForm"
                      onSubmit={(e) => {
                        e.preventDefault();
                        validateForm()
                      }}
                    // id="myForm"
                    >
                      <p className="mb-0" id="error-msg"></p>
                      <div id="simple-msg"></div>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label className="form-label">
                              Your Name <span className="text-danger">*</span>
                            </label>
                            <input
                              name="name"
                              id="name"
                              type="text"
                              className="form-control"
                              placeholder="Enter Your Name :"
                            />
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="mb-3">
                            <label className="form-label">
                              Your Email <span className="text-danger">*</span>
                            </label>
                            <input
                              name="email"
                              id="email"
                              type="email"
                              className="form-control"
                              placeholder="Enter Your Email :"
                            />
                          </div>
                        </div>
                        {/*end col*/}

                        <div className="col-12">
                          <div className="mb-3">
                            <label className="form-label">Subject</label>
                            <input
                              name="subject"
                              id="subject"
                              className="form-control"
                              placeholder="Type Subject :"
                            />
                          </div>
                        </div>
                        {/*end col*/}

                        <div className="col-12">
                          <div className="mb-3">
                            <label className="form-label">
                              Comments <span className="text-danger">*</span>
                            </label>
                            <textarea
                              name="comments"
                              id="comments"
                              rows="4"
                              className="form-control"
                              placeholder="Enter Your Message :"
                            ></textarea>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-12">
                          <div className="d-grid">
                            <button
                              type="submit"
                              id="submit"
                              name="send"
                              className="btn btn-primary rounded-md"
                            >
                              Send Message
                            </button>
                          </div>
                        </div>
                        {/*end col*/}
                      </div>
                      {/*end row*/}
                    </form>
                  </div>
                  {/*end custom-form*/}
                </div>
              </div>
            </div>
            {/*end col*/}
            {/*end col*/}
          </div>
          {/*end row*/}
        </div>
        {/*end container*/}
      </section>
      {/*end section*/}

      <div className="container-fluid">
        <div className="row">
          <div className="col-12 p-0">
            <div className="card map border-0">
              <div className="card-body p-0 h-100">
                <iframe
                className='w-100 h-100'
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d39206.002432144705!2d-95.4973981212445!3d29.709510002925988!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8640c16de81f3ca5%3A0xf43e0b60ae539ac9!2sGerald+D.+Hines+Waterwall+Park!5e0!3m2!1sen!2sin!4v1566305861440!5m2!1sen!2sin"
                  style={{ border: 0 }}
                  allowFullScreen
                  title='map'
                ></iframe>
              </div>
            </div>
          </div>
          {/*end col*/}
        </div>
        {/*end row*/}
      </div>

    </>
  )
}

export default Contact
