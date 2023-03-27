<template>
  <div class="register">
    <form class="form" @submit.prevent="registerUser">

      <label for="username">Username</label>
      <input type="text" name="username" autocomplete="on" required="true" />

      <label for="password">Password</label>
      <input type="password" name="password" autocomplete="off" required="true" />

      <label for="isAdmin">Is Admin</label>
      <input type="checkbox" id="isAdmin" name="isAdmin">


      <button type="submit" class="btn" :disabled="loading">Register</button>
    </form>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'HomeView',
  components: {
    HelloWorld
  },
  data() {
    return {
      loading: false,
    }
  },
  methods: {
    registerUser(event) {
      event.preventDefault();

      const userData = {
        name: event.target.username.value,
        password: event.target.password.value,
        isAdmin: event.target.isAdmin.checked
      }




      //register user
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify(userData);

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };

      fetch("http://localhost:8000/user/register", requestOptions)
        .then(response => response.text())
        .then(result => {
          localStorage.setItem('userData', result)
          window.location.pathname = '/';
          // this.$router.push('/')
        })
        .catch(error => console.log('error', error));


    }
  }
}
</script>








