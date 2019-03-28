import React, { Component } from 'react';
import {
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
} from 'reactstrap';
import Axios from 'axios';
import { API_REFER } from '../../actions/types';
import queryString from 'query-string';
import { Link } from 'react-router-dom'
import '../../support/css/filterbox.css'
import '../../support/css/turuninProductList.css'

class Categories extends Component {
    state = {
        dataProductRefer: [],
        dropdownOpen: false,
        dropdownOpenKota: false,
        categories_data: [],
        kota_data: [],
        kota: ""
    }
    componentDidMount() {
        this.getReferProduct();
        this.getCategories();
        this.getDataKota();
        this.setKota();
        this.toggle = this.toggle.bind(this);
        this.toggleKota = this.toggleKota.bind(this);
    }

    toggle() {
        this.setState(prevState => ({
            dropdownOpen: !prevState.dropdownOpen
        }));
    }

    toggleKota() {
        this.setState(prevState => ({
            dropdownOpenKota: !prevState.dropdownOpenKota
        }));
    }


    getReferProduct = () => {
        var params = queryString.parse(this.props.location.search)
        var product = params.id;
        Axios.get(API_REFER + '/categories/' + product)
            .then((res) => {
                this.setState({ dataProductRefer: res.data })
                console.log(this.state.dataProductRefer)
            }).catch((err) => {
                console.log(err)
            })
    }

    getDataKota = () => {
        Axios.get(API_REFER + '/kota')
            .then((res) => {
                this.setState({ kota_data: res.data });
            })
            .catch((err) => {
                console.log(err);
            })
    }

    putDataKota = () => {
        var params = queryString.parse(this.props.location.search)
        var kota = params.id_kota
        var categories = params.id
        var FilterKota = this.state.kota_data.filter((item) => {
            console.log(this.state.kota_data)
            return item['id'] != kota
        })
        var datakota = FilterKota.map((item) => {
            return (<DropdownItem ><a className="text-secondary" href={`/categories?id=${categories}&&id_kota=${item.id}`}>{item.nama}</a></DropdownItem>)
        })
        return datakota;
    }

    setKota = () => {
        var params = queryString.parse(this.props.location.search)
        var city = params.id_kota;
        console.log(city)
        if (city !== undefined) {
            this.setState({ kota: city })
        }
    }

    putDataReferProduct = () => {
        if (this.state.kota !== "") {
            var FilterKota = this.state.dataProductRefer.filter((item) => {
                console.log(this.state.dataProductRefer)
                return item['id_kota'] == this.state.kota

            })
            var spot = FilterKota.map((item) => {
                var { id_refer_product, nama, img1, nama_kota, id } = item
                return (
                    <div className="col-md-4">
                        <Link to={`/referproduct?id=${id_refer_product}&&categories=${id}`}>
                            <div className="card mb-4 shadow-sm">
                                <img className="card-img-top" alt="Refer [100%x225]" style={{ height: '225px', width: '100%', display: 'block' }} src={img1} data-holder-rendered="true" />
                                <div className="card-body">
                                    <h5 className="card-text">{nama}</h5>
                                    <p className="card-text">{nama_kota}</p>
                                    <div className="d-flex justify-content-between align-items-center">

                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>
                )
            })
            return spot;
        } else {
            var spot1 = this.state.dataProductRefer.map((item) => {
                var { id_refer_product, nama, img1, nama_kota, id } = item
                return (
                    <div className="col-md-4">
                        <Link to={`/referproduct?id=${id_refer_product}&&categories=${id}`}>
                            <div className="card mb-4 shadow-sm">
                                <img className="card-img-top" alt="Refer [100%x225]" style={{ height: '225px', width: '100%', display: 'block' }} src={img1} data-holder-rendered="true" />
                                <div className="card-body">
                                    <h4 className="card-text">{nama}</h4>
                                    <p className="card-text">{nama_kota}</p>
                                    <div className="d-flex justify-content-between align-items-center">

                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>
                )
            })
            return spot1;
        }

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
        var params = queryString.parse(this.props.location.search)
        var categories = params.id
        var FilterCategories = this.state.categories_data.filter((item) => {
            return item['id_categories'] != categories
        })
        var putData = FilterCategories.map((item) => {
            var { id_categories, nama } = item
            return (
                <a href={`categories?id=${id_categories}`}><DropdownItem>{nama}</DropdownItem></a>
            )
        })
        return putData;
    }

    putNameCategories = () => {
        var params = queryString.parse(this.props.location.search)
        var categories = params.id
        var FilterCategories = this.state.categories_data.filter((item) => {
            return item['id_categories'] == categories
        })
        var putDataNameCategories = FilterCategories.map((item) => {
            var { nama } = item
            return nama;
        })
        return putDataNameCategories;
    }

    putNameKota = () => {
        var params = queryString.parse(this.props.location.search)
        var kota = params.id_kota
        var FilterKota = this.state.kota_data.filter((item) => {
            return item['id'] == kota
        })
        var putDataNameKota = FilterKota.map((item) => {
            var { nama } = item
            return nama;
        })
        return putDataNameKota;
    }

    render() {
        var params = queryString.parse(this.props.location.search)
        var categories = params.id
        return (
            <div className="">
                <div className="row">
                    <div className="col-md-2" >
                        <div className="example1 mt-5">
                            <h4 className="text-secondary" align="left">Filter</h4>
                            <p className="text-secondary" >Sort by:</p>
                            <p className="text-secondary" >Categories</p>
                            <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle} >
                                <DropdownToggle caret>
                                    {this.putNameCategories()}
                                </DropdownToggle>
                                <DropdownMenu>
                                    {this.putDataCategories()}
                                </DropdownMenu>
                            </Dropdown>
                            <br />
                            <p className="text-secondary" >Kota</p>
                            <Dropdown isOpen={this.state.dropdownOpenKota} toggle={this.toggleKota}>
                                <DropdownToggle caret>
                                    {this.putNameKota()}
                                </DropdownToggle>
                                <DropdownMenu>
                                    <DropdownItem ><a className="text-secondary" href={`/categories?id=${categories}`}>All</a></DropdownItem>
                                    {this.putDataKota()}
                                </DropdownMenu>
                            </Dropdown>
                            {/* <Form>
                                <FormGroup>
                                    <div>
                                        <CustomInput type="checkbox" id="exampleCustomCheckbox" label="Check this custom checkbox" />
                                        <CustomInput type="checkbox" id="exampleCustomCheckbox2" label="Or this one" />
                                        <CustomInput type="checkbox" id="exampleCustomCheckbox3" label="But not this disabled one" disabled />
                                    </div>
                                </FormGroup>
                            </Form> */}
                            <ul class="list-unstyled">
                                <li></li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-md-9 turuninProductList">
                        <h1 className="text-muted">{this.putNameCategories()}</h1>
                        <div className="container row">
                            {this.putDataReferProduct()}
                        </div>
                    </div>
                </div>
            </div >
        )
    }
}
export default Categories;
