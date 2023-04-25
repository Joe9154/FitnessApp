<template>
    <div class="header text-center pt-4 mt-2">
        <router-link to="/" v-show="$route.matched.some(({ name }) => name === 'PerformExercise')">
            <img :src="arrowImage" class="arrow position-absolute mt-1 ms-5 start-0">
        </router-link>
        <router-link to="/">
            <h2 class="fw-bold">FITNESS APP</h2>
        </router-link>
    </div>
</template>

<script>
export default {
    name: 'Header',
    data() {
        return {
            arrowImage: require('../assets/arrow-left-solid.svg')
        }
    },
}
</script>


