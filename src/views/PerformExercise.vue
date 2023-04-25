<template>
  <!-- Name of exercise and timer -->
  <div class="row mt-2 p-3 fw-bold fs-3">
    <div class="col-6">{{ $route.params.exerciseName }}</div>
    <div class="col-6 text-end"> {{ timerOutput }}</div>
  </div>

  <!-- Video -->
  <div class="ms-3 me-3 video-box">
    <video id="video" class="rounded shadow" autoplay playsinline></video>
  </div>
  <!-- Rep counter -->
  <div class="text-center mt-3">
    <span class="counter fw-bold">{{ counter }}</span>
  </div>
  <!-- Form -->
  <div class="mt-2">
    <span class="fw-bold fs-3 ms-3">{{ status }}</span>
  </div>

</template>

<script>

  export default {
    name: 'PerformExercise',
    data() {
      return {
        counter: 4,
        status: 'Form: ok!',
        timer: 0,
        timerOutput: '00:00'
      }
    },
    mounted() {
      setupVideo();
      this.startTimer();
    },
    
    methods: {
      
      startTimer: function (){
        setInterval(() => {
          this.timer++;
          let timer = this.timer;
          if (timer < 60){
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
      }

    },

    
  }

  

  function setupVideo(){
    const video = document.getElementById('video');
    const stream = navigator.mediaDevices.getUserMedia({
      audio: false,
      video: true
    }).then(function (stream) {
      video.srcObject = stream;
    });
  }
</script>