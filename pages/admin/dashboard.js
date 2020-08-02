import Partials from '../main/Partials';
import React, {Component} from 'react';
import axios from 'axios';
export default class Dashboard extends Component {
    componentDidMount(){
        this.listContestants()
    }

    state = {
        contestants:[]
    };
  
  
    listContestants(){
        axios({
            url:'http://localhost:5000/admin/list',
            method:'GET'
        }).then((response)=>{
        //   console.log(response.data)
          this.setState({
            contestants:response.data.data
          })
  
        })
  
      }
      deleteUser =  id => e =>{
          e.preventDefault();
        
          axios({
            url:'http://localhost:5000/admin/delete',
            method:'POST',
            data: {userId:  id}
        }).then((response)=>{
            if(response.data.status===200){
                alert(response.data.msg)
                this.listContestants()
              
            }
        }).catch((err)=>{
        
        
        })
     
      }
      getContestants(){
        return this.state.contestants
      }

    render(){
        
    return(
        <div>
        <Partials />
            
            <div className="container">
                <div className="contest_add">

                    <div className="row justify-content-center">
                        <div className="col-md-4 form-group  text-lg-center">
                            <div className="adder shadow">
                                <a href="add" className="btn btn-animated">Add Contestants</a>
                            </div>
                        </div>
                        <hr />
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-md-6">
                        <br />
                          
                            <h3>Available Contestants</h3>
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-md-10">
                           
                        <table class="table table-dark">
                            <thead>
                                <tr>
                                <th scope="col"># ID</th>
                                <th scope="col">Fullname</th>
                                <th scope="col">NickName</th>
                                <th scope="col">Total Votes</th>
                                <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                            {
                                                           this.getContestants().map((item,index)=>(

                                                               <tr>

                                                               <td>
                                                                   {item._id}
                                                                   </td>

                                                                   <td>
                                                                   {item.fullname}
                                                                   </td>
                                                                   <td>
                                                                   {item.nickname}
                                                                   </td>
                                                                   <td>
                                                                   {}
                                                                   </td>

                                                                  

                                                                   <td>
                                                                   <button type="button" onClick={this.deleteUser(item._id)} className="btn btn-danger">Delete</button> 
                                                                   </td>


                                                               </tr>


                                                           ))}
                               
                               
                                
                            </tbody>
                            </table>
                        </div>

                    </div>

                </div>
     

            </div>
        </div>
    )
    }
}