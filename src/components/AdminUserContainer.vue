<template>
<component :is="target"  @addUserClicked="mytarget"/>   

</template>

<script>
 import AdminListUsers from "./AdminUserListComponent" 
  import Register from "./RegisterComponent" 

export default {
    data (){

        return {
            target: "AdminListUsers"


        }
    } ,  
    methods : {

        mytarget(){

            this.target = "Register"
        }


    } , 

  components:{
    
         AdminListUsers , 
         Register

    
  }

}
</script>

<style scoped>

</style>
