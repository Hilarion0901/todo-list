import { defineStore } from 'pinia'
import { hexToRgba } from '../utils'

interface Task {
    id: Number;
    title: String;
    description?: String;
    isCompleted?: Boolean;
    bgColor?: String;
}
var taskLocaleJSON = localStorage.getItem('myTaskList');

export const useTaskStore = defineStore('task', {
    state:() => ({
        myTaskList: taskLocaleJSON !== null ? JSON.parse(taskLocaleJSON) : <Task[]>[],
        currentTodo: <Task>{}
    }),
    getters: {
        myTaskData: (state) =>  state.myTaskList,
        completedTaskCount: (state) => {
            if (state.myTaskList) {
              return (state.myTaskList.filter((task: Task) => task.isCompleted).length)+'/'+state.myTaskList.length;
            } else {
              return 0;
            }
        }
    },
    actions: {
        addTaskItem(task: Task){
            task.bgColor = hexToRgba(task.bgColor, 0.5);
            this.myTaskList.push(task)
            localStorage.setItem('myTaskList', JSON.stringify(this.myTaskList))
        },
        deleteTaskItem(id: Number){
            let myTaskList = this.myTaskList.filter((task: Task) => task.id!== id);
            this.myTaskList = myTaskList;
            localStorage.setItem('myTaskList', JSON.stringify(this.myTaskList))   
        },
        updateTaskItem(id: Number, status: Boolean, task: Task){
            const taskToUpdate = this.myTaskList.find((task: Task) => task.id === id);
            if (taskToUpdate) {
               
                if(status != null && status != undefined){
                    taskToUpdate.isCompleted = status;
                }else{
                    taskToUpdate.title = task.title;
                    taskToUpdate.description = task.description;
                }  
                // Update the task in the list
                var myToDoList = this.myTaskList.map((task: Task) => {
                    if (task.id === id) {
                        return taskToUpdate;
                    } else {
                        return task;
                    }
                });
                this.myTaskList = myToDoList
                
                // Update the myTaskList in localStorage
                localStorage.setItem('myTaskList', JSON.stringify(this.myTaskList));
            }
        },
    }
  })