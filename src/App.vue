<template>
  <Header></Header>

  <router-view></router-view>
</template>

<script>
import Header from './components/Header.vue'

export default {
  name: 'App',
  components: {
    Header
  }
}
</script>

<style>
body {
  font-family: 'Poppins', sans-serif;
}

.rounded {
  border-radius: 12px !important;
}

.card-gradient {
  background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 100%);
}

.exercise-card {
  height: 25vh;
  max-width: 50vh;
}

.exercise-card img {
  height: 100%;
  width: 100%;
  object-fit: cover;
}

.spacer {
  height: 6.5rem;
}

.arrow {
  height: 1.5rem;
}

video, canvas {
  width: 100% !important;
  height: auto !important;
}

.video-box {
  /* height: 60vh; */
  max-height: 60vh;
}

.counter {
  font-size: 4.5rem;
  text-decoration: underline;
}

a {
  text-decoration: none;
  color: inherit;
}

</style>
