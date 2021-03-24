<template>
  <div class="plants-show">
    <h2 class="text-secondary mb-3">{{ plant.common_name }}</h2>
    <img v-bind:src="plant.primary_image_url" v-bind:alt="plant.id" />
    <ul class="list-group">
      <li class="list-group-item">
        <h4 class="mb-2">Scientific Name:</h4>
        <p class="mb-0">{{ plant.scientific_name }}</p>
      </li>
      <li class="list-group-item">
        <h4 class="mb-2">Plant Family:</h4>
        <p class="mb-0">{{ plant.plant_family }}</p>
      </li>
      <li class="list-group-item">
        <h4 class="mb-2">Light:</h4>
        <p class="mb-0">{{ plant.light }}</p>
      </li>
      <li class="list-group-item">
        <h4 class="mb-2">Temperature Range:</h4>
        <p class="mb-0">{{ plant.temperature }}</p>
        deegrees F
      </li>
      <li class="list-group-item">
        <h4 class="mb-2">Humidity Level:</h4>
        <p class="mb-0">{{ plant.humidity }}</p>
      </li>
      <li class="list-group-item">
        <h4 class="mb-2">Watering Frequency:</h4>
        <p class="mb-0">{{ plant.water_freq }}</p>
      </li>
      <li class="list-group-item">
        <h4 class="mb-2">Soil Type:</h4>
        <p class="mb-0">{{ plant.soil_type }}</p>
      </li>
      <li class="list-group-item">
        <h4 class="mb-2">Description:</h4>
        <p class="mb-0">{{ plant.description }}</p>
      </li>
    </ul>
    <!-- <router-link v-if="plant.is_admin" v-bind:to="`/plants/${plant.id}/edit`">Edit plant</router-link>
    <button v-if="plant.is_admin" v-on:click="destroyplant(plant)">Destroy plant</button> -->

    <!-- Button trigger modal -->
    <button v-if="isLoggedIn()" type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
      Add this Plant
    </button>

    <!-- Modal -->
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">When Did You Aquire this {{ plant.common_name }} ?</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <input type="date" v-model="newDateAquired" />
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button v-on:click="createUserPlant()" type="button" class="btn btn-primary">Track</button>
          </div>
        </div>
      </div>
    </div>

    <section class="content-section   text-center">
      <div class="container text-center">
        <form v-on:submit.prevent="submit()">
          <h2 class="mb-5">Upload an image of this plant!</h2>

          <div>
            <p class="lead">Image:</p>
            <input class="mb-3" type="file" v-on:change="setFile($event)" ref="fileInput" />
          </div>
          <input class="btn btn-primary" type="submit" value="Submit" />
        </form>
      </div>
    </section>
    <!-- <section v-if="userImages" class="content-section   text-center" id="PlantPhotos">
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
    </section> -->

    <section class="content-section   text-center">
      <div class="container text-center">
        <a class="btn btn-primary btn-xl" href="/">Back to all plants</a>
      </div>
    </section>
  </div>
</template>

<script>
/* global $ */
import axios from "axios";

export default {
  data: function() {
    return {
      plant: {},
      newPlantId: "",
      newDateAquired: Date(),
      image: "",
      // userImages: [],
      // slide: 0,
      // sliding: null,
      status: "",
      errors: [],
    };
  },
  created: function() {
    axios.get("/api/plants/" + this.$route.params.id).then(response => {
      console.log("plants show", response);
      this.plant = response.data;
      this.newPlantId = this.plant.id;
    });
    // axios.get("/api/user_plants/" + this.$route.params.id).then(response => {
    //   console.log("userplant show", response);

    //   this.userImages = response.data.user_images;
    // });
  },
  methods: {
    // onSlideStart(slide) {
    //   this.sliding = true;
    //   console.log(slide);
    // },

    // onSlideEnd(slide) {
    //   this.sliding = false;
    //   console.log(slide);
    // },
    createUserPlant: function() {
      var params = {
        plant_id: this.newPlantId,
        date_aquired: this.newDateAquired,
      };
      console.log(params);
      axios
        .post("/api/user_plants", params)
        .then(response => {
          console.log("user plants create", response);
          $("#exampleModal").modal("hide");
          $(".modal-backdrop").remove();
          this.$router.push("/userplants");
        })
        .catch(error => {
          console.log("user_plants create error", error.response);
          this.errors = error.response.data.errors;
          this.status = error.response.status;
        });
    },
    isLoggedIn: function() {
      return !!localStorage.getItem("jwt");
    },
    setFile: function(event) {
      if (event.target.files.length > 0) {
        this.image = event.target.files[0];
      }
    },
    submit: function() {
      // var params = {
      //   plant_id: this.plant.id,
      // };
      var formData = new FormData();

      formData.append("plant_id", this.plant.id);
      formData.append("image", this.image);

      axios
        .post("/api/pictures", formData)
        .then(response => {
          this.$refs.fileInput.value = "";
          console.log("picture uploaded and create", response);
          window.location.reload();
        })
        .catch(error => {
          console.log("pictures create error", error.response);
          this.errors = error.response.data.errors;
          this.status = error.response.status;
        });
    },

    // createPlantPicture: functiaon() {
    //   var params = {
    //     plant_id: this.newPlantID,
    //   };
    //   console.log(params);
    //   axios
    //     .post("/api/user_plants", params)
    //     .then(response => {
    //       console.log("user plants create", response);
    //       this.$router.push("/userplants");
    //     })
    //     .catch(error => {
    //       console.log("user_plants create error", error.response);
    //       this.errors = error.response.data.errors;
    //       this.status = error.response.status;
    //     });
    // },

    // destroyplant: function(plant) {
    //   axios.delete("/api/plants/" + plant.id).then(response => {
    //     console.log("plants destroy", response);
    //     this.$router.push("/plants");
    //   });
    // },
  },
};
</script>
