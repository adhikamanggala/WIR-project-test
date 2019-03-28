import React, { Component } from "react";
import { Table } from "reactstrap";
import axios from "axios";

class ManageProduct extends Component {
    state = {
        nama: "",
        listReferProduct: [],
        selectedEdit: 0
    };

    componentDidMount = () => {
        this.getReferProduct();
    };

    getReferProduct = () => {
        axios
            .get("http://localhost:2019/referproduct")
            .then(res => {
                console.log(res.data);
                this.setState({ listReferProduct: res.data, selectedEdit: 0 });
            })
            .catch(err => {
                console.log(err);
            });
    };

    handleChange = event => {
        event.preventDefault();
        const { name, value } = event.target;
        this.setState({ [name]: value });
    };

    handleAddClick = event => {
        var namaproduct = this.state.nama;
        alert(namaproduct);

        axios
            .post("http://localhost:1990/addreferproduct", {
                namaproduct
            })
            .then(res => {
                this.getReferProduct();
            })
            .catch(err => {
                console.log(err);
            });
    };

    handleSaveClick = id => {
        var nama = this.state.nama;

        axios
            .put("http://localhost:2019/editreferproduct/" + id, {
                nama
            })
            .then(res => {
                this.getReferProduct();
            })
            .catch(err => {
                console.log(err);
            });
    };

    handleDeleteClick = id => {
        if (window.confirm("Yakin dihapus?")) {
            axios
                .delete("http://localhost:2019/deletereferproduct/" + id)
                .then(res => {
                    this.getReferProduct();
                })
                .catch(err => {
                    console.log(err);
                });
        }
    };

    renderCategory = () => {
        var listJSXCategory = this.state.listReferProduct.map(item => {
            if (this.state.selectedEdit === item.id) {
                return (
                    <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>
                            <input
                                type="text"
                                name="nama"
                                onChange={this.handleChange}
                                defaultValue={item.nama}
                            />
                        </td>
                        <td>
                            <input
                                className="btn btn-primary"
                                type="button"
                                value="Save"
                                onClick={() => this.handleSaveClick(item.id)}
                            />
                        </td>
                        <td>
                            <input
                                className="btn btn-danger"
                                type="button"
                                value="Cancel"
                                onClick={() => this.setState({ selectedEdit: 0 })}
                            />
                        </td>
                    </tr>
                );
            }
            return (
                <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.nama}</td>
                    <td>
                        <input
                            className="btn btn-primary"
                            type="button"
                            name="nama"
                            value="Edit"
                            onClick={() => this.setState({ selectedEdit: item.id })}
                        />
                    </td>
                    <td>
                        <input
                            className="btn btn-danger"
                            type="button"
                            value="Delete"
                            onClick={() => this.handleDeleteClick(item.id)}
                        />
                    </td>
                </tr>
            );
        });
        return listJSXCategory;
    };

    render() {
        const hStyle = {
            textAlign: "center",
            paddingTop: "50px"
        };
        return (
            <div>
                <h1 style={hStyle}>Refer Product List</h1>
                <div>
                    <Table bordered>
                        <thead>
                            <tr style={{ textAlign: "center" }}>
                                <th>ID</th>
                                <th>Nama</th>
                                <th />
                                <th />
                            </tr>
                        </thead>
                        <tbody>{this.renderCategory()}</tbody>
                        <tfoot>
                            <td />
                            <td>
                                <input
                                    type="text"
                                    name="nama"
                                    placeholder="Nama Kategori"
                                    onChange={this.handleChange}
                                />
                            </td>
                            <td>
                                <input
                                    type="button"
                                    className="btn btn-success"
                                    value="Add"
                                    onClick={this.handleAddClick}
                                />
                            </td>
                        </tfoot>
                    </Table>
                </div>
            </div>
        );
    }
}

export default ManageProduct;