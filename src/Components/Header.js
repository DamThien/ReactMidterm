import React from "react";
import { Component } from "react";

class Header extends Component {
    render(){
        return(

            <div class="header">
                <div class="top_header">
                    <h1>THANH NIÊN</h1>
                </div>
                <div>
                    <ul class="nav_bar">
                        <li>Thế giới</li>
                        <li>Chỉnh sửa</li>
                    </ul>
                </div>
            </div>

        )
    }
}

export default Header;
