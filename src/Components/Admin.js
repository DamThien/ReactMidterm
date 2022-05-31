import React, { Component } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
// import { v4 as uuidv4 } from 'uuid';
class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            id: '',
            name: '',
            image: '',
            content: ''
        }
        this.onDelete = this.onDelete.bind(this);
        this.onChange = this.onChange.bind(this);
        this.showEditProduct = this.showEditProduct.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
    }

    componentDidMount() {
        var { match } = this.props;
        if (match) {
            var id = match.params.id;
            axios({
                method: 'GET',
                url: `https://61bc10bdd8542f0017824522.mockapi.io/products/${id}`,
                data: null
            }).then(res => {
                var data = res.data;
                this.setState({
                    id: data.id,
                    name: data.name,
                    image: data.image,
                    content: data.content,
                });
            }).catch(err => {
            });
        }
        axios.get('https://61bc10bdd8542f0017824522.mockapi.io/products/').then(res => {
            this.setState({ products: res.data });
        })
        if (this.state.id == '') {
            document.getElementById('image-edit').style.display = 'none';
        } else {
            document.getElementById('image-edit').style.display = 'block';
        }
    }

    getProduct = (id) => {
        for (var i = 0; i < this.state.products.length; i++) {
            if (this.state.products[i].id === id) {
                return this.state.products[i];
            }
        }
        return null;
    }

    onChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        });
    }

    // onChangeImage = (event) => {
    //     this.setState({
    //         [event.target.name]: "images/" + event.target.files[0].name,
    //     });
    //     console.log(event.target.files[0].name);
    // }

    showEditProduct = (id) => {
        var product = this.getProduct(id);
        this.setState({
            id: product.id,
            name: product.name,
            image: product.image,
            content: product.content,
        });
        document.getElementById('image-edit').style.display = 'block';
        // alert(id);
    }

    getIndexProducts = (id) => {
        for (var i = 0; i < this.state.products.length; i++) {
            if (this.state.products[i].id === id) {
                return i;
            }
        }
        return -1;
    }

    onSave = (event) => {
        event.preventDefault();
        if (this.state.id == '') {
            if (this.state.name !== '' && this.state.image !== '' && this.state.content !== '') {
                axios({
                    method: 'POST',
                    url: `https://61bc10bdd8542f0017824522.mockapi.io/products/`,
                    data: {
                        name: this.state.name,
                        image: this.state.image,
                        content: this.state.content,
                    }
                }).then(res => {
                    this.componentDidMount();
                    alert("Successfully");
                })
            } else {
                alert("Empty something");
            }
        } else {
            axios({
                method: 'PUT',
                url: `https://61bc10bdd8542f0017824522.mockapi.io/products/${this.state.id}`,
                data: {
                    name: this.state.name,
                    image: this.state.image,
                    content: this.state.content,
                }
            }).then(res => {
                this.componentDidMount();
                alert("Successfully");
            })
        }
        this.setState({
            id: '',
            name: '',
            image: '',
            content: '',
        });
    }
    onDelete = (id) => {
        console.log(id);
        axios({
            method: 'DELETE',
            url: `https://61bc10bdd8542f0017824522.mockapi.io/products/${id}`,
            data: null
        }).then(res => {
            if (res.status === 200) {
                var index = this.getIndexProducts(id);
                if (index !== -1) {
                    var products = this.state.products;
                    products.splice(index, 1);
                }
                this.setState({
                    products: products
                });
                alert(id);
                toast.success("Xóa sản phẩm thành công", {
                })

            }
        });
    }


    render() {
        return (
            <div className="container">
                                
                <div className="row">
                    <div className="col-4">
                        <form onSubmit={this.onSave}>
                            <div className="form-group">
                                <label htmlFor="exampleInputEmail1">Title</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={this.state.name}
                                    onChange={this.onChange}
                                    className="form-control"
                                    id="exampleInputEmail1"
                                    aria-describedby="emailHelp"
                                    placeholder="Enter title"
                                />
                            </div>
                            <div className="form-group">
                                <label>Image</label>
                                <input
                                    type="text"
                                    name="image"
                                    value={this.state.image}
                                    onChange={this.onChange}
                                    className="form-control"
                                    id="exampleInputEmail1"
                                    aria-describedby="emailHelp"
                                    placeholder="Enter link"
                                />
                            </div>
                            <div className="form-group" id="image-edit" style={{ display: "none" }}>
                                <label>Image</label>
                                <img src={this.state.image} style={{ width: "100px" }} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputEmail2">Content</label>
                                <input
                                    type="text"
                                    name="content"
                                    value={this.state.content}
                                    onChange={this.onChange}
                                    className="form-control"
                                    id="exampleInputEmail1"
                                    aria-describedby="emailHelp"
                                    placeholder="Enter content"
                                />
                            </div>
                            <button type="submit" className="btn btn-primary">
                                Submit
                            </button>
                        </form>
                    </div>
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>TITLE</th>
                                <th>IMAGE</th>
                                <th>CONTENT</th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                this.state.products.map
                                (
                                    (product) => (
                                    <tr>
                                        <td>{product.id}</td>
                                        <td><h5 className="card-title">{product.name}</h5></td>
                                        <td><img className="image-news" src={product.image} alt="Card image cap" /></td>

                                        <td><h8 className="card-title">{product.content}</h8></td>

                                        
                                            <button className="btn btn-primary" onClick={() => this.showEditProduct(product.id)}>
                                                Edit
                                            </button>
                                        
                                        
                                            <button className="btn btn-danger" onClick={() => this.onDelete(product.id)}>
                                                delete
                                            </button>
                                        
                                    </tr>
                                    )
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>

        );
    }

}

export default List;