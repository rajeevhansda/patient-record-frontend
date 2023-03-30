<template>
  <div class="home">
    <form class="form" @submit.prevent="searchPatient">

      <input v-model="search" type="text" name="search" autocomplete="on" required="true" placeholder="Search Patient" />
      <button type="submit" class="btn" :disabled="loading">
        <font-awesome-icon icon="fa-solid fa-magnifying-glass" size="xl" />
      </button>
    </form>
    <button class="btn-addPatient"><router-link :to="{ name: 'registerPatients' }">Add Patient</router-link></button>
    <div v-if="search.length === 0">
      <div class="box" v-for="(patient, index) in allPatients" :key="index">
        <div class="patient-details">
          <div class="patient-image">
            <font-awesome-icon icon="fa-solid fa-circle-user" size="4x" class="profile-icon" />
          </div>
          <div class="patient-name">{{ patient.name }}</div>
          <div class="patient-info">
            <div class="disease">
              <h2>Diseases: </h2>
              <ul>
                <li v-for="(dis, index) in patient.disease" :key="index">{{ dis }},</li>
              </ul>
            </div>
            <div class="medication">
              <h2>Medications: </h2>
              <ul>
                <li v-for="(med, index) in patient.medication" :key="index">{{ med }},</li>
              </ul>
            </div>
          </div>
        </div>
        <div>
          <button class="btn-addPatient"><router-link
              :to="{ name: 'singlePatients', params: { myObject: JSON.stringify({ pId: patient._id, name: patient.name, disease: patient.disease, medication: patient.medication }) } }">Update
              Patient</router-link></button>
        </div>
      </div>
    </div>


    <div>
      <div class="box" v-for="(patient, index) in patients" :key="index">
        <div class="patient-details">
          <div class="patient-image">
            <font-awesome-icon icon="fa-solid fa-circle-user" size="4x" class="profile-icon" />
          </div>
          <div class="patient-name">{{ patient.name }}</div>
          <div class="patient-info">
            <div class="disease">
              <h2>Diseases: </h2>
              <ul>
                <li v-for="(dis, index) in patient.disease" :key="index">{{ dis }},</li>
              </ul>
            </div>
            <div class="medication">
              <h2>Medications: </h2>
              <ul>
                <li v-for="(med, index) in patient.medication" :key="index">{{ med }},</li>
              </ul>
            </div>
          </div>
        </div>
        <div>
          <button class="btn-addPatient"><router-link
              :to="{ name: 'singlePatients', params: { myObject: JSON.stringify({ pId: patient._id, name: patient.name, disease: patient.disease, medication: patient.medication }) } }">Update
              Patient</router-link></button>
        </div>
      </div>
    </div>
    <div class="container">

      <!-- <router-link :to="{ name: 'allPatients' }">
        <div class="card">All Patient</div>
      </router-link> -->

      <!-- <div class="patientCard" v-for="(patient, index) in allPatients" :key="index">
        <router-link
          :to="{ name: 'singlePatients', params: { myObject: JSON.stringify({ pId: patient._id, name: patient.name, disease: patient.disease, medication: patient.medication }) } }">Update
          Patient</router-link>
        <p>Name: {{ patient.name }}</p>
        <p>Disease</p>
        <ul>
          <li v-for="(dis, index) in patient.disease" :key="index">{{ dis }}</li>
        </ul>
        <p>Medication</p>
        <ul>
          <li v-for="(med, index) in patient.medication" :key="index">{{ med }}</li>
        </ul>
      </div> -->
      <!-- <div class="p-card" v-for="(patient, index) in patient" :key="index">
        <router-link
          :to="{ name: 'singlePatients', params: { myObject: JSON.stringify({ pId: patient._id, name: patient.name, disease: patient.disease, medication: patient.medication }) } }">Update
          Patient</router-link>
        <p>Name: {{ patient.name }}</p>
        <p>Disease</p>
        <ul>
          <li v-for="(dis, index) in patient.disease" :key="index">{{ dis }}</li>
        </ul>
        <p>Medication</p>
        <ul>
          <li v-for="(med, index) in patient.medication" :key="index">{{ med }}</li>
        </ul>
      </div> -->
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      patients: null,
      allPatients: null,
      loading: false,
      search: "",
    }
  },
  watch: {
    search(newValue, oldValue) {
      if(newValue === null){
        this.patients = null
      }else if(oldValue){
        this.patients = null
      }
    }
  },
  
  created() {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };

    fetch("http://localhost:8000/patient/all", requestOptions)
      .then(response => response.text())
      .then(result => {
        this.allPatients = JSON.parse(result)
      })
      .catch(error => console.log('error', error));


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
.home {
  padding: 50px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

form {
  display: flex;
  gap: 10px;
}

form input {
  flex: 1;
  padding: 5px 0px;
  outline: none;
  border-bottom: 1px solid var(--base-color);
}

form button {
  width: max-content;
  color: var(--base-color);
}

.btn-addPatient {




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
  width: max-content;
}

.btn-addPatient:hover {
  background-position: right center;
}




.box {
  display: flex;
  flex-direction: column;
  border: 1px solid lightgray;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 20px;
  transition: 0.1s;
}

.box:hover {
  transform: scale(1.02);
}

.patient-details {
  display: flex;
  padding: 10px;
  gap: 20px;
}
@media only screen and (max-width: 768px) {
  .patient-details {
  flex-direction: column;
}
}
.patient-image {
  /* flex: 1; */
  display: block;

}

.profile-icon {
  color: var(--base-color);
}

.patient-name {
  font-weight: bolder;
  font-size: larger;

}

.patient-info {
  flex: 1;

}

.disease,
.medication {
  display: flex;
  gap: 10px;
}

.disease h2,
.medication h2 {

  color: var(--base-dark-color);
  font-weight: 900;
}

.disease ul,
.medication ul {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}</style>
