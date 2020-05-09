<template>
  <div class="container">
    <form id="bairrin" @submit="resetPosition" action="vuejs.org">
      <legend>Localize-se</legend>
        <div class="form-group">
            <label for="bairro">Bairro:</label>
            <div class="row">
                <input
                    class="form-control col-4"
                    id="bairro"
                    v-model="bairroAddress"
                    type="text"
                    name="bairro"
                    placeholder="Rocinha"
                >
                <input type="submit" value="Buscar">
            </div>
        </div>
    </form>
    <vl-map :load-tiles-while-animating="true" :load-tiles-while-interacting="true"
             data-projection="EPSG:4326" style="height: 400px">
      <vl-view :zoom.sync="zoom" :center.sync="center" :rotation.sync="rotation"></vl-view>

      <vl-geoloc @update:position="geolocPosition = $event">
        <template slot-scope="geoloc">
          <vl-feature v-if="geoloc.position" id="position-feature">
            <vl-geom-point :coordinates="geoloc.position"></vl-geom-point>
            <vl-style-box>
              <vl-style-icon src="_media/marker.png" :scale="0.4" :anchor="[0.5, 1]"></vl-style-icon>
            </vl-style-box>
          </vl-feature>
        </template>
      </vl-geoloc>

      <vl-feature id="point" :properties="{prop: 'value', prop2: 'value'}">
          <vl-geom-point :coordinates="[0, 0]"></vl-geom-point>
      </vl-feature> 

        <vl-feature
          v-for="(store) in stores" 
          :key="store.name" 
        >
          <vl-geom-point v-if="store.coord" :coordinates="store.coord"></vl-geom-point>
          <vl-style-box>
            <!-- <vl-style-icon src="../assets/marker.jpeg" :scale="0.4" :anchor="[0.5, 1]"></vl-style-icon> -->
            <vl-style-circle :radius="10">
              <vl-style-fill color="red"></vl-style-fill>
              <vl-style-stroke color="black"></vl-style-stroke>
            </vl-style-circle>
          </vl-style-box>
          <vl-overlay  v-if="zoom >= 17" :position="store.coord" positioning="bottom-left">
          
                <div class="card border-info mb-3">
                    <div class="card-header">
                        {{store.name}}
                    </div>
                    <div class="card-body">
                        <p class="card-text">
                            {{store.price}}<br>
                            {{store.email}}<br>
                            {{store.tel}}<br>
                        </p>
                    </div>
                </div>
          </vl-overlay>
        </vl-feature>

      <vl-layer-tile id="osm">
        <vl-source-osm></vl-source-osm>
      </vl-layer-tile>
    </vl-map>
    <div style="padding: 20px">
      Zoom: {{ zoom }}<br>
      Center: {{ center }}<br>
      Rotation: {{ rotation }}<br>
      My geolocation: {{ geolocPosition }}
    </div>
    <div class="container">
        <div class="stores-container">
            <div class="store-item"
                v-for="(store) in stores"
                :key="store.name"
            >
                {{store}} <br>
                {{store.coord}}<br>
            </div>

        </div>
    </div>
  </div>
</template>

<script>
import ApiService from '../ApiService'
export default {
    data(){
        return{
            zoom: 11,
            center: [-43.1510, -22.9170],
            rotation: 0,
            geolocPosition: undefined,
            stores: [],
            bairroPosition: undefined,
            bairroAddress: undefined
        }
    },
    async created(){
        try {
            console.log("CRIANDO AQUI")
            this.stores = await ApiService.getStores();
        } catch (err) {
            this.error = err.message;
        } 
    },
    methods: {
        async resetPosition(e){
            e.preventDefault();
            try {
                console.log(this.bairroAddress);
                let res = await ApiService.getBairro(this.bairroAddress);
                this.center = res;
                this.zoom = 16;
            } catch (error) {
                console.log("ERRO AQUI: "+ error); 
            }
        }
    },
}
</script>