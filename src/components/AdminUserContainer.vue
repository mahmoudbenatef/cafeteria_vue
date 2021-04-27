<template>
  <component
    :is="target"
    @editUserClicked="mytarget2"
    @addUserClicked="mytarget"
    @submitAddUserClicked="mytarget3"
    v-bind:myuser="theUser"
  />
</template>

<script>
import AdminListUsers from "./AdminUserListComponent";
import Register from "./AddUserByAdmin";
import UpdateUser from "./UserEditByAdmin";

export default {
  data() {
    return {
      target: "AdminListUsers",
      theUser: [],
      testprops: "kaoud me ",
    };
  },
  methods: {
    mytarget() {
      this.target = "Register";
    },
    mytarget2(data) {
      this.theUser = data;
      this.target = "UpdateUser";
    },
    mytarget3(data) {
      this.target = data;
    },
  },

  components: {
    AdminListUsers,
    Register,
    UpdateUser,
  },
};
</script>

<style scoped>
</style>
