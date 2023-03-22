import React from 'react'
import './guide.css'
function Guide() {
  return (
    <div className='container-fluid guide mt-100 mt-60'>
      <div className="row px-0 py-5">
    <div className="bg-half-100 ">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col">
            <div className="section-title text-center mb-4 pb-2">
              <h4 className="title mb-4 text-light">SIMPLE STEP</h4>
              <p className="text-muted para-desc mb-0 mx-auto text-light">
                Only 3 step follow you can start make nfts on dragon
              </p>
            </div>
          </div>
          {/*end col*/}
        </div>
        <div className="row">
          <div className="col-lg-4 col-md-6 col-12">
            <div className="card border-0 text-center features feature-primary feature-clean">
              <div className="icons text-center mx-auto">
                <i className="uil uil-card-atm d-block rounded-md h3 mb-0"></i>
              </div>

              <div className="content mt-4 p-5">
                <h5 className="mb-3">Set up your wallet</h5>
                <p className="text-muted mb-0">
                  Start working with Dragon NFTs that can provide
                  everything
                </p>
              </div>
            </div>
          </div>
          {/*end col*/}

          <div className="col-lg-4 col-md-6 col-12 mt-5 mt-lg-0">
            <div className="card border-0 text-center features feature-primary feature-clean">
              <div className="icons text-center mx-auto">
                <i className="uil uil-wallet d-block rounded-md h3 mb-0"></i>
              </div>

              <div className="content mt-4 p-5">
                <h5 className="mb-3">Add your NFT's</h5>
                <p className="text-muted mb-0">
                  Start working with Dragon NFTs that can provide
                  everything
                </p>
              </div>
            </div>
          </div>
          {/*end col*/}

          <div className="col-lg-4 col-md-6 col-12 mt-5 mt-lg-0">
            <div className="card border-0 text-center features feature-primary feature-clean">
              <div className="icons text-center mx-auto">
                <i className="uil uil-layers d-block rounded-md h3 mb-0"></i>
              </div>

              <div className="content mt-4 p-5">
                <h5 className="mb-3">Sell Your NFT's</h5>
                <p className="text-muted mb-0">
                  Start working with Dragon NFTs that can provide
                  everything
                </p>
              </div>
            </div>
          </div>
          {/*end col*/}
        </div>
        {/*end row*/}
      </div>
      {/*end container*/}
    </div>
  </div></div>
  )
}

export default Guide