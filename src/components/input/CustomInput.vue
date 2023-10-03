<template>
    <div>
        <div >
            <label for="title" class="todo-input-text-title">{{ this.label }}</label>
            <input @change="handleChangeInput()" id="title" v-model="inputValue" :class="'form-control form-control-md todo-input-text ' + (!!errorMessage ? 'input-error' : 'mb-1')"
                required type="text" :placeholder="this.placeholder ?? this.label">
            <span v-if="!!errorMessage" class="errorText">
                {{ errorMessage }}
            </span>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        label: {
            type: String,
            required: true
        },
        placeholder: {
            type: String,
        },
        defaultValue: {
            type: String,
            default: ''
        },
        errorMessage: {
            type: String,
            default: ''
        },
    },
    watch: {
        defaultValue: {
            handler(value) {
                this.inputValue = value
            }
        }
    },
    data() {
        return {
            inputValue: ''
        }
    },
    emits: ['onInputChange'],
    methods: {
        handleChangeInput() {
            this.$emit('onInputChange', this.inputValue)
        }
    }
}
</script>