<template>
  <v-container>
    <v-row justify="center" align="center">
      <v-col cols="8" md="4" lg="3">
        <v-text-field
          v-model="address"
          label="Address"
          placeholder="Address"
          outlined
          @keydown.enter="search"
        />
      </v-col>
      <v-col cols="2" md="2" lg="1">
        <v-btn outlined text class="mt-n7" @click="search">Search</v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12"> Result: {{ result }} </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      address: '',
      result: ''
    }
  },
  methods: {
    search() {
      this.$axios
        .get(
          'https://nominatim.openstreetmap.org/search?format=json&q=' +
            this.address.split(' ').join('+')
        )
        .then((res) => {
          this.result = res.data
        })
    }
  }
}
</script>
