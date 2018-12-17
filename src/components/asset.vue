<template>
  <div  class="col-md-12">
    <label class="title">{{this.title}}</label>
    <div class="col-12 mt-3">
      <div v-if="mediaType === 'image'" class="col-sm-12 col-md-8 offset-md-2">
      <img  width="100%" :src="this.mediaUrl"/>
      </div>
      <div v-if="mediaType === 'audio'" class="audio">
        <audio  controls>
            <source :src="this.mediaUrl" type="audio/mpeg">
            Your browser does not support the audio element.
        </audio>
      </div>
      <label class="col-sm-12 col-md-8 mt-3 mb-5">{{this.description}}</label>

    </div>
  </div>

</template>

<script>

export default {
  name: 'Asset',
  loading: false,
  data () {
    return {
      title: '',
      description:'',
      mediaType:'',
      nasaId: this.$route.params.id,
      mediaUrl: '',
      collection: [],
      loading: false,
      links:[],
      metadataUrl: ''
    }
  },
  mounted:function(){
    this.getMetadataUrl();
    this.getMedia();
  },
  methods:{
    getMedia: function () {
        //Get Asset's information by nasaId
        fetch("https://images-api.nasa.gov/asset/"+this.nasaId)
          .then(response => response.json())
          .then(data => {
            this.mediaUrl = data.collection.items[0].href
          })
          .catch(error => {
            console.log(error);
          })
          .finally(() => this.loading = false)
    },
    getMetadataUrl:function(){
      //Get Asset's metadata API by nasaId
      fetch("https://images-api.nasa.gov/metadata/"+this.nasaId)
        .then(response => response.json())
        .then(data => {
          this.metadataUrl =  data.location;
          this.getAssetInfo();
        });
    },
    getAssetInfo: function(){
      const url = this.metadataUrl;
      console.log("url=="+url.toString());
        //Using the API from getMetadataUrl to  get Assets information
      fetch(url.toString())
        .then(response => response.json())
        .then(data => {
          this.title = data["AVAIL:Title"];
          this.description = data["AVAIL:Description"];
          this.mediaType = data["AVAIL:MediaType"];
        })
        .catch(error => {
          console.log(error);
        })
        //loading is introduced but functionality not implemented with front-end yet.
        .finally(() => this.loading = false)
    }
  }
}
</script>

<style>
  .audio{
    width: 100%;
  }
</style>
