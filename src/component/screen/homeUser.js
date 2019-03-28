import React, { Component } from 'react';
import Axios from 'axios';
import { API_REFER } from '../../actions/types';
import '../../support/css/homeusercard.css';
import Carousel from '../fitur/carousell';

class homeUser extends Component {

    state = {
        categories_data: []
    }

    componentDidMount() {
        this.getCategories()
    }

    getCategories = () => {
        Axios.get(API_REFER + '/categories')
            .then((res) => {
                this.setState({ categories_data: res.data });
            })
            .catch((err) => {
                console.log(err);
            })
    }

    putDataCategories = () => {
        var categories = this.state.categories_data.map((item) => {
            var { nama, img_category, id_categories } = item
            return (
                <div className="flip">
                    <div
                        className="front"
                        style={{ backgroundImage: `url(${img_category})` }}
                    >
                        <a href={`/categories?id=${id_categories}`} style={{ color: "white", textDecoration: "none" }}><h1 align="center" className="text-shadow">{nama}</h1></a>
                    </div>
                </div>
            )
        });
        return categories;
    };


    render() {
        return (
            <div>
                <Carousel style={{ widht: '100%' }} />
                <br />
                <br />
                <br />
                <div className="main-card" >
                    <div className="container" align="center">
                        <h2 className="text-secondary">START YOUR EXTRAORDINARY JOURNEY HERE</h2>
                        <h4 className="text-muted">Pick your favorite activity!</h4>
                    </div>
                    <br />
                    <br />
                    <br />
                    <center>
                        <div className="row" style={{ justifyContent: "center" }}>
                            <h1 className="text-secondary">Categories</h1>
                            <div className="row" style={{ justifyContent: "center", marginTop: "30px" }}>
                                {this.putDataCategories()}
                            </div>
                            <br />
                            <br />
                        </div>
                    </center>
                </div>
            </div>
        )
    }
}
export default homeUser;
