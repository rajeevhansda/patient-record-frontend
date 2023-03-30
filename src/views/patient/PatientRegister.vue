<template>
  <div class="patientRegister">
    <div class="container">
      <h2>Patient Register</h2>
      <form class="form" @submit.prevent="registerPatient">

        <!-- <label for="username">Username</label> -->
        <input v-model="name" type="text" name="username" autocomplete="off" required="true" placeholder="Patient Full Name"/>

        <!-- <label for="disease">Disease</label> -->
        <input v-model="disease" type="text" name="disease" autocomplete="off" required="true" placeholder="Diseases" />

        <!-- <label for="medication">Medication</label> -->
        <input v-model="medication" type="text" name="medication" autocomplete="off" required="true" placeholder="Medications"/>




        <button class="btn-register" type="submit" :disabled="!user.isAdmin" >Register</button>
      </form>
    </div>


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
    registerPatient(event) {
      event.preventDefault();

      const arrayDisease = event.target.disease.value.split(',')
      const arrayMedication = event.target.medication.value.split(',')

      const patient = {
        id: this.user.id,
        name: event.target.username.value,
        disease: arrayDisease,
        medication: arrayMedication
      }


      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify(patient);

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };

      fetch("https://zany-pink-pronghorn.cyclic.app/patient/register", requestOptions)
        .then(response => response.text())
        .then(result => {
          this.$router.push('/')
        })
        .catch(error => console.log('error', error));


    }
  }, created() {
    this.user = JSON.parse(localStorage.getItem('userData'))

  }
}
</script>
<style scoped>
.patientRegister {
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
}

.container h2 {
  font-weight: bolder;
  text-align: center;
}

.container form {
  display: flex;
  flex-direction: column;
  align-items: center;

}
input{
  outline: 1px solid lightgray;
  width: 80%;
  margin: 20px 0;
  padding: 5px;
}




.btn-register {
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
  width: 80%;
  }
.btn-register:disabled {
  background-image: none;
  background-color: gray;
}

.btn-register:hover {
  background-position: right center;
}
</style>