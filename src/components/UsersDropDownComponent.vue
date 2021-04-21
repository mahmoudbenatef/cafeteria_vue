<template>

<h1>Home</h1>
</template>

<script>
import axios from "axios";

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  created() {
    axios
        .get('http://127.0.0.1:8000/api/room')
        .then(response => (console.log("response")))

    fetch('http://127.0.0.1:8000/api/room')
        .then(response => response.json())
        .then(json => {this.rooms=json.data
          console.log(this.rooms)
        })
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
