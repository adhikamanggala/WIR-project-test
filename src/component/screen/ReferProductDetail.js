import React, { Component } from 'react';
import Axios from 'axios';
import { API_REFER } from '../../actions/types';
import { connect } from 'react-redux';
import Cookies from 'universal-cookie';
import queryString from 'query-string';
import { addToItinerary } from '../../actions'
import '../../support/css/turuninSimilarDest.css';
import '../../support/css/info-product.css'

const now = new Date();
const cookies = new Cookies();

class ReferProductDetail extends Component {

    state = {
        product: [],
        dataProductRefer: []
    }

    componentDidMount() {
        var params = queryString.parse(this.props.location.search)
        var id_product = params.id;
        var categories = params.categories;
        this.getReferProduct(categories);
        this.renderReferDetail(id_product);
    }

    renderReferDetail = (id_product) => {
        Axios.get(API_REFER + '/referproductdetail/' + id_product)
            .then((res) => {
                this.setState({ product: res.data })
            }).catch((err) => {
                console.log(err)
            })
    }

    addSpotToItinerary = () => {
        var params = queryString.parse(this.props.location.search)
        var id_product = params.id;
        var username = cookies.get('dataUser');

        this.props.addToItinerary({ username, id_product, now });
        alert('Successfully added!')
    }

    putReferDetail = () => {
        var putProduct = this.state.product.map((item) => {
            var { nama, img1, description } = item
            return (
                <div className="card mb-8 shadow-sm">
                    <img className="card-img-top" alt="Thumbnail [100%x225]" style={{ height: '400px', width: '100%', display: 'block' }} src={img1} data-holder-rendered="true" />
                    <div className="card-body">
                        <p className="card-text" style={{ fontSize: 30, fontWeight: 600 }}>{nama}</p>
                        <p className="card-text">{description}</p>
                        <input className="btn btn-success" type="button" value="+ My Itinerary" onClick={this.addSpotToItinerary}></input>
                        <div className="d-flex justify-content-between align-items-center"></div>
                    </div>
                </div>
            )
        })
        return putProduct;
    }

    getReferProduct = (nama_category) => {

        Axios.post(API_REFER + '/similardestination/' + nama_category)
            .then((res) => {
                this.setState({ dataProductRefer: res.data })
                console.log(this.state.dataProductRefer)
            }).catch((err) => {
                console.log(err)
            })
    }

    putDataReferProduct = () => {
        var params = queryString.parse(this.props.location.search)
        var id_product = params.id;
        var FilterReferProduct = this.state.dataProductRefer.filter((item) => {
            return item['id_refer_product'] != id_product
        })
        var spot = FilterReferProduct.map((item) => {
            var { id_refer_product, nama, img1, nama_kota, id } = item
            return (
                <div className="col-md-12">
                    <div className="card mb-4 shadow-sm">
                        <a href={`/referproduct?id=${id_refer_product}&&categories=${id}`}>
                            <img className="card-img-top" alt="Thumbnail [100%x225]" style={{ height: '225px', width: '100%', display: 'block' }} src={img1} data-holder-rendered="true" />
                            <div className="card-body">
                                <p className="card-text">{nama}</p>
                                <p className="card-text">{nama_kota}</p>
                                <div className="d-flex justify-content-between align-items-center">
                                </div>
                            </div>
                        </a>
                    </div>
                </div>
            )
        })
        return spot;
    }

    render() {

        return (
            <div className="bg-light " style={{ marginTop: '30px' }}>
                <div className="container ">
                    <div className="row col-lg-12">
                        <div className="col-md-8 turunin">
                            {this.putReferDetail()}
                            <br />
                            <div className="col-md-16">
                                <div className="card mb-4 shadow-sm">
                                    <div className="custom-column">
                                        <div className="card-body">
                                            <p className="card-text">Phone Number: 0812312312
                                            Harga: Rp.2.500.000 Address: Jalan Sudirman, Jakarta Pusat, 15232 Opening Hours: 08.00-22.00</p>
                                            <div className="d-flex justify-content-between align-items-center">

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <br />
                            <div className="col-md-16">
                                <div className="card mb-4 shadow-sm">
                                    <div className="card-body">
                                        <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                                        <div className="d-flex justify-content-between align-items-center">

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 turunin" >
                            <p className="text-secondary" align="center">Similar Destination</p>
                            {this.putDataReferProduct()}
                        </div>
                        <br />
                        <a href="/categories?id=1" className="back text-secondary">Back to categories</a>
                        <br />


                    </div>
                </div>
            </div >
        )
    }
}
export default connect(null, { addToItinerary })(ReferProductDetail);