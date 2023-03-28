<template>
  <div class="login">
    <h2>LOGIN</h2>
    <form class="form" @submit.prevent="loginUser">

      <label for="username">Username</label>
      <input type="text" name="username" autocomplete="on" required="true" />

      <label for="password">Password</label>
      <input type="password" name="password" autocomplete="off" required="true" />



      <button type="submit" class="btn" :disabled="loading">Login</button>
    </form>
    <div>
      <h4>New user</h4>
      <button>
        <router-link :to="{ name: 'register' }">Register</router-link>
      </button>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      loading: false
    }
  },
  methods: {
    loginUser(event) {
      event.preventDefault();

      const userData = {
        name: event.target.username.value,
        password: event.target.password.value,
      }


      // login user
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify(userData);

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };

      fetch("http://localhost:8000/user/login", requestOptions)
        .then(response => response.text())
        .then(result => {
          console.log(result)
          localStorage.setItem('userData', result)
          window.location.pathname = '/';
          // this.$router.push('/')
        })
        .catch(error => console.log('error', error));


    }
  }

}
</script>
