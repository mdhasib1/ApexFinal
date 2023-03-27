import React from 'react'
import { FiFacebook, FiInstagram, FiTwitter } from 'react-icons/fi'
import { Link, useNavigate } from 'react-router-dom'
// image import
import {
  about, bg01, client01, client02, client03, client04, client05, client06, client07, client08
} from "../../Components/imageImport/index.js"


const AboutUs = () => {
  const navigate = useNavigate()
  const clientRecord = [
    {
      image: client01,
      name: 'Calvin Carlo',
      position: 'Designer',
    },
    {
      image: client02,
      name: 'Aliana Rosy',
      position: 'Designer',
    },
    {
      image: client08,
      name: 'Micheal Carlo',
      position: 'Designer',
    },
    {
      image: client03,
      name: 'Sofia Razaq',
      position: 'Designer',
    },
    {
      image: client04,
      name: 'Jack John',
      position: 'Designer',
    },
    {
      image: client05,
      name: 'Krista John',
      position: 'Designer',
    },
    {
      image: client06,
      name: 'Roger Jackson',
      position: 'Designer',
    },
    {
      image: client07,
      name: 'Johnny English',
      position: 'Designer',
    },
  ]



  return (
    <>

      <section
        className="bg-half-170 d-table w-100"
        style={{ background: `url(${bg01}) bottom` }}
      >
        <div className="bg-overlay bg-gradient-overlay-2"></div>
        <div className="container">
          <div className="row mt-5 justify-content-center">
            <div className="col-12">
              <div className="title-heading text-center">
                <h5 className="heading fw-semibold sub-heading text-white title-dark">
                 About Dragon
                </h5>
                <p className="text-white-50 para-desc mx-auto mb-0">
                  NFT marketplace where anything is possible and all are welcome
                </p>
              </div>
            </div>
            {/*end col*/}
          </div>
          {/*end row*/}

          <div className="position-middle-bottom">
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
                    Dragon
                  </Link>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  About us
                </li>
              </ul>
            </nav>
          </div>
        </div>
        {/*end container*/}
      </section>

      {/* Start Section */}
      <section className="section p-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-5 col-md-6">
              <div className="about-image position-relative">
                <img src={about} className="img-fluid rounded shadow" alt="" />
              </div>
            </div>
            {/*end col*/}

            <div className="col-lg-7 col-md-6 mt-4 pt-2 mt-sm-0 pt-sm-0 text-light">
              <div className="section-title ms-lg-5">
                <h6 className="text-primary fw-normal">
                  Creative Vision & Mission
                </h6>
                <h4 className="title mb-4">
                  We develop & create <br /> digital art.
                </h4>
                <p className=" text-light">
                  Launch your campaign and benefit from our expertise on
                  designing and managing conversion centered bootstrap html
                  page.
                </p>
                <p className="text-light mb-0 ">
                  It seems that only fragments of the original text remain in
                  the Lorem Ipsum texts used today. One may speculate that over
                  the course of time certain letters were added or deleted at
                  various positions within the text. This might also explain why
                  one can now find slightly different versions.
                </p>

                <div className="mt-4 pt-2">
                  <Link
                    onClick={e => e.preventDefault()}
                    className="btn btn-primary rounded-md"
                  >
                    Read More <i className="uil uil-arrow-right"></i>
                  </Link>
                </div>
              </div>
            </div>
            {/*end col*/}
          </div>
          {/*end row*/}
        </div>
        {/*end container*/}

        <div className="container mt-100 mt-5 text-light p-5 text-light">
          <div className="row justify-content-center">
            <div className="col-lg-9">
              <div className="row mt-5">
                <div className="col-md-4 col-6">
                  <div className="counter-box position-relative text-center">
                    <h4 className="mb-0 display-5 fw-bold title-dark mt-2">
                      $
                      <span className="counter-value" data-target="40">
                        3
                      </span>
                      M
                    </h4>
                    <span className="counter-head fw-semibold text-muted title-dark">
                      Trading volume
                    </span>
                  </div>
                  {/*end counter box*/}
                </div>
                {/*end col*/}

                <div className="col-md-4 col-6">
                  <div className="counter-box position-relative text-center">
                    <h4 className="mb-0 display-5 fw-bold title-dark mt-2">
                      <span className="counter-value" data-target="200">
                        1
                      </span>
                    </h4>
                    <span className="counter-head fw-semibold text-muted title-dark">
                      NFTs created
                    </span>
                  </div>
                  {/*end counter box*/}
                </div>
                {/*end col*/}

                <div className="col-md-4 col-6">
                  <div className="counter-box position-relative text-center">
                    <h4 className="mb-0 display-5 fw-bold title-dark mt-2">
                      <span className="counter-value" data-target="234">
                        100
                      </span>
                      K
                    </h4>
                    <span className="counter-head fw-semibold text-muted title-dark">
                      Total users
                    </span>
                  </div>
                  {/*end counter box*/}
                </div>
                {/*end col*/}
              </div>
              {/*end row*/}
            </div>
            {/*end col*/}
          </div>
          {/*end row*/}
        </div>
        {/*end container*/}

        <div className="container mt-100 mt-60">
          <div className="row justify-content-center">
            <div className="col">
              <div className="section-title text-center mb-4 pb-2">
                <h4 className="title mb-4 mt-5 text-light fs-1">Our Team</h4>
                <p className="text-light para-desc mb-0 mx-auto">
                  We are a huge marketplace dedicated to connecting great
                  artists of all Superex with their fans and unique token
                  collectors!
                </p>
              </div>
            </div>
            {/*end col*/}
          </div>
          {/*end row*/}

          <div className="row">
            {clientRecord?.map(client => (
              <div
                className="col-lg-3 col-md-4 col-12 mt-4 pt-2"
                key={client?.name}
              >
                <div className="card p-3 text-light  team team-primary text-center">
                  <div className=" team-image w-100 d-inline-block mx-auto rounded-pill shadow avatar avatar-ex-large overflow-hidden">
                    <img src={client?.image} className="img-fluid" alt="" />
                    <div className="card-overlay avatar avatar-ex-large rounded-pill"></div>

                    <ul className="list-unstyled team-social mb-0 text-light">
                      <li className="list-inline-item">
                        <Link className="btn btn-sm btn-pills btn-icon">
                          <FiFacebook className="fea icon-sm fea-social" />
                        </Link>
                      </li>
                      <li className="list-inline-item">
                        <Link className="btn btn-sm btn-pills btn-icon">
                          <FiInstagram className="fea icon-sm fea-social" />
                        </Link>
                      </li>
                      <li className="list-inline-item">
                        <Link className="btn btn-sm btn-pills btn-icon">
                          <FiTwitter className="fea icon-sm fea-social" />
                        </Link>
                      </li>
                    </ul>
                    {/*end icon*/}
                  </div>

                  <div className="content mt-3">
                    <Link className="text-light h6 mb-0 title d-block">
                      {client?.name}
                    </Link>
                    <small className="text-light mb-0 fw-normal">
                      {client?.position}
                    </small>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/*end row*/}
        </div>
        {/*end container*/}
      </section>
      {/*end section*/}
      {/* End Section */}
    </>
  )
}

export default AboutUs
