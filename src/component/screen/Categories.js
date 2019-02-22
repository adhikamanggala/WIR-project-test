import React, { Component } from 'react';
import {
    Card,
    CardImg,
    CardText,
    CardBody,
    CardTitle,
    CardSubtitle,
    Button,
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    CustomInput, Form, FormGroup, Label
} from 'reactstrap';
import Axios from 'axios';
import { API_REFER } from '../../actions/types';
import queryString from 'query-string';
import '../../support/css/filterbox.css'

class Categories extends Component {
    state = {
        dataProductRefer: [],
        dropdownOpen: false,
        categories_data: []
    }
    componentDidMount() {
        this.getReferProduct();
        this.getCategories();
        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState(prevState => ({
            dropdownOpen: !prevState.dropdownOpen
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
    putDataReferProduct = () => {
        var spot = this.state.dataProductRefer.map((item) => {
            var { id, nama, img1, kota } = item
            return (
                // <div className="col-md-4">
                //     <Card>
                //         <CardImg top width="100%" src={img1} alt="Card image cap" />
                //         <CardBody>
                //             <CardTitle>{nama}</CardTitle>
                //             <CardSubtitle>{kota}</CardSubtitle>
                //             <a href={`/referproduct?id=${id}`}><Button>Button</Button></a>
                //         </CardBody>
                //     </Card>
                // </div>
                <div className="col-md-4">
                    <a href={`/referproduct?id=${id}`}>
                        <div className="card mb-4 shadow-sm">
                            <img className="card-img-top" alt="Refer [100%x225]" style={{ height: '225px', width: '100%', display: 'block' }} src={img1} data-holder-rendered="true" />
                            <div className="card-body">
                                <h4 className="card-text">{nama}</h4>
                                <p className="card-text">{kota}</p>
                                <div className="d-flex justify-content-between align-items-center">

                                </div>
                            </div>
                        </div>
                    </a>
                </div>
            )
        })
        return spot;
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
        var putData = FilterCategories.map((item) => {
            var { nama } = item
            return nama;
        })
        return putData;
    }

    render() {
        return (
            <div className="">
                <div className="row">
                    <div className="col-md-2" >
                        <div className="example1">
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
                            <Form>
                                <FormGroup>
                                    <div>
                                        <CustomInput type="checkbox" id="exampleCustomCheckbox" label="Check this custom checkbox" />
                                        <CustomInput type="checkbox" id="exampleCustomCheckbox2" label="Or this one" />
                                        <CustomInput type="checkbox" id="exampleCustomCheckbox3" label="But not this disabled one" disabled />
                                    </div>
                                </FormGroup>
                            </Form>
                            <ul class="list-unstyled">
                                <li><a href=""></a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-md-9">
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
