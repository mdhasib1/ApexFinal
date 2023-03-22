import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import BackToTop from '../BackToTop'

const Footer = () => {
  const navigate = useNavigate()
  const closeModal = () => {
    //   metamask modal
    const modal = document.getElementById('modal-metamask')

    modal.classList.remove('show')
    modal.style.display = 'none'
  }
  return (
    <>
      <footer className="bg-footer">
        <div className="py-5">
          <div className="container">
       
            {/*end row*/}
          </div>
          {/*end container*/}
        </div>
        {/*end div*/}
  <div className="container">
          <div className="row">
            <div className="col-12 p-5 border-top border-secondary ">
              <div className="footer-py-60 footer-border">
                <div className="row">
                <div className="col-lg-4 col-md-4 col-12 mt-4 mt-sm-0 pt-2 pt-sm-0">
                    <h5 className="footer-head w-50">
                      <img src='./Images/logo.png' alt='logo' className="w-100" />
                    </h5>
                    <p className="mt-4 mr-3">
                    Discover the mythical world of dragons with our unique NFT Marketplace. Explore a collection of hand-drawn, one-of-a-kind dragon art pieces, each with its own story to tell. Own a piece of digital history and become the proud owner of a dragon NFT today.
                    </p>
                  </div>

                  <div className="col-lg-4 col-md-4 col-12 mt-4 mt-sm-0 pt-2 pt-sm-0">
                    <h5 className="footer-head">Marketplace</h5>
                    <ul className="list-unstyled footer-list mt-4">
                    <li>
                        <Link
                          to="/"
                          onClick={e => {
                            e.preventDefault()
                            navigate('/explore')
                          }}
                          className="text-foot"
                        >
                          <i className="uil uil-angle-right-b me-1"></i> Home
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/explore"
                          onClick={e => {
                            e.preventDefault()
                            navigate('/explore')
                          }}
                          className="text-foot"
                        >
                          <i className="uil uil-angle-right-b me-1"></i> Explore
                        </Link>
                      </li>
                      <li>
                        <a
                          href="/auction"
                          onClick={e => {
                            e.preventDefault()
                            navigate('/auction')
                          }}
                          className="text-foot"
                        >
                          <i className="uil uil-angle-right-b me-1"></i> Live
                          Auction
                        </a>
                      </li>
             
                      <li>
                        <a
                          href="/creators"
                          onClick={e => {
                            e.preventDefault()
                            navigate('/creators')
                          }}
                          className="text-foot"
                        >
                          <i className="uil uil-angle-right-b me-1"></i>{' '}
                          Creators
                        </a>
                      </li>
                    </ul>
                  </div>
                  {/*end col*/}


                  <div className="col-lg-3 col-md-4 col-12 mt-4 mt-sm-0 pt-2 pt-sm-0">
                    <h5 className="footer-head">Newsletter</h5>
                    <p className="mt-4">
                      Sign up and receive the latest tips via email.
                    </p>
                    <form>
                      <div className="row">
                        <div className="col-lg-12">
                          <div className="foot-subscribe mb-3">
                            <label className="form-label">
                              Write your email{' '}
                              <span className="text-danger">*</span>
                            </label>
                            <div className="form-icon position-relative">
                          
                              <input
                                type="email"
                                name="email"
                                id="emailsubscribe"
                                className="form-control ps-5 rounded"
                                placeholder="Your email : "
                                required
                                style={{ height: 46 }}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-12">
                          <div className="d-grid">
                            <input
                              type="submit"
                              id="submitsubscribe"
                              name="send"
                              className="btn btn-primary"
                              value="Subscribe"
                            />
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                  {/*end col*/}
                </div>
                {/*end row*/}
              </div>
            </div>
            {/*end col*/}
          </div>
          {/*end row*/}
        </div>
        {/*end container*/}

        <div className="footer-py-30 footer-bar">
          <div className="container text-center">
            <div className="row align-items-center">
              <div className="col-sm-6">
                <div className="text-sm-start">
                  <p className="mb-0">
                  <script>document.write(new Date().getFullYear())</script>{' '}
                    © All Rights Reserved Alchemy Studios™, LLC{' '}

                  </p>
                </div>
              </div>
              {/*end col*/}

              <div className="col-sm-6 mt-4 mt-sm-0 pt-2 pt-sm-0">
                <ul className="list-unstyled footer-list text-sm-end mb-0">
                  <li className="list-inline-item mb-0">
                    <a
                      href="/privacy"
                      onClick={e => {
                        e.preventDefault()
                        navigate('/privacy')
                      }}
                      className="text-foot me-2"
                    >
                      Privacy
                    </a>
                  </li>
                  <li className="list-inline-item mb-0">
                    <a
                      href="/terms"
                      onClick={e => {
                        e.preventDefault()
                        navigate('/terms')
                      }}
                      className="text-foot me-2"
                    >
                      Terms
                    </a>
                  </li>
                  <li className="list-inline-item mb-0">
                    <a
                      href="/about"
                      onClick={e => {
                        e.preventDefault()
                        navigate('/about')
                      }}
                      className="text-foot me-2"
                    >
                      About Us
                    </a>
                  </li>
                  <li className="list-inline-item mb-0">
                    <a
                      href="/contact"
                      onClick={e => {
                        e.preventDefault()
                        navigate('/contact')
                      }}
                      className="text-foot"
                    >
                      Contact
                    </a>
                  </li>
                </ul>
              </div>
              {/*end col*/}
            </div>
            {/*end row*/}
          </div>
          {/*end container*/}
        </div>
      </footer>
      {/*end footer*/}

      {/* Back to top */}
      <BackToTop />

      {/* Wallet Modal */}
      <div
        className="modal fade"
        id="modal-metamask"
        tabIndex="-1"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-sm">
          <div className="modal-content justify-content-center border-0 shadow-md rounded-md position-relative">
            <div className="position-absolute top-0 start-100 translate-middle z-index-1">
              <button
                type="button"
                className="btn btn-icon btn-pills btn-sm btn-light btn-close opacity-10"
                data-bs-dismiss="modal"
                id="close-modal"
                onClick={closeModal}
              >
                <i className="uil uil-times fs-4"></i>
              </button>
            </div>

            <div className="modal-body p-4 text-center">
              <img
                src='./Images/logo.png'
                className="avatar avatar-md-md rounded-circle shadow-sm "
                alt=""
              />

              <div className="content mt-4">
                <h5 className="text-danger mb-4">Please Install MetaMask</h5>

                <p className="text-muted">
                  Please Download MetaMask and create your profile and wallet in
                  MetaMask. Please click and check the details,
                </p>

                <a
                  href="https://metamask.io/"
                  className="btn btn-link primary text-primary fw-bold"
                  target="_blank" rel="noreferrer"
                >
                  MetaMask
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Wallet Modal */}
    </>
  )
}

export default Footer
