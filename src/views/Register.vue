<template>
  <div class="register">
    <div class="container">
      <h2>REGISTER</h2>
      <form class="form" @submit.prevent="registerUser">

        <!-- <label for="username">Username</label> -->
        <input type="text" name="username" autocomplete="on" required="true" placeholder="Enter Name"/>

        <!-- <label for="password">Password</label> -->
        <input type="password" name="password" autocomplete="off" required="true" placeholder="Enter password"/>

        <div class="label-container">

          <label for="isAdmin">Is Admin</label>
          <input type="checkbox" id="isAdmin" name="isAdmin">
        </div>


        <button type="submit" class="btn" :disabled="loading">Register</button>
      </form>
    </div>
  </div>
</template>

<script>

export default {

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

      fetch("https://zany-pink-pronghorn.cyclic.app/user/register", requestOptions)
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
.register {
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
.label-container{
  display: flex;
  flex-direction: column;
}
.label-container input{
  width: max-content;
  align-items: center;
  justify-content: center;
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

.delete {
  width: 80%;
}

.btn:disabled {
  background-image: none;
  background-color: gray;
}

.btn:hover {
  background-position: right center;
}
</style>








