<template>
  <v-card
    class="mx-auto"
    max-width="500"
  >
    <v-toolbar
      color="indigo"
      dark
    >
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
      <v-toolbar-title>Posts</v-toolbar-title>
      <v-spacer></v-spacer>  
       <v-btn
        class="mx-2 float-right"
        fab
        dark
        color="pink"
        large
        @click="addNewPost"
        >
        <v-icon dark>
            mdi-plus
        </v-icon>
        </v-btn>    
    </v-toolbar>

    <v-list two-line>
      <v-list-item-group
        multiple
      >
        <template v-for="(post, index) in postList">
          <v-list-item :key="post.title">
            <template>
              <v-list-item-content>
                <v-list-item-title v-text="post.title"></v-list-item-title>

                <v-list-item-subtitle v-text="post.body"></v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-action>
                  <a href="#">Comment</a>
              </v-list-item-action>
            </template>
          </v-list-item>

          <v-divider
            v-if="index < posts.length - 1"
            :key="index"
          ></v-divider>
        </template>
       
      </v-list-item-group>
    </v-list>
    <CreatePost  ref="createPost"></CreatePost>
  </v-card>
</template>
<script>
import { mapActions,mapGetters } from 'vuex'

import CreatePost from '../components/CreatePost.vue'
export default {
    components: {
        CreatePost
    },
   data() 
 {
    return {
        posts: [],
    }
   },
mounted() {
    if(this.postList && this.postList.length == 0) {
        if(this.$store.state.user && this.$store.state.status.loggingIn) {
            this.getPosts({userId:this.$store.state.user.id})
            this.posts = this.$store.state.posts | this.postList
        }
    }
   
},
computed: {
      ...mapGetters(["postList"])
   },
methods:{
     ...mapActions({
      getPosts: 'getAllPosts'
    }),
    addNewPost() {
        this.$refs.createPost.open();
        this.getPosts({userId:this.$store.state.user.id})
    }
}}
</script>