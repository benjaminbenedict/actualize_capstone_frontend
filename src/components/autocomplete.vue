<template>
  <div class="autocomplete">
    <h2>Test search</h2>

    <autocomplete
      ref="autocomplete"
      placeholder="Search Distribution Groups"
      :source="distributionGroupsEndpoint"
      input-class="form-control"
      results-property="data"
      :results-display="formattedDisplay"
      :request-headers="authHeaders"
      @selected="addDistributionGroup"
    ></autocomplete>
  </div>
</template>
<script>
import Autocomplete from "vuejs-auto-complete";

export default {
  components: {
    Autocomplete,
  },
  data: function() {
    return {};
  },
  computed: {
    authHeaders() {
      return {
        Authorization: "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1Ni....",
      };
    },
  },
  methods: {
    distributionGroupsEndpoint(input) {
      return process.env.API + "/distribution/search?query=" + input;
    },
    addDistributionGroup(group) {
      this.group = group;
      // access the autocomplete component methods from the parent
      this.$refs.autocomplete.clear();
    },

    formattedDisplay(result) {
      return result.name + " [" + result.groupId + "]";
    },
  },
};
</script>
