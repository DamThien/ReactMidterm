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
            price: '',
            image: '',
            quantity: '',
            oldPrice: '',
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
                    price: data.price,
                    image: data.image,
                    quantity: data.quantity,
                    oldPrice: data.oldPrice,
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
    onChangeImage = (event) => {
        this.setState({
            [event.target.name]: "images/" + event.target.files[0].name,
        });
        console.log(event.target.files[0].name);
    }
    showEditProduct = (id) => {
        var product = this.getProduct(id);
        this.setState({
            id: product.id,
            name: product.name,
            price: product.price,
            oldPrice: product.oldPrice,
            image: product.image,
            quantity: product.quantity,
        });
        document.getElementById('image-edit').style.display = 'block';
        alert(id);
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
            if (this.state.name !== '' && this.state.price !== '' && this.state.quantity !== '' && this.state.image !== '' && this.state.oldPrice !== '') {
                axios({
                    method: 'POST',
                    url: `https://61bc10bdd8542f0017824522.mockapi.io/products/`,
                    data: {
                        name: this.state.name,
                        price: this.state.price,
                        oldPrice: this.state.oldPrice,
                        image: this.state.image,
                        quantity: this.state.quantity,
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
                    price: this.state.price,
                    oldPrice: this.state.oldPrice,
                    image: this.state.image,
                    quantity: this.state.quantity,
                }

            }).then(res => {
                this.componentDidMount();
                alert("Successfully");
            })
        }
        this.setState({
            id: '',
            name: '',
            quantity: '',
            price: '',
            oldPrice: '',
            image: '',
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
                                <label htmlFor="exampleInputEmail1">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={this.state.name}
                                    onChange={this.onChange}
                                    className="form-control"
                                    id="exampleInputEmail1"
                                    aria-describedby="emailHelp"
                                    placeholder="Enter name"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputPassword1">Quantity</label>
                                <input
                                    type="text"
                                    name="quantity"
                                    onChange={this.onChange}
                                    value={this.state.quantity}
                                    className="form-control"
                                    id="exampleInputPassword1"
                                    placeholder="Quantity"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputEmail2">Price</label>
                                <input
                                    type="text"
                                    name="price"
                                    onChange={this.onChange}
                                    value={this.state.price}
                                    className="form-control"
                                    id="exampleInputEmail2"
                                    aria-describedby="emailHelp"
                                    placeholder="Enter price"
                                />
                            </div>
                            <div className="form-group">
                                <label>Image</label>
                                <input
                                    type="text"
                                    name="image"
                                    onChange={this.onChangeImage}
                                    className="form-control"
                                    placeholder="image"
                                />
                            </div>
                            <div className="form-group" id="image-edit" style={{ display: "none" }}>
                                <label>Image</label>
                                <img src={this.state.image} style={{ width: "100px" }} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputEmail2">Old price</label>
                                <input
                                    type="number"
                                    name="oldPrice"
                                    onChange={this.onChange}
                                    value={this.state.oldPrice}
                                    className="form-control"
                                    id="exampleInputEmail2"
                                    aria-describedby="emailHelp"
                                    placeholder="Enter old price"
                                />
                            </div>
                            <button type="submit" className="btn btn-primary">
                                Submit
                            </button>
                        </form>
                    </div>
                    <div className="col-8">
                        <div className="row">
                            {
                                this.state.products.map((product) => (

                                    <div className="card col-4" style={{ width: "18rem" }}>
                                        <img className="card-img-top" src={product.image} alt="Card image cap" />
                                        <div className="card-body">
                                            <h5 className="card-title">{product.name}</h5>
                                            <div className="row">
                                                <div className="col-6">
                                                    {
                                                        product.price
                                                    }
                                                </div>
                                                <div className="col-6">
                                                    {
                                                        product.oldPrice
                                                    }
                                                </div>
                                            </div>

                                            <button className="btn btn-primary" onClick={() => this.showEditProduct(product.id)}>
                                                Edit
                                            </button>
                                            <button className="btn btn-danger" onClick={() => this.onDelete(product.id)}>
                                                delete
                                            </button>

                                        </div>
                                    </div>

                                ))
                            }
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

export default List;