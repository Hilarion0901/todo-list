<template>
    <div>
        <div v-if="tasks.length > 0">
            <div class="row">
                <div class="card shadow-0 mb-3 col-md-4 col-sm-6 cursor-pointer cardTask"  :style="'max-width: 18rem; margin: 1%; background-color: ' + (task.isCompleted ? 'rgba(0, 128, 0, 0.5)' : task.bgColor)"
                     v-for="task in tasks" :key="task.id" >
                    <div class="card-header bg-transparent text-left">{{ task.title }}</div>
                    <div class="card-body">
                        <p class="card-text">{{ task.description ?? '-'}}</p>
                    </div>
                    <div class="card-footer bg-transparent">
                        <div class="d-flex justify-content-end align-items-center">
                            <div class="form-check form-switch">
                                <input @change.stop="(event) => updateTaskStatus(event, task.id)" class="form-check-input" type="checkbox" role="switch" :id="task.id" :checked="task.isCompleted">
                                <label class="form-check-label" :for="task.id"></label>
                            </div>
                            <button class="btn " @click.stop="editTask(task)">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" height="16px" width="16px"
                                    viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                                </svg>
                            </button>
                            <button class="btn btn-danger" @click="handleDeleteTask(task.id)">
                                <svg xmlns="http://www.w3.org/2000/svg" height="16px" width="16px" fill="none"
                                    viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapActions} from 'pinia'
import { useTaskStore } from '../store/task';

export default {
    props: {
        tasks: {
            type: [Array, Object],
            required: true,
            default: []
        }
    },
    data() {
        return {
            singleTask: {},
            title: "",
            description: ""
        }
    },
    emits: ['closeModal', 'editTask', 'saveTask'],
    methods: {
        ...mapActions(useTaskStore, [
            'addTaskItem', 
            'deleteTaskItem', 
            'updateTaskItem'
        ]),
        updateTaskStatus(event, taskId){
            let status = event?.target?.checked;
            this.updateTaskItem(taskId, status)
        },
        editTask(task) {
            this.singleTask = task
            this.$emit('editTask', task)
        },
        closeModal() {
            this.title = ''
            this.description = ''
            this.$emit('closeModal')
        },
        handleDeleteTask(taskId){
            this.deleteTaskItem(taskId)
        },
    },
}
</script>

<style>
</style>