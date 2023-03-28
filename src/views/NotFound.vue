<template>
    <div class="notFound">
      <h2>Not Found</h2>
      <p>
        Oops we couldn't find that page. Try going
        <router-link :to="{ name: 'home' }">home</router-link>
      </p>
    </div>
  </template>