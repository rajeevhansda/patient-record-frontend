<template>
  <div class="patientRegister">
    <h2>Patient Register</h2>
    <form class="form" @submit.prevent="registerUser">

      <label for="username">Username</label>
      <input v-model="name" type="text" name="username" autocomplete="off" required="true" />

      <label for="disease">Disease</label>
      <input v-model="disease" type="text" name="disease" autocomplete="off" required="true" />

      <label for="medication">Medication</label>
      <input v-model="medication" type="text" name="medication" autocomplete="off" required="true" />




      <button type="submit" :disabled="!user.isAdmin">Register</button>
    </form>

  </div>
</template>
<script>
export default {
  data() {
    return {
      name: "",
      disease: [],
      medication: [],
      user: null
    }
  },
  methods: {
    registerUser(event) {
      event.preventDefault();

      const arrayDisease = event.target.disease.value.split(',')
      const arrayMedication = event.target.medication.value.split(',')

      const patient = {
        id:this.user.id,
        name:event.target.username.value,
        disease: arrayDisease,
        medication: arrayMedication
      }
      console.log(patient);


      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify(patient);

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };

      fetch("http://localhost:8000/patient/register", requestOptions)
        .then(response => response.text())
        .then(result => {
          console.log(result)
          this.$router.push('/')
        })
        .catch(error => console.log('error', error));


    }
  }, created() {
    this.user = JSON.parse(localStorage.getItem('userData'))

  }
}
</script>