<template @submit.prevent>
<template>{{githubLogin()}}</template>
 <div>
     <h1>login with github</h1>
 </div>
</template>

<script>
export default {
  name: "Register",
  data() {
    return {
     
    };
  },
  components: {},
  methods: {
   async githubLogin() {
     let json=await fetch("http://localhost:8000/api/authorize/github/callback?code="+this.$route.query.code)
        //.then((response) => response.json())
      let data=await json.json();
      // .then((data) => {
            console.log(data);
        
        //   window.location.href=data.url;
           if (data.status === "Error") {
            this.errors = data.message;
          } else {
            localStorage.setItem("user", JSON.stringify(data["user"]));
            this.$router.push("/home");
            window.location.href="http://localhost:8080/home";
          }
         
          
         
        // });
        
        
    },
     

    
  },
   created(){
          // this.githubLogin();
          // console.log("test");
          // console.log(this.$route.query.code)
              
          },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
