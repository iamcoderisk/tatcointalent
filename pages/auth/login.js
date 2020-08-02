import React, {Component} from 'react';
import ReactNotification from 'react-notifications-component'
import { store } from 'react-notifications-component';
import axios from 'axios';
import Partials from '../main/Partials';
import Progress from "react-progress-2";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faEye } from "@fortawesome/free-solid-svg-icons";
import {
    getFromStorage,
    setInStorage
  } from  '../utils/storage';

//   const eye = <FontAwesomeIcon icon={faEye} />;
export default class Login extends Component{
    state = {
        email: '',
        token:''
       
     };
     componentDidMount(){
       // console.log(getFromStorage('ref_username'));
       const obj  =  getFromStorage('voter')
       if(obj && obj.token ){
         const { token } = obj;
          // console.log(obj)
         axios({
             url:'localhost:5000/admin/verifyvoter/verifytoken?token='+token,
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
       Progress.show();
        event.preventDefault();
        const payload = {
            email:this.state.email
        };

        //initiate axios request
        axios({
            url:'http://localhost:5000/admin/loginvote',
            method:'POST',
            data:payload
        }).then((response)=>{
          if(response.data.success==true){
            setInStorage('voter',response.data.token)
            this.setState({
              token:response.data.token
            })
            window.location='/';
          }
            // console.log(response.data)
            // if(response.data.statusCode===200){
            //     // alert('registration successful');
            // }
        
        }).catch((err)=>{
            console.log(err)
        });





     }

    


    render() {
        return(
            <div>
                <Partials />
                <Progress.Component/>
                <ReactNotification />
                <div className="container">
                    <div className="login_center">
                        <div className="row justify-content-center">
                            <div className="col-md-6">
                                <h3>Login</h3>
                            </div>

                        </div>
                        
                        <div className="row justify-content-center">
                            <div className="col-md-6">
                            <p>Vote via <strong>ABiT SSO</strong></p>
                                <br />

                                <form onSubmit={this.submit}>
                                    <div className="row px-3"> <label className="mb-1">
                                    <h6 className="mb-0 text-sm">Email Address</h6>
                        </label> <input className="mb-4 form-control" type="text" name="email"  value={this.state.email} onChange={this.handleChange} placeholder="Enter a valid email address" />
                         </div>
                    
                               

                                    <div className="row mb-3 px-3">
                                    <button type="submit" className="btn btn-primary  text-center">Continue</button> </div>

                                    </form>
                                    <div className="row px-3 mb-4">
                                        <div className="line"></div> <small className="or text-center">Or</small>
                                        <div className="line"></div>
                                    </div>
            

                            </div>

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}