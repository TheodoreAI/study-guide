<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />

    <audio v-if="loading" :src="audioFile" autoplay></audio>
    <audio v-if="isRevingEngine" :src="revEngine" autoplay></audio>
    <div class="card">
      <div class="row">
        <div class="col">
          <button
            @click.prevent="turnOn()"
            class="btn btn-success rounded-circle m-3 p-3"
          >
            Start
          </button>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <button
            @click.prevent="turnOff()"
            class="btn btn-danger rounded-circle m-3 p-3"
          >
            Off
          </button>
        </div>
      </div>
    </div>
    <div class="card">
      <div class="row">
        <div class="col">
          <button
            @click.prevent="revingEngine()"
            class="btn btn-warning rounded-circle m-3 p-3"
          >
            Rev
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

import audioFile from "@/assets/supercar_engine_start.wav";
import revEngine from "@/assets/supercar_rev.wav";
export default {
  name: "HomeView",
  components: {},
  data() {
    return {
      loading: false,
      audioFile: audioFile,
      revEngine: revEngine,
      isRevingEngine: false,
    };
  },
  methods: {
    turnOn() {
      this.loading = true;
    },
    turnOff() {
      this.loading = false;
    },
    revingEngine() {
      this.isRevingEngine = true;
    },
  },
};
</script>
