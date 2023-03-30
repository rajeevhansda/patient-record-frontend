<template>
  <div class="login">
    <div class="container">
      <h2>LOGIN</h2>
      <form class="form" @submit.prevent="loginUser">

        <label for="username">Username</label>
        <input type="text" name="username" autocomplete="on" required="true" />

        <label for="password">Password</label>
        <input type="password" name="password" autocomplete="off" required="true" />



        <button type="submit" class="btn" :disabled="loading">Login</button>
      </form>
      <div class="register-container">
        <h4>New user</h4>
        
          <router-link :to="{ name: 'register' }"><button class="btn register">Register</button></router-link>
        
      </div>
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
          localStorage.setItem('userData', result)
          window.location.pathname = '/';
          // this.$router.push('/')
        })
        .catch(error => console.log('error', error));


    }
  }

}
</script>

<style scoped>
.login {
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 50px;
}

.container {
    display: flex;
    flex-direction: column;
    outline: 1px solid lightgray;
    border-radius: 5px;
    width: 80%;
    max-width: 400px;
    padding: 20px;
    align-items: center;
}
.container h2{
  font-weight: bolder;
  font-size: larger;
  padding-bottom: 20px;
}
.container h4{
  font-weight: bolder;
  font-size: larger;
}
.container form {
    display: flex;
    flex-direction: column;
    align-items: left;
    width: 80%;
    margin-bottom: 20px;

}

label {
    font-weight: bolder;
    font-size: larger;
}

input {
    outline: 1px solid lightgray;
    width: 100%;
    margin-bottom: 50px;
    padding: 5px;
}



.btn {
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

.submit {
    width: 100%;
}

.register {
    width: 100%;
}

.btn:disabled {
    background-image: none;
    background-color: gray;
}

.btn:hover {
    background-position: right center;
}

.register-container{
width: 80%;
}
</style>
