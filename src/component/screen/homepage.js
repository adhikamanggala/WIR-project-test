import React, { Component } from 'react';
import CarousellFitur from '../fitur/carousell'
class Homepage extends Component {
  render() {
    return (
      <div className="main">
        <CarousellFitur style={{ widht: '100%' }} />
        <div>
          <div className="position-relative overflow-hidden p-3 p-md-5 m-md-3 text-center bg-light">
            <div className="col-md-5 p-lg-5 mx-auto my-5">
              <h1 className="display-4 font-weight-normal">Hello, Folks!</h1>
              <p className="lead font-weight-normal">A new place where you can explore anything in Indonesia is served. Join with us now for more experience! </p>
              {/* <a className="btn btn-outline-secondary" href="#">Coming soon</a> */}
            </div>
            <div className="product-device shadow-sm d-none d-md-block" />
            <div className="product-device product-device-2 shadow-sm d-none d-md-block" />
          </div>


        </div>
      </div>
    )
  }
}
export default Homepage;