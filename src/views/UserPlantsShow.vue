<template>
  <div class="userplants-show">
    <section class="content-section   text-center" id="UserPlantInfo">
      <div class="container text-center">
        <img v-bind:src="userplant.primary_image_url" v-bind:alt="userplant.id" />
        <h2 class="mb-4">{{ userplant.plant.common_name }}</h2>
        <div class="d-flex w-100 justify-content-between">
          <h5 class="mb-1">Owend since {{ userplant.date_aquired }}</h5>
          <small>{{ userplant.days_owned }} days in your care</small>
        </div>

        <ul class="list-group">
          <li class="list-group-item">Scientific Name: {{ userplant.plant.scientific_name }}</li>
          <li class="list-group-item">Plant Family: {{ userplant.plant.plant_family }}</li>
          <li class="list-group-item">Light: {{ userplant.plant.light }}</li>
          <li class="list-group-item">Temperature Range: {{ userplant.plant.temperature }} deegrees F</li>
          <li class="list-group-item">Humidity Level: {{ userplant.plant.humidity }}</li>
          <li class="list-group-item">Watering Frequency: {{ userplant.plant.water_freq }}</li>
          <li class="list-group-item">Soil Type: {{ userplant.plant.soil_type }}</li>

          <li class="list-group-item">Description: {{ userplant.plant.description }}</li>
        </ul>
      </div>
    </section>
    <section class="content-section   text-center" id="watering">
      <div class="list-group">
        <a href="#" class="list-group-item list-group-item-action active" aria-current="true">
          <div class="d-flex w-100 justify-content-between">
            <h5 class="mb-1">Last Watered On</h5>
            <small>{{ userplant.days_since_last_watered }}days ago</small>
          </div>
          <p class="mb-1">{{ userplant.most_recent_watering }}</p>
          <small v-if="userplant.needs_water">probably should water this plant</small>
          <small v-else>Good Job watering!</small>
        </a>
        <a href="#" class="list-group-item list-group-item-action">
          <div class="d-flex w-100 justify-content-between">
            <h5 class="mb-1">Next Wattering Date</h5>
            <!-- <small class="text-muted">3 days ago</small> -->
          </div>
          <p class="mb-1">{{ userplant.next_wattering }}</p>
          <small class="text-muted">Don't Forget!</small>
        </a>
        <!-- <a href="#" class="list-group-item list-group-item-action">
          <div class="d-flex w-100 justify-content-between">
            <h5 class="mb-1">List group item heading</h5>
            <small class="text-muted">3 days ago</small>
          </div>
          <p class="mb-1">Some placeholder content in a paragraph.</p>
          <small class="text-muted">And some muted small print.</small>
        </a> -->
      </div>
      <h2>Water this plant</h2>
      <div>
        <form v-on:submit.prevent="createWatering()">
          <ul>
            <li v-for="error in errors" :key="error">{{ error }}</li>
            <img v-if="status" v-bind:src="`https://http.cat/${status}`" v-on:click="status = ''" alt="" />
          </ul>
          <label for="wattering-datepicker">Choose a date</label>
          <b-form-datepicker id="wattering-datepicker" v-model="newDate" class="mb-2"></b-form-datepicker>
          <!-- <p>Value: '{{ newDate }}'</p> -->
          <input class="btn btn-primary btn-xl" type="submit" value="Water" />
        </form>
      </div>

      <!-- <form v-on:submit.prevent="createWatering()">
        <ul>
          <li v-for="error in errors" :key="error">{{ error }}</li>
          <img v-if="status" v-bind:src="`https://http.cat/${status}`" v-on:click="status = ''" alt="" />
        </ul>
        date:
        <input type="date" v-model="newDate" />
        <input type="submit" value="Create" />
      </form> -->
      <h3>Watering Dates:</h3>
      <div id="WateringDates" class="list-group">
        <a
          v-for="watering in userplant.waterings"
          v-bind:key="watering.id"
          href="#"
          class="list-group-item list-group-item-action list-group-item-info"
        >
          {{ watering.date }}
        </a>
      </div>
    </section>
    <section class="content-section   text-center" id="UserPlantPhotos">
      <h2 class="mb-4">Your Photo's of this plant</h2>
      <div>
        <b-carousel
          id="carousel-1"
          v-model="slide"
          :interval="4000"
          controls
          indicators
          background="#ababab"
          img-width="1024"
          img-height="480"
          style="text-shadow: 1px 1px 2px #333;"
          @sliding-start="onSlideStart"
          @sliding-end="onSlideEnd"
        >
          <b-carousel-slide v-for="image in userImages" :key="image.id" :img-src="image.img_url"></b-carousel-slide>
        </b-carousel>
      </div>
    </section>
    <section class="content-section  text-white">
      <div class="container text-center">
        <button class="btn btn-xl btn-dark" v-on:click="destroyUserPlant(userplant)">Remove This Plant</button>
        <a href="/userplants/" class="btn btn-xl btn-light mr-4">Back to all your plants</a>
      </div>
    </section>
  </div>
</template>

<script>
import axios from "axios";

export default {
  components: {},
  data: function() {
    return {
      userplant: { plant: {}, waterings: {} },
      newDate: Date(),
      userImages: [],
      slide: 0,
      sliding: null,
      status: "",
      errors: [],
    };
  },
  created: function() {
    axios.get("/api/user_plants/" + this.$route.params.id).then(response => {
      console.log("userplant show", response);
      this.userplant = response.data;
      this.userImages = response.data.user_images;
    });
  },
  methods: {
    onSlideStart(slide) {
      this.sliding = true;
      console.log(slide);
    },

    onSlideEnd(slide) {
      this.sliding = false;
      console.log(slide);
    },
    createWatering: function() {
      var params = {
        date: this.newDate,
        user_plant_id: this.userplant.id,
      };
      axios
        .post("/api/waterings", params)
        .then(response => {
          console.log("watering create", response);
          this.$router.push("#WateringDates");
          window.location.reload();
        })
        .catch(error => {
          console.log("waterings create error", error.response);
          this.errors = error.response.data.errors;
          this.status = error.response.status;
        });
    },
    destroyUserPlant: function(userplant) {
      axios.delete("/api/user_plants/" + userplant.id).then(response => {
        console.log("user plant destroy", response);
        this.$router.push("/userplants");
      });
    },
  },
};
</script>
