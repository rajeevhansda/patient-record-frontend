<template>
  <div id="app">
    <nav id="nav">
      <div id="nav-name">
        <h2>{{ user ? `NAME: ${user.name}` : ""  }}</h2>
      </div>
      <div id="nav-item">
        <div v-if="user">
          <button>
            <router-link :to="{name: 'update'}">Profile</router-link>
          </button>
          <button @click="logoutUser">LOGOUT</button>
        </div>
        <div v-else>
          <button @click="loginUser">LOGIN</button>
        </div>

      </div>
    </nav>
    <router-view />
    <!-- <router-view :key="$route.fullPath"/> -->
  </div>
</template>
<script>
export default {
  data() {
    return {
      user: null
    };
  },
  methods: {
    logoutUser(){
      localStorage.removeItem('userData')
      this.user = null
    },
    loginUser(){
      this.$router.push('/login')
    }
  },
  created() {
    if(localStorage.getItem("userData")){

      this.user = JSON.parse(localStorage.getItem("userData"))
    }
  }
}
</script>


<style scoped>
nav {
  display: flex;
  justify-content: space-between;
  border-bottom: 2px solid lightgray;
}

#nav-name,
#nav-item {
  padding: 10px 100px;
}
</style>

