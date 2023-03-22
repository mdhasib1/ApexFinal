import React, { useState } from 'react'
import { FiCamera } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'
import { banner, dragon } from '../../Components/imageImport/index'


const CreatorProfileEdit = () => {
  const navigate = useNavigate()
  const [name, setName] = useState('Judy')
  const [url, setUrl] = useState('https://dragonsharenft.exe/dragonsharenft')
  const [twitter, _twitter] = useState('https://twitter.com/dragonsharenft')
  const [website, setWebsite] = useState('https://dragonsharenft.com/')
  const [email, setEmail] = useState('info@dragonsharenft.com')

  const loadFile = function (event) {
    var image = document.getElementById(event.target.name)
    image.src = URL.createObjectURL(event.target.files[0])
  }

  return (
    <>
      {/* Start Home */}
      <section
        className="bg-half-170 d-table w-100"
        style={{ background: `url(${banner}) bottom`,backgroundSize:'cover', }}
      >
        <div className="bg-overlay bg-gradient-overlay-2"></div>
        <div className="container">
          <div className="row mt-5 justify-content-center">
            <div className="col-12">
              <div className="title-heading text-center">
                <h5 className="heading fw-semibold sub-heading text-white title-dark">
                  Edit Profile
                </h5>
                <p className="text-white-50 para-desc mx-auto mb-0">
                  Edit your profile
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
                  <a
                    href="index"
                    onClick={e => {
                      e.preventDefault()
                      navigate('/index')
                    }}
                  >
                    DRAGON
                  </a>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  Profile Edit
                </li>
              </ul>
            </nav>
          </div>
        </div>
        {/*end container*/}
      </section>
      {/*end section*/}
      {/* Start */}
      <section className="sectio  p-5">
        <div className="container  p-5">
          <div className="row">
            <div className="col-lg-8 col-md-7 col-12 order-2  order-md-1 mt-4 pt-2">
              <div className="rounded-md shadow">
                <div className="p-4 border-bottom">
                  <h5 className="mb-0 text-light">Edit Profile :</h5>
                </div>

                <div className="p-5">
                  <form className="profile-edit">
                    <div className="row">
                      <div className="col-12 mb-4">
                        <label className="form-label  text-light mb-4 h5">Display Name</label>
                        <input
                          name="name"
                          id="first"
                          type="text"
                          className="form-control p-3"
                          value={name}
                          onChange={e => setName(e.target.value)}
                        />
                      </div>
                      {/*end col*/}

                      <div className="col-12 mb-4">
                        <label className="form-label text-light mb-4 h5">URL</label>
                        <div className="form-icon">
                          <input
                            name="url"
                            id="superex-url"
                            type="url"
                            className="form-control p-3"
                            value={url}
                            onChange={e => setUrl(e.target.value)}
                          />
                        </div>
                      </div>
                      {/*end col*/}

                      <div className="col-12 mb-4">
                        <label className="form-label text-light mb-4 h5">Bio</label>
                        <textarea
                          name="comments"
                          id="comments"
                          rows="3"
                          className="form-control p-3"
                          placeholder="I'm a Digital Artist. Digital Art with over 3 years of experience. Experienced with all stages of the Art cycle for dynamic projects."
                        ></textarea>
                      </div>
                      {/*end col*/}

                      <div className="col-12 mb-4">
                        <label className="form-label text-light mb-4 h5">Twitter Account</label>
                        <p className="text-light mb-4 ">
                          Link your twitter account to gain more trust on the
                          Marketplace
                        </p>
                        <div className="form-icon">
                          <input
                            name="url"
                            id="twitter-url"
                            type="url"
                            className="form-control p-3"
                            value={twitter}
                            onChange={e => _twitter(e.target.value)}
                          />
                        </div>
                      </div>
                      {/*end col*/}

                      <div className="col-12 mb-4">
                        <label className="form-label text-light mb-4 h5">Website</label>
                        <div className="form-icon">
                          <input
                            name="url"
                            id="web-url"
                            type="url"
                            className="form-control p-3"
                            value={website}
                            onChange={e => setWebsite(e.target.value)}
                          />
                        </div>
                      </div>
                      {/*end col*/}

                      <div className="col-12 mb-4">
                        <label className="form-label text-light mb-4 h5">Email</label>
                        <input
                          name="email"
                          id="email"
                          type="email"
                          className="form-control p-3"
                          value={email}
                          onChange={e => setEmail(e.target.value)}
                        />
                      </div>
                      {/*end col*/}
                    </div>
                    {/*end row*/}

                    <div className="row">
                      <div className="col-12">
                        <button
                          type="submit"
                          id="submit"
                          name="send"
                          className="btn btn-primary rounded-md"
                        >
                          Update Profile
                        </button>
                      </div>
                      {/*end col*/}
                    </div>
                    {/*end row*/}
                  </form>
                </div>
              </div>



              <div className="rounded-md shadow mt-4">
                <div className="p-4 border-bottom">
                  <h5 className="mb-0 text-danger">Delete Account :</h5>
                </div>

                <div className="p-4">
                  <h6 className="mb-0">
                    <p className=' text-danger'>
                      <span className='fs-5'>Note : </span>
                      If you delete your account once time then your all data will be lose .
                    </p>
                    Do you want to delete the account? Please press below
                    "Delete" button

                  </h6>
                  <div className="mt-4">
                    <button className="btn btn-danger">Delete Account</button>
                  </div>
                  {/*end col*/}
                </div>
              </div>
            </div>
            {/*end col*/}

            <div className="col-lg-4 col-md-5 col-12 order-1 order-md-2 mt-4 pt-2">
              <div className="card p-5 ms-lg-5">
                <div className="profile-pic">
                  <input
                    id="pro-img"
                    name="profile-image"
                    type="file"
                    className="d-none"
                    onChange={e => loadFile(e)}
                  />
                  <div className="position-relative d-inline-block">
                    <img
                      src={dragon}
                      className="avatar m-auto avatar-medium img-thumbnail rounded-pill shadow-sm"
                      id="profile-image"
                      alt=""
                    />
                    <label
                      className="icons position-absolute bottom-0 end-0"
                      htmlFor="pro-img"
                    >
                      <span className="btn btn-icon btn-sm btn-pills btn-primary">
                        <FiCamera className="icons" />
                      </span>
                    </label>
                  </div>
                </div>

                <div className="mt-4">
                  <p className="text-light mb-0">
                    We recommend an image of at least 400X400. GIFs work too.
                  </p>
                </div>
              </div>
            </div>
            {/*end col*/}
          </div>
          {/*end row*/}
        </div>
        {/*end container*/}
      </section>
      {/*end section*/}

    </>
  )
}

export default CreatorProfileEdit
