<template>
  <div id="app">
    <nav id="nav">
      <div id="left">
        <img src="./assets/TeslonCarenationLogo.png" alt="">
      </div>

      <div id="right">
        <div v-if="user" class="loggedIn">
          <button>
            <router-link :to="{ name: 'update' }">
              <font-awesome-icon icon="fa-solid fa-circle-user" size="2x" class="profile" />
            </router-link>
          </button>
          <button @click="logoutUser" class="button">LOGOUT</button>
        </div>
        <div v-else>
          <button @click="loginUser" class="button">LOGIN</button>
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
    logoutUser() {
      localStorage.removeItem('userData')
      this.user = null
      window.location.pathname = '/';

    },
    loginUser() {
      this.$router.push('/login')
    }
  },
  created() {
    if (localStorage.getItem("userData")) {

      this.user = JSON.parse(localStorage.getItem("userData"))
    }
  }
}
</script>


<style scoped>
#app{
  display: flex;
  flex-direction: column;
}

nav {
  flex: 1;
  display: flex;
  background-color: white;
  /* margin: 10px 40px; */
  -webkit-box-shadow: 0px 2px 21px -10px rgba(0, 0, 0, 0.59);
  -moz-box-shadow: 0px 2px 21px -10px rgba(0, 0, 0, 0.59);
  box-shadow: 0px 2px 21px -10px rgba(0, 0, 0, 0.59);
}

#left {
  flex: 1;
  padding: 10px 50px;
}

#left img {
  width: 100px;
}




#right {
  flex: 1;
  display: flex;
  justify-content: right;
  padding: 10px 50px;

}

#right .profile {
  color: var(--base-color);

  /* background-color: red; */
}

#right .loggedIn {
  display: flex;
  gap: 10px;
}

#right .button {



  background-image: linear-gradient(to right, var(--base-color) 0%, var(--base-dark-color) 51%, var(--base-light-color) 100%);
  padding: 5px 10px;
  text-align: center;
  text-transform: uppercase;
  transition: 0.5s;
  background-size: 200% auto;
  color: white;
  box-shadow: 0 0 20px #eee;
  border-radius: 5px;
  display: block;
}

#right .button:hover {
  background-position: right center;
}
</style>

