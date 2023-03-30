<template>
  <div class="single-patient">
    <div class="container">
      <!-- <h2>Patient Name: {{ myObject.name }}</h2> -->
      <!-- <p>{{ myObject }}</p> -->
      <form class="form" @submit.prevent="updatePatient">

        <label for="username">Username</label>
        <input v-model="myObject.name" type="text" name="username" autocomplete="off" required="true" />

        <label for="disease">Disease</label>
        <input v-model="myObject.disease" type="text" name="disease" autocomplete="off" required="true" />

        <label for="medication">Medication</label>
        <input v-model="myObject.medication" type="text" name="medication" autocomplete="off" required="true" />




        <button type="submit" :disabled="!user.isAdmin" class="btn submit">Update</button>
      </form>
      <button @click="deletePatient" :disabled="!user.isAdmin" class="btn delete">Delete patient</button>

    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: null,

    }
  },

  methods: {
    updatePatient(event) {
      event.preventDefault();

      const disease = event.target.disease.value.split(',')
      const medication = event.target.medication.value.split(',')
      const patient = {
        id: this.user.id,
        pId: this.myObject.pId,
        name: this.myObject.name,
        disease,
        medication
      }


      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify(patient);

      var requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };

      fetch("http://localhost:8000/patient/update", requestOptions)
        .then(response => response.text())
        .then(result => {
          this.$router.push('/allPatients')

        })
        .catch(error => console.log('error', error));

    },
    deletePatient() {

      const data = {
        id: this.user.id,
        pId: this.myObject.pId
      }
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify(data);

      var requestOptions = {
        method: 'DELETE',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };

      fetch("http://localhost:8000/patient/delete", requestOptions)
        .then(response => response.text())
        .then(result => {
          this.$router.push('/allPatients')

        })
        .catch(error => console.log('error', error));
    }
  },
  name: 'MyPage',
  props: {
    myObject: {
      type: Object,
      required: true
    }
  },
  created() {
    this.user = JSON.parse(localStorage.getItem('userData'))

  }
}
</script>

<style scoped>

.single-patient {
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
.container form {
  display: flex;
  flex-direction: column;
  align-items: left;
  width: 80%;
  margin-bottom: 20px;

}
label{
  font-weight: bolder;
  font-size: larger;
}

input{
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

  .submit{
    width: 100%;
  }
  .delete{
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
