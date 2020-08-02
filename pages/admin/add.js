import React, {Component} from 'react';
import { Field, reduxForm } from "redux-form";
import Partials from '../main/Partials';
import axios from 'axios';
import {
    getFromStorage,
    setInStorage
  } from  '../utils/storage';
  
export default class Add extends Component{
    constructor(props) {
        super(props);
          this.state = {
            fullname: '',
            nickname:'',
            bio:'',
            selectedFile: null
         };
       
      }
    

   
      uploadFile = event =>{
        this.setState({
            selectedFile: event.target.files[0],
            loaded: 0,
          })
      }
      handleChange  = (event)=>{
        const target =  event.target;
        const name = target.name;
        const value =  target.value;

        this.setState({
            [name]: value
        })
      };
      submit = (event)=>{
        event.preventDefault();
        const data = new FormData() 
            data.append('file', this.state.selectedFile)  
            data.append('fullname',this.state.fullname)
            data.append('nickname',this.state.nickname)
            data.append('bio',this.state.bio)      
        axios({
            method: 'post',
            url: 'http://localhost:5000/admin/addfile',
            data:data,
            config: { headers: {'Content-Type': 'multipart/form-data' }}
        })
            .then(function (response) {
                //handle success
                alert('User created successfully');
                window.location='/admin/dashboard'
            })
            .catch(function (response) {
                //handle error
                console.log(response);
            });
      };
    render(){
    
    return(
        <div>
        <Partials />
           <div className="container">
            <div className="admin_">
            <div className="row">
                <div className="col-md-6">
                    <h3>Add Contestants</h3>
                </div>
            </div>
                <div className="row justify-content-left">
                    <div className="col-md-6">
                    <form onSubmit={this.submit}>
                        <div className="form-group">
                        <label>full name</label>
                            <input type="text" name="fullname" value={this.state.fullname} onChange={this.handleChange}  className="form-control" placeholder="Full name" />
                        </div>
                        <div className="form-group">
                        <label>nick name</label>
                            <input type="text" name="nickname" value={this.state.nickname} onChange={this.handleChange} className="form-control" placeholder="nick name" />
                        </div>
                        <div className="form-group">
                        <label>bio</label>
                            <textarea type="text"  name="bio" value={this.state.bio} onChange={this.handleChange}  className="form-control" placeholder="bio"></textarea>
                        </div>
                            
                        <div className="form-group">
                        <label>Profile / Image</label>
                            <input type="file" id="file" name="file" ref="fileUploader" onChange={this.uploadFile}  />
                        </div>

                        <div className="form-group">
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </div>

                        </form>

                    </div>
                </div>
            </div>
           </div>
        </div>
    )
    }
}