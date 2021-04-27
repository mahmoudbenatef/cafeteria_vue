<template>

  <div class="container">
    <div class="row">
      <div class="col-9">
          <div class="form-group m-1">
            <input
                v-model="room"
                class="form-control"
                placeholder="Room Number"
                type="text"
            />
          </div>
      </div>
      <div class="col-2">
        <input type="Submit" @click="addRoom(room)" value="Add room" class="btn btn-success btn-sm form-group m-1" />
      </div>

    </div>
    <p class="errors">
          <span v-if="'number' in errors">
            {{ errors["number"][0]  }}
          </span>
    </p>

  </div>

</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    errors: Array,
    room: String
  },
  data(){
    return{
      // room:""
    }
  },
  methods:{
    addRoom(room){
      this.$emit("addRoom",room)
    }
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
