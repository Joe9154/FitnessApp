<template>
  <div class="row">
    <div class="col-xl-2"></div>
    <div class="col-xl-8">
      <!-- Name of exercise and timer -->
      <div class="row mt-2 p-3 fw-bold fs-3">
        <div class="col-6">{{ $route.params.exerciseName }}</div>
        <div class="col-6 text-end"> {{ timerOutput }}</div>
      </div>

      <!-- Video -->
      <div class="ms-3 me-3 video-box text-center">
        <video v-show="false" id="video" class="rounded shadow" autoplay playsinline></video>
        <canvas v-show="true" id="output" class="rounded shadow"></canvas>
      </div>
      <!-- Rep counter -->
      <div class="text-center mt-3">
        <span class="counter fw-bold" id="counter">0</span>
      </div>
      <!-- Form -->
      <div class="mt-2" v-show="$route.params.exerciseName === 'Deadlift'">
        <span class="fw-bold fs-3 ms-3" id="status">Form: ok!</span>
      </div>
    </div>
    <div class="col-xl-2"></div>
  </div>
</template>

<script>
const PoseRecognition = require('@/PoseRecognition.js')

export default {
  name: 'PerformExercise',
  data() {
    return {
      timer: 0,
      timerOutput: '00:00'
    }
  },
  mounted() {
    PoseRecognition.setupVideo();
    PoseRecognition.startPoseDetection(this.$route.params.exerciseName);
    this.startTimer();

  },
  beforeUnmount() {
    PoseRecognition.stopVideo();
  },

  methods: {
    startTimer: function () {
      setInterval(() => {
        this.timer++;
        let timer = this.timer;
        if (timer < 60) {
          if (timer < 10)
            timer = '0' + timer;
          this.timerOutput = '00:' + timer;
        } else {
          let minutes = Math.floor(timer / 60);
          let seconds = timer % 60;
          if (minutes < 10)
            minutes = '0' + minutes;
          if (seconds < 10)
            seconds = '0' + seconds;
          this.timerOutput = minutes + ':' + seconds;
        }
      }, 1000);
    },

  },

}

</script>