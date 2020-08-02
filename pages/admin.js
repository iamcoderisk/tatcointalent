import React, {Component} from 'react';
import Partials from './main/Partials';
import axios from 'axios';
import {
  getFromStorage,
  setInStorage
} from  './utils/storage';

export default class Admin extends Component {
    state = {
        email: '',
        password:'',
        token:''
     };
     componentDidMount(){
       const obj  =  getFromStorage('admin')
       if(obj && obj.token ){
         const { token } = obj;
          console.log(obj)
         axios({
             url:'http://localhost:5000/admin/verifytoken?token='+token,
             method:'GET'
         }).then((response)=>{
             if(response.data.success===true){
               this.setState({
                 token:token
               });
             }

         }).catch((err)=>{
             console.log(err)
         })
       }
     }
     handleChange = (event)=>{
         const target =  event.target;
         const name = target.name;
         const value =  target.value;

         this.setState({
             [name]: value
         })

     };
     submit = (event) =>{
        event.preventDefault();
        const payload = {
            email:this.state.email,
            password: this.state.password
        };

        //initiate axios request
        axios({
            url:'http://localhost:5000/admin/login',
            method:'POST',
            data:payload
        }).then((response)=>{
          if(response.data.success==true){
            setInStorage('admin',response.data.token)
            this.setState({
              token:response.data.token
            })
            window.location='/admin/dashboard';
          }
            // console.log(response.data)
            // if(response.data.statusCode===200){
            //     // alert('registration successful');
            // }

        }).catch((err)=>{
            console.log(err)

          })




     }

    render(){
        return(
        <div>
        <Partials />
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-4">
              <div className="admin_login">
                <h3>Login to Admin </h3>
                <hr />
                <form onSubmit={this.submit}>
                <div className="form-group">
                  <input type="email" name="email"  value={this.state.email} onChange={this.handleChange}  className='form-control'  />
                </div>

                <div className="form-group">
            <input type="password" name="password"  value={this.state.password} onChange={this.handleChange}   className="form-control" />
                </div>

                <div className="form-group text-right">
                <button type="submit" name="submit" class="btn btn-primary">Login</button>
                  </div>


                </form>
              </div>
            </div>
          </div>
        </div>
        </div>
    );

  }
}
