<template>

<h1>Home</h1>

<AdminUserContainer></AdminUserContainer>


</template>

<script>
 import AdminUserContainer from "./AdminUserContainer" 

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  } ,
  components:{
    
         AdminUserContainer 
         

    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
