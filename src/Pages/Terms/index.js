import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Terms = () => {
  const navigate = useNavigate()
  return (
    <>

      {/* Start Home   */}
      <section
        className="bg-half-170 d-table w-100"
        style={{ background: `url('./Images/banner.png') center`, backgroundSize:'cover' }}
      >
        <div className="bg-overlay bg-gradient-overlay-2"></div>
        <div className="container">
          <div className="row mt-5 justify-content-center">
            <div className="col-12">
              <div className="title-heading text-center">
                <h5 className="heading fw-semibold sub-heading text-white title-dark">
                  Terms & Condition
                </h5>
                {/* <p className="text-white-50 para-desc mx-auto mb-0"></p>   */}
              </div>
            </div>
            {/*end col  */}
          </div>
          {/*end row  */}

          <div className="position-middle-bottom">
            <nav aria-label="breadcrumb" className="d-block">
              <ul
                className="breadcrumb breadcrumb-muted mb-0 p-0"
                style={{ backgroundColor: 'transparent' }}
              >
                <li className="breadcrumb-item text-center">
                  <a
                    href="/index"
                    onClick={e => {
                      e.preventDefault()
                      navigate('/index')
                    }}
                  >
                    Dragon
                  </a>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  Terms
                </li>
              </ul>
            </nav>
          </div>
        </div>
        {/*end container  */}
      </section>

      {/* Start Terms & Conditions   */}
      <section className="section p-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-9">
              <div className="p-5 text-light shadow border-0 rounded">
                <div className="card-body p-5">
                  <h5 className="card-title">Introduction :</h5>
                  <p className="text-muted mt-4">
                    It seems that only fragments of the original text remain in
                    the Lorem Ipsum texts used today. One may speculate that
                    over the course of time certain letters were added or
                    deleted at various positions within the text.
                  </p>

                  <h5 className="card-title mt-5">User Agreements :</h5>
                  <p className="text-muted mt-4">
                    The most well-known dummy text is the 'Lorem Ipsum', which
                    is said to have <b className="text-danger">originated</b> in
                    the 16th century. Lorem Ipsum is{' '}
                    <b className="text-danger">composed</b> in a pseudo-Latin
                    language which more or less{' '}
                    <b className="text-danger">corresponds</b> to 'proper'
                    Latin. It contains a series of real Latin words. This
                    ancient dummy text is also{' '}
                    <b className="text-danger">incomprehensible</b>, but it
                    imitates the rhythm of most European languages in Latin
                    script. The <b className="text-danger">advantage</b> of its
                    Latin origin and the relative{' '}
                    <b className="text-danger">meaninglessness</b> of Lorum
                    Ipsum is that the text does not attract attention to itself
                    or distract the viewer's{' '}
                    <b className="text-danger">attention</b> from the layout.
                  </p>
                  <p className="text-muted">
                    There is now an <b className="text-danger">abundance</b> of
                    readable dummy texts. These are usually used when a text is{' '}
                    <b className="text-danger">required purely</b> to fill a
                    space. These alternatives to the classic Lorem Ipsum texts
                    are often amusing and tell short, funny or{' '}
                    <b className="text-danger">nonsensical</b> stories.
                  </p>
                  <p className="text-muted">
                    It seems that only <b className="text-danger">fragments</b>{' '}
                    of the original text remain in the Lorem Ipsum texts used
                    today. One may speculate that over the course of time
                    certain letters were added or deleted at various positions
                    within the text.
                  </p>

                  <h5 className="card-title mt-5">Restrictions :</h5>
                  <p className="text-muted mt-4">
                    You are specifically restricted from all of the following :
                  </p>
                  <ul className="list-unstyled text-muted">
                    <li className="mt-2">
                      <i
                        data-feather="arrow-right"
                        className="fea icon-sm me-2"
                      ></i>
                      Digital Marketing Solutions for Tomorrow
                    </li>
                    <li className="mt-2">
                      <i
                        data-feather="arrow-right"
                        className="fea icon-sm me-2"
                      ></i>
                      Our Talented & Experienced Marketing Agency
                    </li>
                    <li className="mt-2">
                      <i
                        data-feather="arrow-right"
                        className="fea icon-sm me-2"
                      ></i>
                      Create your own skin to match your brand
                    </li>
                    <li className="mt-2">
                      <i
                        data-feather="arrow-right"
                        className="fea icon-sm me-2"
                      ></i>
                      Digital Marketing Solutions for Tomorrow
                    </li>
                    <li className="mt-2">
                      <i
                        data-feather="arrow-right"
                        className="fea icon-sm me-2"
                      ></i>
                      Our Talented & Experienced Marketing Agency
                    </li>
                    <li className="mt-2">
                      <i
                        data-feather="arrow-right"
                        className="fea icon-sm me-2"
                      ></i>
                      Create your own skin to match your brand
                    </li>
                  </ul>

                  <h5 className="card-title mt-5">Users Question & Answer :</h5>

                  <div className="accordion mt-4 pt-2" id="buyingquestion">
                    <div className="accordion-item rounded">
                      <h2 className="accordion-header" id="headingOne">
                        <button
                          className="accordion-button border-0"
                          style={{ backgroundColor: "#F8F8FC" }}
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#collapseOne"
                          aria-expanded="true"
                          aria-controls="collapseOne"
                        >
                          How does it work ?
                        </button>
                      </h2>
                      <div
                        id="collapseOne"
                        className="accordion-collapse border-0 collapse show"
                        aria-labelledby="headingOne"
                        data-bs-parent="#buyingquestion"
                      >
                        <div className="accordion-body text-muted bg-white">
                          There are many variations of passages of Lorem Ipsum
                          available, but the majority have suffered alteration
                          in some form.
                        </div>
                      </div>
                    </div>

                    <div className="accordion-item rounded mt-2">
                      <h2 className="accordion-header" id="headingTwo">
                        <button
                          className="accordion-button border-0 collapsed"
                          style={{ backgroundColor: "#F8F8FC" }}
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#collapseTwo"
                          aria-expanded="false"
                          aria-controls="collapseTwo"
                        >
                          Do I need a designer to use Superex ?
                        </button>
                      </h2>
                      <div
                        id="collapseTwo"
                        className="accordion-collapse border-0 collapse"
                        aria-labelledby="headingTwo"
                        data-bs-parent="#buyingquestion"
                      >
                        <div className="accordion-body text-muted bg-white">
                          There are many variations of passages of Lorem Ipsum
                          available, but the majority have suffered alteration
                          in some form.
                        </div>
                      </div>
                    </div>

                    <div className="accordion-item rounded mt-2">
                      <h2 className="accordion-header" id="headingThree">
                        <button
                          className="accordion-button border-0 collapsed"
                          style={{ backgroundColor: "#F8F8FC" }}
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#collapseThree"
                          aria-expanded="false"
                          aria-controls="collapseThree"
                        >
                          What do I need to do to start selling ?
                        </button>
                      </h2>
                      <div
                        id="collapseThree"
                        className="accordion-collapse border-0 collapse"
                        aria-labelledby="headingThree"
                        data-bs-parent="#buyingquestion"
                      >
                        <div className="accordion-body text-muted bg-white">
                          There are many variations of passages of Lorem Ipsum
                          available, but the majority have suffered alteration
                          in some form.
                        </div>
                      </div>
                    </div>

                    <div className="accordion-item rounded mt-2">
                      <h2 className="accordion-header" id="headingFour">
                        <button
                          className="accordion-button border-0 collapsed"
                          style={{ backgroundColor: "#F8F8FC" }}
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#collapseFour"
                          aria-expanded="false"
                          aria-controls="collapseFour"
                        >
                          What happens when I receive an order ?
                        </button>
                      </h2>
                      <div
                        id="collapseFour"
                        className="accordion-collapse border-0 collapse"
                        aria-labelledby="headingFour"
                        data-bs-parent="#buyingquestion"
                      >
                        <div className="accordion-body text-muted bg-white">
                          There are many variations of passages of Lorem Ipsum
                          available, but the majority have suffered alteration
                          in some form.
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4">
                    <Link
                      onClick={e => e.preventDefault()}
                      className="btn btn-primary rounded-md mt-2 me-2"
                    >
                      Accept
                    </Link>
                    <Link
                      onClick={e => e.preventDefault()}
                      className="btn btn-outline-primary rounded-md mt-2"
                    >
                      Decline
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            {/*end col  */}
          </div>
          {/*end row  */}
        </div>
        {/*end container  */}
      </section>
    </>
  )
}

export default Terms
