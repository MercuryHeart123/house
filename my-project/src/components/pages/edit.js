import React, {Component} from 'react'
import { NavLink as Link } from 'react-router-dom';
import { connect } from 'react-redux'
import axios from "axios";

class Edit extends Component{
    constructor(props){
        super(props);
        this.state = {
            AllPost : false,
        }
    }

    componentDidMount(){
        axios.defaults.withCredentials = true;
        let ip = process.env.REACT_APP_IP || "localhost"
        let port = process.env.REACT_APP_PORT || 8080
        const url = `${ip}:${port}/listpost`
        axios.get(url)
        .then((res) => {
            this.setState({
                AllPost : res.data
            })
        })
        .catch((err)=> {
            alert(err.response.data.msg)
        })
      }

    btnClick = () => {
        this.props.dispatch({
            type: 'add'
        })
    }

    CreatePostList = () => {
        return this.state.AllPost.map((item, index) => {
            return (
                    <Link to='/post'>
                        <div onClick={() => {

                            this.props.dispatch({
                                type: 'edit',
                                data: item
                            })
                        }
                        } key={item.uuid}>{item.name}</div>
                    </Link>
                )
        })
    }

    render(){
        return(
            <div>
                <h1>
                    All Post
                </h1>
                {this.state.AllPost &&
                    this.CreatePostList()
                }
                <Link to='/post'>
                    <button type="button" class="btn btn-primary" onClick={this.btnClick}>Add post</button>
                </Link>

            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
      post : state.post
    }
}
export default connect(mapStateToProps)(Edit)