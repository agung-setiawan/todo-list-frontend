<template>
	<div class="container">
		<h2 class="text-center mt-5 mb-3">Todo List</h2>
		<div class="card">
			<div class="card-header">
				<router-link to="/create"
					class="btn btn-outline-primary"
					>Create New Todo List
				</router-link>
			</div>
			<div class="card-body">
			
				<table class="table table-bordered">
					<thead>
						<tr>
							<th>Todo Title</th>
							<th>Description</th>
							<th width="240px">Action</th>
						</tr>
					</thead>
					<tbody>
							
						<tr v-for="todo in todos" :key="todo.id">
							<td>{{todo.title}}</td>
							<td>{{todo.description}}</td>
							<td>
								<div class="text-center">
									<router-link :to="`/show/${todo.id}`" class="btn btn-outline-info mx-1">Show</router-link>
									<router-link :to="`/edit/${todo.id}`" class="btn btn-outline-success mx-1">Edit</router-link>
									<button 
										@click="handleDelete(todo.id)"
										className="btn btn-outline-danger mx-1">
										Delete
									</button>
								</div>
							</td>
						</tr>                                 
					</tbody>
				</table>
			</div>
		</div>
	</div>
</template>

<script>
	import axios from 'axios';
	import Swal from 'sweetalert2'
	
	export default {
		name: 'TodoList',
		data() {
			return {
				todos:[]
			}
		},
		created() {
			this.fetchTodoList();
		},
		methods: {
			fetchTodoList() {
				axios.get('/api/my/todo-list', { headers:{Authorization: 'Bearer ' + localStorage.getItem('access_token')}})
				.then(response => {
					this.todos = response.data.data;
					return response
				})
				.catch(error => {
					return error
				});
			},
			handleDelete(id){
				Swal.fire({
					title: 'Are you sure?',
					text: "You won't be able to revert this!",
					icon: 'warning',
					showCancelButton: true,
					confirmButtonColor: '#3085d6',
					cancelButtonColor: '#d33',
					confirmButtonText: 'Yes, delete it!'
				}).then((result) => {
					if (result.isConfirmed) {
						axios.delete(`/api/remove/todo-list/${id}`, { headers:{Authorization: 'Bearer ' + localStorage.getItem('access_token')}})
						.then( response => {
							Swal.fire({
								icon: 'success',
								title: 'Todo List deleted successfully!',
								showConfirmButton: false,
								timer: 1500
							})
							this.fetchTodoList();
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
						});
					}
				})
			}
		},
	}
</script>