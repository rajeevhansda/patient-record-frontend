<template>
  <div id="app">
    <nav id="nav">
      <div id="nav-name"><h2>USER NAME</h2></div>
      <div id="nav-item"><h2>PROFILE / LOGOUT</h2></div>
    </nav>
    <router-view/>
  </div>
</template>

<style scoped>
nav{
  display: flex;
  justify-content: space-between;
}
#nav-name,
#nav-item{
  padding: 10px 100px;
}


</style>

