<template>
<!--  <div v-if="auth">-->
  <div class="container mt-2">Container Page</div>
  <div class="row">
    <div class="col-md-4"><router-link to="/">Home</router-link></div>
  </div>

<!--  </div>-->

  <div class="mt-5">
    <template>{{checkAuth()}}</template>
    <router-view class="col-12">

    </router-view>
  </div>

</template>

<script>
export default {
  name: 'About',
  data(){
    return{
      auth:false

    }
  },
  components:{

  },
  methods:{
    checkAuth(){
     if (localStorage.getItem("user")=== "" || localStorage.getItem("user")=== null)
     {
       this.$router.push('login')
     }
     else{

     }
    }
  }


}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.alex{
  color: red ;
  font-weight: bold;
  font-size: 20px;
}

.smart{
  color: blue ;
  font-weight: bold;
  font-size: 20px;
}

.mansoura{
  color: green ;
  font-weight: bold;
  font-size: 20px;
}
</style>
