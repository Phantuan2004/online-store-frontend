<template>
  <!-- Deal -->
  <section class="section-deal padding-b-100">
    <div class="bg-banner-deal">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <div class="cr-deal-rightside">
              <div class="cr-deal-content" data-aos="fade-up" data-aos-duration="2000">
                <span><code>35%</code> OFF</span>
                <h4 class="cr-deal-title">Great deal on organic food.</h4>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do maecenas accumsan lacus vel facilisis. </p>
                <div id="timer" class="cr-counter">
                  <div class="cr-counter-inner">
                    <div class="counter-item">
                      <h4>
                        <span>{{ days }}</span>
                        Days
                      </h4>
                    </div>
                    <div class="counter-item">
                      <h4>
                        <span>{{ hours }}</span>
                        Hrs
                      </h4>
                    </div>
                    <div class="counter-item">
                      <h4>
                        <span>{{ minutes }}</span>
                        Min
                      </h4>
                    </div>
                    <div class="counter-item">
                      <h4>
                        <span>{{ seconds }}</span>
                        Sec
                      </h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const days = ref(5);
const hours = ref(10);
const minutes = ref(30);
const seconds = ref(45);

let timerInterval = null;

const startTimer = () => {
  timerInterval = setInterval(() => {
    if (seconds.value > 0) {
      seconds.value--;
    } else {
      if (minutes.value > 0) {
        minutes.value--;
        seconds.value = 59;
      } else {
        if (hours.value > 0) {
          hours.value--;
          minutes.value = 59;
          seconds.value = 59;
        } else {
          if (days.value > 0) {
            days.value--;
            hours.value = 23;
            minutes.value = 59;
            seconds.value = 59;
          }
        }
      }
    }
  }, 1000);
};

onMounted(() => {
  startTimer();
});

onUnmounted(() => {
  if (timerInterval) clearInterval(timerInterval);
});
</script>

<style scoped>
.cr-counter-inner {
  display: flex;
  gap: 15px;
}
.counter-item {
  text-align: center;
}
</style>
