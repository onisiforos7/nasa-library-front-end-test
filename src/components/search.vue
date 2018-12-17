<template>
  <div  class="col-md-12">
    <div class="col-md-6 col-sm-10 offset-sm-1 offset-md-3 pb-4">
      <div class="input-group">
        <input class="form-control" type="text" v-model="searchQuery" placeholder="" />
        <a class="input-group-prepend" @click="submitSearch"><span class="btn input-group-text"><i class="fa fa-search"></i> </span></a>
      </div>
        <div class="form-check col-4 float-left">
        <input class="form-check-input" value="image" v-model="mediaType" type="checkbox" id="image">
        <label class="form-check-label" for="image">Images</label>
      </div>
      <div class="form-check col-4 float-left">
        <input class="form-check-input" value="audio" v-model="mediaType" type="checkbox" id="audio">
        <label class="form-check-label" for="audio">Audio</label>
      </div>
    </div>
    <div class="container py-5">
      <div>
        <div class="card-columns">
          <!--for-loop for each element in the array to be printed-->
          <div class="card" v-for="item in this.collection.items">
            <!--if items.links is not undefined it means that array and results exists -->
            <div v-if="typeof item.links != 'undefined'" >
              <a style="cursor: pointer;" :title="item.data[0].title" @click="getAsset(item.data[0].nasa_id)">
              <div v-for="info in item.links" class=""><img width="100%" v-bind:src="info.href" alt=""/></div>
              </a>
            </div>
            <!--looking at the api if the arrya does not have links array in, it means the asset its a video-->
            <div style="background: black;" v-else >
              <div class="pt-3 m-1">
                <a style="cursor: pointer;" @click="getAsset(item.data[0].nasa_id)">
                <div class="col-12 mb-1">
                  <img src="../assets/search_audio_icon.png" />
                </div>
                <label class="text-white">{{item.data[0].title}}</label>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="zeroResults" class="col-12 align-content-center"> No results. Try something else.</div>
      <nav aria-label="Page navigation example">
        <ul class="pagination d-inline-block pt-4">
          <li v-for="link in links" class="page-item"><a class="page-link" @click="paginate(link.href)">{{link.prompt}}</a></li>

        </ul>
      </nav>
    </div>
  </div>


</template>

<script>

export default {
  name: 'Search',
  loading: false,
  data () {
    return {
      msg: 'NASA Search',
      searchQuery: '',
      collection: [],
      loading: false,
      links:[],
      mediaType: [],
      zeroResults:false,
      page:""

    }
  },
  methods: {
    submitSearch: function() {
      let searchUrl;
      if(this.page === ""){
        searchUrl = "https://images-api.nasa.gov/search?q=" + this.searchQuery +"&media_type="+this.mediaType.toString()
      }
      else {
        searchUrl = this.page;
      }

        fetch(searchUrl)
          .then(response => response.json())
          .then(data => {
            this.collection = data.collection;
            this.links = data.collection.links;
            if(typeof this.collection.items != 'undefined' && this.collection.items.length > 0 ){
                this.zeroResults = false;
            }
            else {
              this.zeroResults = true;
            }
          })
        .catch(error => {
          console.log(error);

        })
        .finally(() => this.loading = false);
        this.page = "";
    },
    getAsset: function (nasaId) {
      this.$router.push({name: 'asset', params: { id: nasaId}});
    },
    paginate: function (page) {
        this.page = page;
        this.submitSearch()
    }
  }
}
</script>

