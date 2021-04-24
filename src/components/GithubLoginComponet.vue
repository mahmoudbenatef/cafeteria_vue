<template @submit.prevent>
 <div>
     <h1>login with githubsss</h1>
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
    githubLogin() {
      fetch("http://localhost:8000/api/authorize/github/callback?code="+this.$route.query.code)
        .then((response) => response.json())
        .then((data) => {
           console.log(data);
        
        //   window.location.href=data.url;
           if (data.status === "Error") {
            this.errors = data.message;
          } else {
            localStorage.setItem("user", JSON.stringify(data["user"]));
            this.$router.push("/");
          }
         
          
         
        });
        
        
    },
     

    
  },
   created(){
          this.githubLogin();
          console.log("test");
          console.log(this.$route.query.code)
              
          },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
