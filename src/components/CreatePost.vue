<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      persistent
      max-width="600px"
    >
     
      <v-card>
        <v-card-title>
          <span class="text-h5">Create Post</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col
                cols="12"
               
              >
                <v-text-field
                v-model="post.title"
                  label="Title"
                  required
                ></v-text-field>
              </v-col>

              <v-col cols="12">
                <v-text-field
                v-model="post.body"

                  label="Body"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
         
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click="dialog = false"
          >
            Close
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="addPost()"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { mapActions } from 'vuex'
  export default {
    data: () => ({
      dialog: false,
      post: {
          title: null,
          body: null,
          userId: null
      }
    }),
    methods: {
        ...mapActions({
            createPost: 'createPost'
        }),
        open() {
            this.dialog = true
        },
        addPost() {
            this.post.userId = this.$store.state.user.id;
            this.createPost(this.post)
            this.dialog = false
        }
    }
  }
</script>