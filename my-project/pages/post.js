import React, {Component} from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { Navigate } from 'react-router-dom';
import { NavLink as Link } from 'react-router-dom';


class Post extends Component{
    constructor(props){
        super(props);
        this.state = {
            redirect : false,
            files : [],
            image : [],
        }
    }
    // createForm = () => {
    //     if(!this.props.post){
    //         return (
                
    //           )
    //     }
    // }

    handleSubmit = async(event) => {
        event.preventDefault()
        let name = event.target.name.value
        let price = event.target.price.value
        let type = event.target.type.value
        let description = event.target.description.value
        let status = event.target.status.value
        let uid = this.props.post.uuid
        let ip = process.env.REACT_APP_IP || "localhost"
        let port = process.env.REACT_APP_PORT || 8080
        const url = `${ip}:${port}/post` 
        const formData = {  
            name,
            price,
            type,
            description,
            status,
            image : this.state.image,
            uid,
        };
        axios.defaults.withCredentials = true;
        axios.post(url, formData)
        .then((res) => {
            console.log(res);
            this.setState({
                redirect: true
            })
            
        })
        .catch((err)=> {
            alert(err.response.data.msg)
        })
      }

    handleFileChange(change){
        let fileList = this.state.files;
        for(let i=0;i<change.length;i++){
            this.parseImg(change[`${i}`])
            fileList.push(change[`${i}`])
        }
        this.setState({
            files : fileList
        })
        

    }

    parseImg(img){
        let reader = new FileReader();
        reader.onload = (e) => {
            let list = this.state.image
            list.push(e.target.result)
            this.setState({
                image: list,

            });
        };
        reader.readAsDataURL(img);
    }

    onClickDelete(){
        let uid = this.props.post.uuid
        let ip = process.env.REACT_APP_IP || "localhost"
        let port = process.env.REACT_APP_PORT || 8080
        const url = `${ip}:${port}/deletepost` 
        const formData = {  
            uid,
        };
        axios.defaults.withCredentials = true;
        axios.post(url, formData)
        .then((res) => {
            console.log(res);
            this.setState({
                redirect: true
            })
            
        })
        .catch((err)=> {
            alert(err.response.data.msg)
        })
    }
    async componentDidMount(){
        if(this.props.post){
            let arr = []
            for(let i=0;i<this.props.post.path.length;i++){
                console.log(i);
                let ip = process.env.REACT_APP_IP || "localhost"
                let port = process.env.REACT_APP_PORT || 8080
                const url = `${ip}:${port}/getbase64`
                let path = this.props.post.path[i] 
                const formData = {  
                    path,
                };
                axios.defaults.withCredentials = true;
                let res = await axios.post(url, formData)
                arr.push(`data:image/png;base64,${res.data}`)
                console.log(res.data);

            }
            // console.log(arr);
            this.setState({
                image : arr
            })
        }
    }

    async callPathToBase64(path){
        return await new Promise((resolve, reject) => {
            let ip = process.env.REACT_APP_IP || "localhost"
            let port = process.env.REACT_APP_PORT || 8080
            const url = `${ip}:${port}/getbase64` 
            const formData = {  
                path,
            };
            axios.defaults.withCredentials = true;
            axios.post(url, formData)
            .then( (res) => {
                resolve(res.data)
            })
        })
        
    }
    
    render(){

        if(this.state.redirect){
            return <Navigate to='/edit'/>;
        }
        
        let createImg = this.state.image.map((item, index) => {
            console.log("create",this.state.image,this.state.files);
            return  (
                <div style={{display:'inline-block',position:'relative'}}>
                    <img src={item} style={{maxHeight:'10vw',maxWidth:'100%',height:'auto', margin:'0.5vw'}}  class="img-fluid"/>
                    <Link style={{
                        position:'absolute',
                        top:'10px',
                        right:'16px',
                        textDecoration:'none',
                        fontSize:'2vw'
                    }} to="/post"  onClick={() => {
                        this.state.files.splice(index,1)
                        this.state.image.splice(index,1)
                        this.setState({
                            files : this.state.files,
                            image : this.state.image
                        })

                    }}>X</Link>
                </div>
            )
        })

        return(
            <div style={{display:'flex',flexWrap:'wrap',justifyContent:'center'}}>
                <div style={{flexBasis:'100%',height:'2vh'}}></div>
                
                <section style={{marginRight:'3vw',minWidth:'40vw',maxWidth:'40vw'}}>
                    <div class="mb-3">
                        <input class="form-control" type="file" id="formFile" 
                        onChange={ (e) => this.handleFileChange(e.target.files) }
                        multiple="multiple"/>
                    </div>
                    {createImg}
                    
                </section>

                <section style={{width:'30vw',textAlign:'left'}}>
                    <form id='all-data' onSubmit={this.handleSubmit}>
                        <div class="mb-3">
                          <label for="exampleInputEmail1" class="form-label">Name</label>
                          <input type="text" class="form-control" name='name' defaultValue={this.props.post.name} id="exampleInputEmail1" aria-describedby="emailHelp"/>
                        </div>
                        <div class="mb-3">
                          <label for="exampleInputPassword1" class="form-label">Price</label>
                          <input type="text" class="form-control" name='price' defaultValue={this.props.post.price} id="exampleInputPassword1"/>
                        </div>
                        <div class="mb-3">
                          <label for="exampleInputPassword1" class="form-label">Type</label>
                          <input type="text" class="form-control" name='type' defaultValue={this.props.post.type} id="exampleInputPassword1"/>
                        </div>
                        <div class="mb-3">
                            <label for="exampleFormControlTextarea1" class="form-label">Description</label>
                            <textarea class="form-control" name='description' defaultValue={this.props.post.description} id="exampleFormControlTextarea1" rows="4"></textarea>
                        </div>
                        <select class="form-select" id='status' required aria-label="Default select example">
                            <option value={this.props.post.status} selected disabled hidden>{this.props.post.status || "Select status"}</option>
                            <option value="listing">Listing</option>
                            <option value="sold">Sold</option>
                        </select>
                        <br/>
                        
                    </form>
                    
                </section>
                <div style={{flexBasis:'100%',height:'2vh'}}></div>
                
                {this.props.post && 
                            <button onClick={() => {this.onClickDelete()}} class="btn btn-danger">
                                {"Delete Post"}
                            </button>
                        }
                <div style={{width:'1vw',height:'auto',display:'inline-block'}}/>
                <button form='all-data' type="submit" class="btn btn-primary">
                            {this.props.post ? "Update post" : "Create Post"}
                </button>

                
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
      post : state.post
    }
}
export default connect(mapStateToProps)(Post)