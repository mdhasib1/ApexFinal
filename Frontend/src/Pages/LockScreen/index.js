import React from 'react'
import { useNavigate } from 'react-router-dom'
import { dragon } from '../../Components/imageImport/index'

const LockScreen = () => {
  const navigate = useNavigate()
  return (
    <>
      <section className="position-relative">
        <div className="bg-overlay bg-linear-gradient-2"></div>
        <div className="container-fluid">
          <div className="row">
            <div className="col-12 p-0">
              <div className="d-flex flex-column min-vh-100 p-4">


                {/* Start Content */}
                <div className="title-heading text-center my-auto">
                  <div className="form-signin w-50 m-auto px-4 py-5 bg-white rounded-md shadow-sm">
                    <form>
                      <div className="row">
                        <div className="col-lg-12">
                          <div className="mb-3 text-center">
                            <img
                              src={dragon}
                              className="avatar avatar-md-md rounded-pill mx-auto d-block shadow"
                              alt=""
                            />

                          </div>
                        </div>

                        <div className="col-12">
                          <div className="form-floating mb-3">
                            <input
                              type="password"
                              className="form-control"
                              id="LoginPassword"
                              placeholder="Password"
                            />
                            <label htmlFor="LoginPassword">Password:</label>
                          </div>
                        </div>

                        <div className="col-lg-12">
                          <div className="d-flex justify-content-between">
                            <div className="mb-3">
                              <div className="form-check align-items-center d-flex mb-0">
                                <input
                                  className="form-check-input mt-0"
                                  type="checkbox"
                                  value=""
                                  id="RememberMe"
                                />
                                <label
                                  className="form-check-label text-muted ms-2"
                                  htmlFor="RememberMe"
                                >
                                  Remember me
                                </label>
                              </div>
                            </div>
                            <small className="text-muted mb-0">
                              <a
                                href="/reset-password"
                                onClick={e => {
                                  e.preventDefault()
                                  navigate('/reset-password')
                                }}
                                className="text-muted fw-semibold"
                              >
                                Forgot password ?
                              </a>
                            </small>
                          </div>
                        </div>
                        <div className="col-lg-12 mb-0">
                          <div className="d-grid">
                            <button className="btn btn-primary rounded-md">
                              Login
                            </button>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
                {/* End Content */}

                {/* Start Footer */}
                <div className="text-center">
                <p className="mb-0">
                  <script>document.write(new Date().getFullYear())</script>{' '}
                    © All Rights Reserved Alchemy Studios™, LLC{' '}

                  </p>
                </div>
                {/* End Footer */}
              </div>
            </div>
            {/*end col*/}
          </div>
          {/*end row*/}
        </div>
        {/*end container*/}
      </section>
      {/*end section*/}
      {/* Hero End */}
    </>
  )
}

export default LockScreen
