<template>
  <Spacer></Spacer>
  <Card v-for="exercise in exercises" :exercise="exercise"></Card>
</template>

<script>
import Card from '@/components/Card.vue'
import Spacer from '@/components/Spacer.vue'

export default {
  name: 'ListOfExercises',
  components: {
    Card,
    Spacer
  },
  data() {
    return {
      exercises: [
        { name: "Push up", image: require("@/assets/pushup.webp") },
        { name: "Deadlift", image: require("@/assets/deadlift.webp") },
        { name: "Squat", image: require("@/assets/squat.webp") }
      ]
    }
  }
  
}
</script>
