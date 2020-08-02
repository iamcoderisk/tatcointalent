import { getFromStorage } from './storage';
import axios from 'axios';
var  userData = {
    firstname:"",
    lastname:"",
    email:"",
    userId:""
};
  var loggedIn = false ;
export function getUser(){
  var user = {
    userId:getFromStorage('admin')
  }
  loggedIn = true;
  axios({
      url:'http://localhost:8000/admin/getAdmin',
      method:'POST',
      data:user
  }).then((response)=>{
      if(response.data.statusCode===201){
          window.location='/admin'
      }else{
        loggedIn = true ;
        userData.firstname  = response.data.values.firstname;
        userData.lastname = response.data.values.lastname;
        userData.email = response.data.values.email;
        userData.userId = response.data.values._id;
      }
  }).catch((err)=>{
    loggedIn = false
    console.log('error occured while sending data to')
  })
}
export function getFirstname(){
  return userData.firstname;
}
export function getLastname(){
  return userData.lastname;
}
export function getEmail(){
  return userData.email;
}
export function getUserId(){
  return userData.userId;
}
export function isLoggedIn(){
  return isLoggedIn;
}
