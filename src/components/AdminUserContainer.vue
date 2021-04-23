<template>
<component :is="target" @editUserClicked="mytarget2"  @addUserClicked="mytarget"/>   

</template>

<script>
 import AdminListUsers from "./AdminUserListComponent" 
  import Register from "./RegisterComponent" 
    import UpdateUser from "./UserEditByAdmin" 


export default {
    data (){

        return {
            target: "AdminListUsers"


        }
    } ,  
    methods : {

        mytarget(){

            this.target = "Register"
        },
        mytarget2(){

            this.target = "UpdateUser"
        }



    } , 

  components:{
    
         AdminListUsers , 
         Register ,
         UpdateUser

    
  }

}
</script>

<style scoped>

</style>
