<template>
    <layout-div>
         <h2 class="text-center mt-5 mb-3">Edit Todo List</h2>
         <div class="card">
             <div class="card-header">
                 <router-link 
                     class="btn btn-outline-info float-right"
                     to="/">View All My Todo List
                 </router-link>
             </div>
             <div class="card-body">
                 <form>
                     <div class="form-group mb-4">
                         <label htmlFor="title">Todo Title</label>
                         <input 
                             v-model="todo.title"
                             type="text"
                             class="form-control"
                             id="title"
                             name="title"/>
                     </div>
                     <div class="form-group">
                         <label htmlFor="description">Description</label>
                         <textarea 
                             v-model="todo.description"
                             class="form-control"
                             id="description"
                             rows="3"
                             name="description"></textarea>
                     </div>
                     <input type="hidden" id="td-id" name="id" v-model="todo.id" />
                     <button 
                         @click="handleSave()"
                         :disabled="isSaving"
                         type="button"
                         class="btn btn-outline-primary mt-3">
                         Update Todo List
                     </button>
                 </form>
             </div>
         </div>
    </layout-div>
 </template>
  
 <script>
 import axios from 'axios';
 import LayoutDiv from '@/components/LayoutDiv.vue';
 import Swal from 'sweetalert2'
  
 export default {
   name: 'EditPage',
   components: {
     LayoutDiv,
   },
   data() {
     return {
       todo: {
         id: '',
         title: '',
         description: '',
       },
       isSaving:false,
     };
   },
   created() {
     const id = this.$route.params.id;
     axios.get(`/api/show/todo-list/${id}`, { headers:{Authorization: 'Bearer ' + localStorage.getItem('access_token')}})
     .then(response => {
         let todoInfo = response.data.data
         this.todo.title = todoInfo.title
         this.todo.description = todoInfo.description
         this.todo.id = todoInfo.id
         return response
     })
     .catch(error => {
         Swal.fire({
             icon: 'error',
             title: 'An Error Occured!',
             showConfirmButton: false,
             timer: 1500
         })
         return error
     })
   },
   methods: {
     handleSave() {
         this.isSaving = true
        //  const id = this.$route.params.id;
         axios.post(`/api/update/todo-list`, this.todo, { headers:{Authorization: 'Bearer ' + localStorage.getItem('access_token')}})
           .then(response => {
            if(response.data.success)
            {
              Swal.fire({
                  icon: 'success',
                  title: 'Todo List updated successfully!',
                  showConfirmButton: false,
                  timer: 1500
              })
             this.isSaving = false
             this.todo.title = ""
             this.todo.description = ""
             this.$router.push('/dashboard');
            } else {
              Swal.fire({
                  icon: 'error',
                  title: 'An Error Occured!',
                  html: response.data.message,
                  showConfirmButton: false,
                  timer: 10000
             })
             this.isSaving = false
            }
             return response
           })
           .catch(error => {
             this.isSaving = false
             Swal.fire({
                 icon: 'error',
                 title: 'An Error Occured!',
                 showConfirmButton: false,
                 timer: 1500
             })
             return error
           });
     }
   },
 };
 </script>