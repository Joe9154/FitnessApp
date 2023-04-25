<template>
    <router-link :to="'/exercise/'+exercise.name">
    <div class="exercise-card mt-4 position-relative start-50 translate-middle">
        <img :src="exercise.image" class="img-fluid rounded shadow " :alt="exercise.name">
        <div class="position-absolute w-100 h-100 top-0 start-0 card-gradient rounded"></div>
        <span class="position-absolute bottom-0 start-0 text-white ms-4 mb-2 pb-1 fs-4 fw-bold">{{ exercise.name }}</span>
    </div>
    </router-link>
</template>

<script>
export default {
    name: 'Card',
    props: {
        exercise: {
            type: Object,
            required: true
        }
    }
}
</script>