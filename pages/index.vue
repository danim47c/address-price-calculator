<template>
  <v-card flat>
    <v-toolbar color="primary" extended flat>
      <v-toolbar-title class="white--text mt-2 mx-auto display-1"
        >The Delivery Fee</v-toolbar-title
      >
    </v-toolbar>

    <v-container class="pt-0">
      <v-row justify="center">
        <v-col class="pt-0" cols="10" md="8" lg="6">
          <v-card class="mx-auto" style="margin-top: -32px;">
            <v-toolbar flat>
              <v-text-field
                v-model="address"
                append-outer-icon="mdi-magnify"
                solo
                label="Search"
                class="mt-12"
                :readonly="loading"
                :loading="loading"
                @keydown.enter="search()"
                @click:append-outer="search()"
              />
            </v-toolbar>

            <v-card-text v-text="'Price: ' + (result ? result + '$' : 'There isnt price for that address')" />
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <v-dialog v-model="dialog" fullscreen hide-overlay>
      <v-card>
        <v-toolbar dark color="primary">
          <v-btn icon dark @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-list v-if="data.length > 0" two-line subheader tile>
          <v-list-item v-for="(ad, i) in data" :key="i" @click="choose(ad)">
            <v-list-item-content>
              <v-list-item-title v-text="ad.display_name" />
              <v-list-item-subtitle v-text="`${ad.lat}, ${ad.lon}`" />
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <v-list v-else>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title
                >There's no results in Chicago for that
                address.</v-list-item-title
              >
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
import calcPrice from '../plugins/calculator'
// import calcPrice from '~/plugins/calculator'

export default {
  data() {
    return {
      loading: false,
      address: '',
      data: [],
      result: undefined,
      dialog: false
    }
  },
  methods: {
    search() {
      if (this.loading) return

      this.loading = true

      this.$axios
        .get(
          'https://nominatim.openstreetmap.org/search?format=json&q=' +
            this.address.split(' ').join('+')
        )
        .then((res) => {
          this.data = res.data.filter((ad) =>
            ad.display_name.toLowerCase().includes('chicago')
          )
          this.dialog = true
        })

      this.loading = false
    },
    choose(ad) {
      this.dialog = false
      this.result = calcPrice([ad.lat, ad.lon])
    }
  }
}
</script>
