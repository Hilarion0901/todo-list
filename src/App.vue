

<template>
  <div class="m-5">
    
    <!-- ADD TASK  -->
    
    <div>
      <div class="d-flex justify-content-between align-items-center">
        <div>
          <img src="/todo2.jpg" class="logo"/>
        </div>



        <div :class="'d-flex justify-content-between ' + (!!errorMessageText ? 'align-items-center' :'align-items-end')" >
          <div>
            <CustomInput :default-value="title" label="Titre" placeholder="My task" :error-message="errorMessageText"
              @on-input-change="(value) => title = value" />
          </div>
          <button @click="addTask()" class="btn btn-outline-info addButton">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" height="16px" width="16px">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
          </button>
        </div>


      </div>
    </div>

    <!-- LIST OF TASK -->
    <div>
      <div>
        <p class="completedTask">{{ tasks.length ? 'Tâche(s) accomplie(s) :  ' +completedTaskCount : ''}}</p>
      </div>
      <TaskList :tasks="tasks" @close-modal="$refs.closeModal.click()" @edit-task="(value) => editTask(value)" />
    </div>

    <p v-if="tasks.length == 0" class="text-center " style="font-size: 1.5rem;">
      Vous n'avez aucune tache, veuillez en ajouter
    </p>

  <!-- MODAL  -->
    <div>
      <button v-show="false" type="button" ref="showModal" class="btn btn-primary hidden" data-bs-toggle="modal"
        data-bs-target="#toDo">
        Show modal
      </button>
      <div class="modal fade" id="toDo" tabindex="-1" aria-labelledby="toDoLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header text-center justify-content-center">
              <h5 class="modal-title text-center" id="toDoLabel" style="font-family: overlook;font-style: italic;">Modifier tâche</h5>
            </div>
            <div class="modal-body">
              <div>
                <CustomInput :default-value="singleTask.title" label="Titre" placeholder="My task"
                  @on-input-change="(value) => singleTask.title = value" />
              </div>

              <div style="margin-top: 30px;">
                <label for="description">Description</label>
                <textarea placeholder="Description du task" class="form-control form-control-md" name="description"
                  id="description" rows="5" v-model="singleTask.description"></textarea>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" ref="closeModal" @click="closeModal()" class="btn btn-outline-secondary"
                data-bs-dismiss="modal">Fermer</button>
              <button type="button" @click="saveTask()" class="btn btn-outline-primary">Sauvegarder</button>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>


<script>
import { createApp } from 'vue'
import { createPinia,  mapActions, mapState} from 'pinia'
import App from './App.vue'
import { useTaskStore } from './store/task'
import TaskList from './components/TaskList.vue'
import CustomInput from './components/input/CustomInput.vue'
import { getRandomColor } from './utils'
export default{
  components: {
    TaskList, CustomInput
  },
  data(){
    return {
      showModal: false,
      title: null,
      description: '',
      id: 1,
      singleTask: {},
      errorMessageText: ''
    }
  },
  computed:{
    ...mapState(useTaskStore, [
      'myTaskData',
      'completedTaskCount']),
    tasks(){
      return this.myTaskData;
    }
  },
  created(){
    //initialize pinia
    const pinia = createPinia()
    const app = createApp(App)
    app.use(pinia)
  },
  mounted() {
    this.tasks = this.myTaskData;
    this.id = !!this.tasks.length ? this.tasks[this.tasks.length - 1 ].id + 1 : 1;
  },
  methods: {
    ...mapActions(useTaskStore, [
      'addTaskItem', 
      'deleteTaskItem', 
      'updateTaskItem']),
    addTask(){
      if(this.title){
        this.errorMessageText = '';
        this.addTaskItem({
          id: this.id,
          title: this.title,
          isCompleted: false,
          bgColor: getRandomColor()
        })
        this.id ++
        this.title = null
      }else{
        this.errorMessageText = 'Ce champ est obligatoire';
      }
    },
    handleDeleteTask(taskId){
      this.deleteTaskItem(taskId)
    },
    updateTaskStatus(event, taskId){
      let status = event?.target?.checked;
      this.updateTaskItem(taskId, status)
    },
    saveTask() {
      this.updateTaskItem(this.singleTask.id, null, this.singleTask)
      this.$refs.closeModal.click()
    },
    editTask(val) {
      this.singleTask.id = val.id
      this.singleTask.title = val.title
      this.singleTask.description = val.description
      this.showModalTask = true
      this.$refs.showModal.click()
    },
    closeModal() {
      this.$refs.closeModal.click()
      this.showModalTask = false
    },
  },
}
</script>

<style>
.addButton{
  margin-left: 5px;
}
</style>