import React, { Component } from 'react'
import axios from 'axios';
// import "./new.css";
import Content from './Content';

 class Top_content extends Component {
  constructor(props){
    super(props);
    this.state = {
       products: [] 
    };
    this.componentDidMount = this.componentDidMount.bind(this);
  }
  componentDidMount() {  
      axios.get('https://61bc10bdd8542f0017824522.mockapi.io/products')
    .then(res => {
      const products = res.data;
      this.setState({products});
    })
    .catch(error => console.log(error));
  }

  render() {
    return (
      <div className="container">
        <h2>THẾ GIỚI</h2>
        <br></br>
        <div className="row">
          <div className="col-md-6">{print(this.state.products, 0,"TG")}</div>
          <div className="col-md-6">{print(this.state.products, 2,"TG")}</div>
        </div>
      </div>
    );
  }
}


const print = (arr,status)=>{
  let main,list=[];
    arr.map((products,index,array) => 
      {
        if (array.length - 1 === index) {
        main = (
          <div className="left">
            <br></br>
            <h3> {products.name}</h3>
            <img src={products.image} alt="Lamp" ></img>
                <p>{products.content}</p>
          </div>
        );
        } else {
           list[index]= (
            <div className="row" id="newleft">
                <div className="col-md-8"><h2>{products.name}</h2></div>                   
                <div className="col-md-4">
                <img style={{width:"100%"}} src={products.image} alt="Lamp"></img>
                </div>
               <div className="col-md-8"><p>{products.content}</p></div>
             </div>
           );
        }
      }
 
    );
    if(status === 0){
      return main
    }
    else {
      return list
    }
}
export {Top_content,print}

// export default Content;