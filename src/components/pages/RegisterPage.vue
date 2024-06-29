<template>
    <layout-div>
        <div class="row justify-content-md-center mt-5">
             <div class="col-4">
                 <div class="card">
                     <div class="card-body">
                         <h5 class="card-title mb-4">Register</h5>
                         <form ref="regForm">
                             <div class="mb-3">
                                 <label 
                                     htmlFor="name"
                                     class="form-label">Name
                                 </label>
                                 <input 
                                     type="text"
                                     class="form-control"
                                     id="name"
                                     name="name"
                                     v-model="name"
                                 />
                                 <div v-if="validationErrors.name" class="flex flex-col">
                                     <small  class="text-danger">
                                     {{validationErrors?.name[0]}}
                                     </small >
                                 </div>      
                             </div>
                             <div class="mb-3">
                                 <label 
                                     htmlFor="email"
                                     class="form-label">Email address
                                 </label>
                                 <input 
                                     type="email"
                                     class="form-control"
                                     id="email"
                                     name="email"
                                     v-model="email"
                                 />
                                 <div v-if="validationErrors.email" class="flex flex-col">
                                     <small  class="text-danger">
                                     {{validationErrors?.email[0]}}
                                     </small >
                                 </div>
                             </div>
                             <div class="mb-3">
                                 <label 
                                     htmlFor="password"
                                     class="form-label">Password
                                 </label>
                                 <input 
                                     type="password"
                                     class="form-control"
                                     id="password"
                                     name="password"
                                     v-model="password"
                                 />
                                <div v-if="validationErrors.password" class="flex flex-col">
                                     <small  class="text-danger">
                                     {{validationErrors?.password[0]}}
                                     </small >
                                 </div>
                             </div>
                             <div class="mb-3">
                                 <label 
                                     htmlFor="confirm_password"
                                     class="form-label">Confirm Password
                                 </label>
                                 <input 
                                     type="password"
                                     class="form-control"
                                     id="confirm_password"
                                     name="confirm_password"
                                     v-model="password_confirmation"
                                 />
                             </div>
                             <div class="d-grid gap-2">
                                 <button 
                                     :disabled="isSubmitting"
                                     @click="registerAction()"
                                     type="button"
                                     class="btn btn-primary btn-block">Register Now
                                 </button>
                                 <p 
                                     class="text-center">Have already an account <router-link to="/">Login here</router-link>
                                 </p>
                             </div>
                         </form>
                     </div>
                 </div>
             </div>
         </div>
    </layout-div>
 </template>
   
 <script>
 import axios from 'axios';
 import LayoutDiv from '../LayoutDiv.vue';
 import Swal from 'sweetalert2';
   
 export default {
    name: 'RegisterPage',
    components: {
        LayoutDiv,
    },
    data() {
        return {
            name:'',
            email:'',
            password:'',
            password_confirmation:'',
            validationErrors:{},
            isSubmitting:false,
        };
   },
   created() {
        if(localStorage.getItem('access_token') != "" && localStorage.getItem('access_token') != null){
            this.$router.push('/dashboard')
        }
    },
    methods: {
        registerAction(){
            this.isSubmitting = true;
            let payload = {
                    name:this.name,
                    email: this.email,
                    password: this.password,
                    password_confirmation: this.password_confirmation
                }
            axios.post('/api/register', payload)
                .then(response => {
                    if (response.data.success)
                    {
                        Swal.fire({
                            icon: 'success',
                            title: 'Register Success!',
                            text: response.data.message,
                            showConfirmButton: false,
                            timer: 1500
                        })
                        this.name = "";
                        this.email = "";
                        this.password = "";
                        this.password_confirmation = "";
                        this.validationErrors = {};
                        this.isSubmitting = false;
                        this.$router.push('/dashboard')
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Register Failed!',
                            html: response.data.message,
                            showConfirmButton: false,
                            timer: 5000
                        })                      
                        this.isSubmitting = false;
                    }
                    return response
                })
                .catch(error => {
                    this.isSubmitting = false
                    return error
                });
        }
    },
 };
 </script>