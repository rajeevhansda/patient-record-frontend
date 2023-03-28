<template>
  <div class="home">
    <h2>HOME</h2>
    <form class="form" @submit.prevent="searchPatient">

      <label for="search">Search Patient: </label>
      <input type="text" name="search" autocomplete="on" required="true" />




      <button type="submit" class="btn" :disabled="loading">Search</button>
    </form>
    <div class="container">
      <div class="card">
        <router-link :to="{ name: 'allPatients' }">All Patient</router-link>
      </div>
      <div class="p-card" v-for="(patient, index) in patients" :key="index">
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
      loading: false
    }
  },
  methods: {
    searchPatient(event) {
      event.preventDefault();

      const search = event.target.search.value;

      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
        "search": search
      });

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };

      fetch("http://localhost:8000/patient/search", requestOptions)
        .then(response => response.text())
        .then(result => {
          this.patients = JSON.parse(result)
        })
        .catch(error => console.log('error', error));




    }
  }
}
</script>
<style scoped>
.container {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.card {
  display: flex;
  width: calc(100% / 3.1);
  aspect-ratio: 2 / 1;
  background-color: lightgray;
  border-radius: 5px;
  align-items: center;
  justify-content: center;
}
.p-card {
  display: flex;
  flex-direction: column;
  background-color: lightgray;
  border-radius: 5px;
  align-items: center;
  padding: 20px;
}
</style>
