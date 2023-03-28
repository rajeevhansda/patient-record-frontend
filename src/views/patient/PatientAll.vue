<template>
  <div class="allPatient">
    <h2>All Patient</h2>
    <div class="container">
      <div class="card" v-for="(patient, index) in patients" :key="index">
        <p>Name: {{ patient.name }}</p>
        <p>Disease</p>
        <ul>
          <li v-for="(dis, index) in patient.disease" :key="index">{{ dis }}</li>
        </ul>
        <p>Medication</p>

        <ul>
          <li v-for="(med, index) in patient.medication" :key="index">{{ med }}</li>
        </ul>
      </div>
    </div>

  </div>
</template>
<script>
export default {
  data() {
    return {
      patients: null,

    }
  },
  methods: {

  },
  created() {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };

    fetch("http://localhost:8000/patient/all", requestOptions)
      .then(response => response.text())
      .then(result => {
        this.patients = JSON.parse(result)                           
      })
      .catch(error => console.log('error', error));
  }
}
</script>
<style scoped>
.container{
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
.card{
  background-color: lightgray;
  border-radius: 5px;
  padding: 40px;
}
</style>