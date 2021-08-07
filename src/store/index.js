import Vue from 'vue'
import Vuex from 'vuex'
import { api } from "@/services/services.js";
import router from "@/router/index";

import createPersistedState from "vuex-persistedstate";
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    status: {
      loggingIn: false
    },
    user: JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')) : null,
    posts: []
  },
  mutations: {
    setUser(state, payload) {
      if(payload) {
        state.status = {loggingIn: true}
      } else {
        state.status = {loggingIn: false}
      }
      state.user = payload;
    },
    setPosts(state, payload) {
      state.posts = payload;
    },
    setPost(state,payload) {
      state.posts.push(payload)
    }
  },
  getters: {
    postList: state => {
      return state.posts
    }
  },
  actions: {
    async signInUser({ commit }, payload) {
      console.log(payload, " :: signInUser")
      const res = await api.login({
        userId: payload.userId
      });

      if (res) {
        commit("setUser", res);
        router.push("/posts");
      }
      return res;
    },
    async getAllPosts({commit}, payload) {
      const res = await api.getPostsById({
        userId: payload.userId
      });
      if (res) {
        commit("setPosts", res);
      }
    },
    async createPost({commit},payload) {
      console.log(payload, " : createPost")
      const res = await api.createPost({
        post:payload
      });
      if(res) {
        console.log("post created",res)
        commit("setPost", res);

      }
    },
    logout({commit}){
      commit("setUser",null)
      commit("setPosts", []);

      router.push("/");
    }
  },
  modules: {
  },
  plugins:[createPersistedState ()]
})
