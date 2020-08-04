import React, {Component} from 'react';
import Link from 'next/link'
import axios from 'axios';
import { getFromStorage,deleteFromStorage,setInStorage} from './utils/storage';
export default class Home extends Component{

  componentDidMount(){
      this.listContestants()
      this.getUserData()
  }

  state = {
  email:'',
  userId:''
  };


  state = {
      contestants:[],
      votecount:''
  };


  listContestants(){
      axios({
          url:'http://localhost:5000/admin/list',
          method:'GET'
      }).then((response)=>{
        console.log(response.data)
        this.setState({
          contestants:response.data.data
        })

      })

    }
    getContestants(){
      return this.state.contestants
    }
   




getUserData(){


  if(getFromStorage('voter')===null){
    window.location='/auth/login'
  }else{
    axios({
        url:'http://localhost:5000/admin/listvoter',
        method:'POST',
        data:{
          userId: getFromStorage('voter')
        }
    }).then((response)=>{
        if(response.data.statusCode===201){
            // window.location='/admin'
        }else{
          // console.log(response.data)
            this.setState({
              email:response.data.email,
              userId:response.data._id
            })

        }
    }).catch((err)=>{


    })

  }

}


voteUser = id => e => {
  e.preventDefault()
  // console.log(getFromStorage('voter'))
  // let payload = {
  //   voter:  getFromStorage('voter'),
  //   cid: id 
  // };
  let formData =  new FormData();
    formData.append('voter',getFromStorage('voter'));
    formData.append('cid',id)
  axios({
    url:'http://localhost:5000/admin/vote',
    method:'POST',
    data:formData
}).then((response)=>{
    if(response.data.statusCode===201){
        // window.location='/admin'
        alert(response.data.msg)
      
    }else if(response.data.statusCode==200){
        // console.log(response.data)
        alert('You have succesfully voted')
        this.listContestants()
        this.getUserData()
    }
}).catch((err)=>{


})
  // // // let id =  id;
  // // alert(id)
  // console.log(getFromStorage('voter'));
  // //check if user is loggedIn 
  
};
   

    render(){
  return(
    <div class="main">
      <div className="intro_page">
         <div className="container">
            <div className="row justify-content-center">
            
              <div className="col-md-5">
              <div className="contest_intro">
                  <div className="row">
                  <h1>Your vote,</h1>
                  
                  </div>
                  <div className="row">
                  <h1>Your Voice!</h1>
                  <p>
                  The Tatcoin talent is offering N1M cash price to any potential winner.
                  Let your votes counts and help your favorite person become the next face of 
                  Tatcoin.
                  </p>

                  
                  </div>
                 
                </div>
              </div>
              <div className="col-md-5">
                <div className="tatcoin_got">
                <img src="/assets/img/talent.svg" className="img-fluid" />

                </div>
            </div>
            </div>
         </div>
      </div>

      <div className="container">
        <div className="contestants">
          <h4>Contestants </h4>
        </div>
        <div className="row">
       

        
        {
                            this.getContestants().map((item,index)=>(
                                       
          <div className="col-md-4 form-group">
            <div className="cont_img">
           
            <div className="contestants_info shadow">
              <div className="container">
                <div className="row">
                <div className="col-md-4">
                <div className="circleProfile">
                <img src={'http://localhost:5000/static/'+item.profileImage} className="img-fluid circle" />
                </div>
                <br />
                <br />
                  <h5>Votes:   <b>{(item.votes)}</b> </h5>
                
                
                </div>
                <div className="col-md-8">
                    <h6>Bio:</h6>
                              <p>
                                {item.bio}
                              </p>
                
                    <div className="row">
                      <div className="col-md-12">
                        <button type="button" onClick={this.voteUser(item._id)}className="btn btn-success">Vote {item.nickname}</button>
                      </div>
           
                    </div>
           
                  
                </div>
               
                </div>
              </div>
            </div>
            </div>
          </div>

          ))}


        


        </div>
      </div>
    </div>
  );

    }
}
