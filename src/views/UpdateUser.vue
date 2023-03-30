<template>
    <div class="update">
        <dvi class="container">
            <h2>UPDATE</h2>
            <form class="form" @submit.prevent="updateUser">

                <input v-model="user.name" type="text" name="username" autocomplete="on" required="true" />




                <button type="submit" class="btn" :disabled="loading">Update User</button>
            </form>
            <button class="btn delete" @click="deleteUser">Delete User</button>
        </dvi>

    </div>
</template>


<script>
export default {

    created() {
        this.user = JSON.parse(localStorage.getItem('userData'))
    },
    data() {
        return {
            message: "Hello, World!",
            user: null,
            loading: false
        };
    },
    methods: {
        deleteUser() {

            // delete user

            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            var raw = JSON.stringify({
                "id": this.user.id
            });

            var requestOptions = {
                method: 'DELETE',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };

            fetch("http://localhost:8000/user/delete", requestOptions)
                .then(response => response.text())
                .then(result => {
                    localStorage.removeItem('userData')
                    this.user = null
                    window.location.pathname = '/';

                })
                .catch(error => console.log('error', error));

        },
        updateUser(event) {
            event.preventDefault();

            // update user

            const userData = {
                id: this.user.id,
                name: this.user.name
            }

            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            var raw = JSON.stringify(userData);

            var requestOptions = {
                method: 'PUT',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };

            fetch("http://localhost:8000/user/update", requestOptions)
                .then(response => response.text())
                .then(result => {
                    localStorage.setItem('userData', result)
                    window.location.pathname = '/';
                })
                .catch(error => console.log('error', error));



        }
    }
};
</script>

<style scoped>
.update {
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
}</style>