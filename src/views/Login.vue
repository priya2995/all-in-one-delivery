<template>
  <div>
    <v-card class="text-center pa-1">
      <v-card-title class="justify-center display-1 mb-2">Welcome</v-card-title>
      <v-card-subtitle>Sign in to your account</v-card-subtitle>

      <!-- sign in form -->
      <v-card-text>
        <v-form ref="form" v-model="isFormValid" lazy-validation>
          <v-text-field
            v-model="userId"
            :rules="[rules.required]"
            :validate-on-blur="false"
            :error="error"
            name="userId"
            placeholder="Enter userId (ex.1)"
            outlined
            @keyup.enter="submit"
            @change="resetErrors"
          ></v-text-field>

          <v-btn
            :loading="isLoading"
            :disabled="isSignInDisabled"
            block
            x-large
            color="primary"
            @click="submit"
          >Login</v-btn>

        </v-form>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data() {
    return {
    isLoading: false,
    isSignInDisabled: false,
    isFormValid: false,
    userId: '',
    error: false,
    errorMessages: '',
    errorProvider: false,
    errorProviderMessages: '',
    rules: {
        required: (value) => (value && Boolean(value)) || 'Required'
      }
    }
  },
  methods: {
      ...mapActions({
      login: 'signInUser' // map `this.add()` to `this.$store.dispatch('increment')`
    }),
      submit() {
      if (this.$refs.form.validate()) {
        this.isLoading = true
        this.isSignInDisabled = true
        this.login({userId: this.userId});
      }
      
    },
    resetErrors() {
      this.error = false
      this.errorMessages = ''

      this.errorProvider = false
      this.errorProviderMessages = ''
    }
  }
}
</script>
