<template>
    <layout-div>
      <h2 class="text-center mt-5 mb-3">Create New Todo List</h2>
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
                      <label htmlFor="name">Todo Title</label>
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
                  <button 
                      @click="handleSave()"
                      :disabled="isSaving"
                      type="button"
                      class="btn btn-outline-primary mt-3">
                      Save Todo List
                  </button>
              </form>
          </div>
      </div>
    </layout-div>
  </template>
   
  <script>
  import axios from 'axios';
  import LayoutDiv from '@/components/LayoutDiv.vue';
  import Swal from 'sweetalert2';
   
  export default {
    name: 'NewPage',
    components: {
      LayoutDiv,
    },
    data() {
      return {
        todo: {
          title: '',
          description: '',
        },
        isSaving:false,
      };
    },
    methods: {
      handleSave() {
          this.isSaving = true
          axios.post('/api/create/todo-list', this.todo, { headers:{Authorization: 'Bearer ' + localStorage.getItem('access_token')}})
            .then(response => {
              Swal.fire({
                  icon: 'success',
                  title: 'New Todo List saved successfully!',
                  showConfirmButton: false,
                  timer: 1500
              })
              this.isSaving = false
              this.todo.title = ""
              this.todo.description = ""
              this.$router.push('/dashboard');
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
      },
    },
  };
  </script>