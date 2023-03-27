import React from 'react'
import { FiArrowRight } from 'react-icons/fi'
import { Link, useNavigate } from 'react-router-dom'
import dragon from './02.jpg'
import './news.css'

const Blog = () => {
  const navigate = useNavigate()
  const blogList = [
    {
      image: dragon,
      title: 'Mindfulness Activities for Kids & Toddlers with NFT',
      createdBy: '@callyjoe',
      type: 'Arts',
    },
    {
      image: dragon,
      title: 'Save Thousands Of Lives Through This NFT',
      createdBy: '@kristyhoney',
      type: 'Illustration',
    },
    {
      image: dragon,
      title: 'A place where technology meets craftsmanship',
      createdBy: '@pandaone',
      type: 'Music',
    },
 
  ]
  return (
    <>

<div className="container mt-100 mb-5  mt-60">
            <div className="row justify-content-center">
              <div className="col">
                <div className="section-title text-center mb-5 pb-3">
                  <h4 className="title mb-4 fs-1 text-light mt-5">Latest News</h4>
                </div>
              </div>
              {/*end col*/}
            </div>
            {/*end row*/}

            <div className="row g-4">
              {blogList?.map((data, index) => {
                return (
                  <div className="col-lg-4 col-md-6" key={index * 5}>
                    <div className="card blog blog-primary shadow rounded-md overflow-hidden">
                      <div className="position-relative newsimage" height={150}>
                        <img
                          src={data?.image}
                          className="img-fluid rounded-md"
                          alt=""
                        />
                        <div className="position-absolute top-0 end-0 m-3">
                          <span className="like-icon shadow-sm">
                            <Link
                              onClick={(e) => e.preventDefault()}
                              className="text-muted icon"
                            >
                              <i className="mdi mdi-18px mdi-heart mb-0"></i>
                            </Link>
                          </span>
                        </div>
                      </div>
                      <div className="card-body position-relative p-4">
                        <Link className="badge tag gradient rounded-md fw-bold">
                          {data?.type}
                        </Link>

                        <ul className="list-unstyled mt-2">
                          <li className="list-inline-item text-muted small me-3">
                            <i className="uil uil-calendar-alt text-dark h6 me-1"></i>
                            20th January, 2022
                          </li>
                          <li className="list-inline-item text-muted small">
                            <i className="uil uil-clock text-dark h6 me-1"></i>5
                            min read
                          </li>
                        </ul>
                        <Link
                          to="/blog-detail"
                          onClick={(e) => {
                            e.preventDefault();
                            navigate("/blog-detail");
                          }}
                          className="text-dark title h5 mt-3"
                        >
                          {data?.name}
                        </Link>

                        <div className="mt-3 d-flex justify-content-between align-items-center">
                          <Link
                            to="/blog-detail"
                            onClick={(e) => {
                              e.preventDefault();
                              navigate("/blog-detail");
                            }}
                            className="btn btn-link text-muted"
                          >
                            Read more <FiArrowRight className="fea icon-sm" />
                          </Link>
                          <span className="text-muted fs-6">
                            by{" "}
                            <Link
                              to="/creator-profile"
                              onClick={(e) => {
                                e.preventDefault();
                                navigate("/creator-profile");
                              }}
                              className="link"
                            >
                              {data?.createdBy}
                            </Link>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}

              {/*end col*/}
            </div>
            {/*end row*/}
          </div>

    </>
  )
}

export default Blog
