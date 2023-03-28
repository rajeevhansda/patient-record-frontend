<template>
  <div>
    <h2>Patient Name: {{ myObject.name }}</h2>
    <p>{{ myObject }}</p>
    <form class="form" @submit.prevent="updatePatient">

      <label for="username">Username</label>
      <input v-model="myObject.name" type="text" name="username" autocomplete="off" required="true" />

      <label for="disease">Disease</label>
      <input v-model="myObject.disease" type="text" name="disease" autocomplete="off" required="true" />

      <label for="medication">Medication</label>
      <input v-model="myObject.medication" type="text" name="medication" autocomplete="off" required="true" />




      <button type="submit" :disabled="!user.isAdmin">Update</button>
    </form>
    <button @click="deletePatient" :disabled="!user.isAdmin">Delete patient</button>
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
