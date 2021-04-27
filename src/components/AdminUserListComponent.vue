<template>

<div class="container">
    <div class="row">
        <div class="col-9 text-left">

            <span>Users</span>

        </div>
        <div class="col-3 text-right">
            <button class="btn btn-primary"  @click="raiseaddUser" >add user </button>
        </div>
         
    </div>
   
    <div class="row">
        <table class="table table-striped table-bordered col-12">
                <thead>
                    <td>id</td>
                    <td>name</td>
                    <td>email</td>
                    <td>image</td>
                    <td>ext</td>
                     <td>action</td> 



                </thead>
                <tr   v-for="one in users"  :key="one.id">

                        <td v-if="one.isAdmin!=1" >{{one.id}}</td>
                          <td v-if="one.isAdmin!=1" >{{one.name}}</td>
                            <td v-if="one.isAdmin!=1" >{{one.email}}</td>
                              <td  v-if="one.isAdmin!=1"><img :src="one.photo" alt=""  style="width:150px ; height:100px" ></td>                                            
                            <td  v-if="one.isAdmin!=1" >{{one.ext}}</td>
                             <td  v-if="one.isAdmin!=1">
                               <button v-if="one.isAdmin!=1" @click="raiseedituser(one)" class="edit_delete btn  btn-secondary">edit</button>
                                <button v-if="one.isAdmin!=1"  class="btn btn-danger" @click="deleteUser(one.id)">delete </button>
                             </td>
                            







                </tr>
                
        </table>
    </div>
   
</div>

</template>

<script>
import axios from 'axios';

// import users from './users' 
export default {
  name: 'AdminListUsers',
  data : function () {
      return {

             users : []  ,
             accessToken:""
              

      }

      
  } , 
  methods : {

    raiseaddUser(){

      this.$emit("addUserClicked") ; 
    } , 
    

    raiseedituser(user){
      alert(user.id) ;
      this.$emit("editUserClicked", user) ; 
    } , 
    


      deleteUser(id) {
        

          alert(id)

  axios.delete(`http://127.0.0.1:8000/api/user/${id}`, {
      headers: {
        
        Authorization: `Bearer ${this.accessToken}`,      },
    })
     .then(response=>{
              let data = response.data
              console.log(data)
              alert("deleted")
            if (data.status === "Error")
            {
              console.log("error in deletion");
            }
            else {
              this.$router.push('admin')
              console.log("sucess routering ")
                 axios 
        .get('http://127.0.0.1:8000/api/user')
        .then(response => console.log("hello i am alert 21  "))

    fetch('http://127.0.0.1:8000/api/user')
        .then(response => response.json())
        .then(json => {this.users=json.data
          console.log(this.users)
        })

            }

            })

     

    } , 
    getAccessToken (){
      let xx = localStorage.getItem("user") ; 
      console.log("before token", xx)
   console.log("after parsing",JSON.parse(xx)['token']) 
    this.accessToken  =   JSON.parse(xx)['token'] 
   

    }
  },
    created() {
      this.getAccessToken() ;
    axios 
        .get('http://127.0.0.1:8000/api/user')
        .then(response => console.log("hello i am alert 21  "))

    fetch('http://127.0.0.1:8000/api/user')
        .then(response => response.json())
        .then(json => {this.users=json.data
          console.log(this.users)
        })
  }
}
</script>

<style scoped>
span {
    font-family: 'Times New Roman', Times, serif;
    font-size: 33px ;
    
  color:blueviolet;
}
.edit_delete{
    
        margin: 5px;
}

</style>
