import React from 'react';
import axios from 'axios';
import '../../support/css/itinerary.css';
import Cookies from "universal-cookie";
import { deleteItinerary } from '../../actions'
import { connect } from 'react-redux';

const cookies = new Cookies();

class Itinerary extends React.Component {
    state = {
        itinerary: []
    }

    componentDidMount() {
        this.getListItinerary();
    }

    getListItinerary = () => {
        console.log(cookies.get('dataUser'))
        axios.post("http://localhost:2019/itinerary", {
            username: cookies.get('dataUser')
        })
            .then((res) => {
                this.setState({ itinerary: res.data })
                console.log(res.data)
            }).catch((err) => {
                console.log(err)
            })
    }

    removeItinerary = (id) => {
        console.log(id)
        if (id != undefined) {
            var delItinerary = window.confirm('Delete ?');
            if (delItinerary) {
                this.props.deleteItinerary(id);
                this.getListItinerary();
            }
        }
    }

    putOnItinerary = () => {
        var itineraryData = this.state.itinerary.map((item) => {
            var { id, nama, kota, image, date } = item
            return (
                <tr>
                    <td>
                        <img src={image} height width="100px" className="img-responsive" />
                    </td>
                    <td>{nama}</td>
                    <td>{kota}</td>
                    <td>{date}</td>

                    <td><button className="btn" onClick={() => this.removeItinerary(id)}>x</button></td>
                </tr>
            )
        })
        return itineraryData
    }


    render() {
        return (
            <div className="container ">
                {/* <div className="row col-lg-12"> */}
                <div className="col-md-8 turunin"></div>
                <div className="col-md-16">
                    <div className="card mb-4 shadow-sm">
                        <div className="card-body">
                            <div className="card" style={{ border: 5 }}>
                                <div className="container mt-5">
                                    <h1 align="center">My Itinerary</h1>
                                    <table className="space-table">
                                        <tr>
                                            <th>
                                                Produk
                                </th>
                                            <th>
                                                Nama
                                </th>
                                            <th>
                                                Kota
                                </th>
                                            <th>
                                                Date
                                </th>
                                            <th>
                                                Delete
                                </th>

                                        </tr>
                                        {this.putOnItinerary()}
                                        {/* <tr>
                        <td className="noborder"></td>
                        <td className="noborder"></td>

                        <td><button className="btn btn-secondary">Checkout</button></td>
                    </tr> */}
                                    </table>
                                    <br />
                                    <a href="/homes" className="back text-secondary">Back to home</a>
                                    <br />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* </div> */}
            </div>

        )
    }
}

export default connect(null, { deleteItinerary })(Itinerary)