<template>
    <div class="update">
        <h2>UPDATE</h2>
        <form class="form" @submit.prevent="updateUser">

            <label for="username">Username</label>
            <input v-model="user.name" type="text" name="username" autocomplete="on" required="true" />




            <button type="submit" class="btn" :disabled="loading">Update User</button>
        </form>
        <button @click="deleteUser">Delete User</button>

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