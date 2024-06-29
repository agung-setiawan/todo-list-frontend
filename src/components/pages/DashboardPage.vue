<template>
    <layout-div>
       <div class="row justify-content-md-center">
         <div class="col-12">
             <nav class="navbar navbar-expand-lg navbar-light bg-light top-bar">
                 <div class="container-fluid">
                     <a class="navbar-brand" href="#">Welcome, {{user?.name}}!</a>
                     <div class="d-flex">
                         <ul class="navbar-nav">
                             <li class="nav-item">
                                 <a @click="logoutAction()" class="nav-link " aria-current="page" href="#">Logout</a>
                             </li>
                         </ul>
                     </div>
                 </div>
             </nav>
         </div>
       </div>
       <div class="row justify-content-md-center">
        <div class="col-12">
          <TodoList username="Todo List" />
        </div>
       </div>
    </layout-div>
 </template>
   
 <script>
 import axios from 'axios';
 import LayoutDiv from '../LayoutDiv.vue';
 import TodoList from './TodoList.vue';
 import Swal from 'sweetalert2';
   
  export default {
    name: 'DashboardPage',
    components: {
      LayoutDiv,
      TodoList
    },
    data() {
      return {
        username: "",
        user: {},
      };
    },
    created() {
      this.getUser();
      if(localStorage.getItem('access_token') == "" || localStorage.getItem('access_token') == null){
        this.$router.push('/')
      } else {
        this.getUser();
      }
    },
    methods: {
      getUser() {
          axios.get('/api/user', { headers:{Authorization: 'Bearer ' + localStorage.getItem('access_token')}})
          .then((r) => {
            this.user = r.data.user;
            return r
          })
          .catch((e) => {
            return e
          });
      },
  
      logoutAction () {
        axios.post('/api/logout',{}, { headers:{Authorization: 'Bearer ' + localStorage.getItem('access_token')}})
        .then((r) => {
          Swal.fire({
              icon: 'success',
              title: 'Logout!',
              text: "Logout Success",
              showConfirmButton: false,
              timer: 1500
          })
          localStorage.setItem('access_token', "")
            this.$router.push('/')
          return r
        })
        .catch((e) => {
            return e
        });
      }
    },
  };
 </script>