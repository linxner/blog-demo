var store = {
    save(key, value) {
        localStorage.setItem(key, JSON.stringify(value))
    },
    fetch(key) {
       return JSON.parse(localStorage.getItem(key)) || []
    }
}
var list = store.fetch('my-task')
new Vue({
    el: '.main',
    data: {
        list: list,
        todo: '',
        editorTasks: '',
        beforeTask: '',
    },
    computed: {
        unfinishedTask: function () {
            return this.list.filter(function (item) {
                return !item.isChecked
            }).length
        }
    },
    methods: {
        addTodo(todo) {
            if (this.todo !== '') {
                this.list.push({
                    title: this.todo,
                    isChecked: false
                })
            }
            this.todo = ''
        },
        delet(todo) {
            var index = this.list.indexOf(todo);
            this.list.splice(index, 1)
        },
        editorTask(todo) {
            this.beforeTask = todo.title
            this.editorTasks = todo
        },
        editorTasked(todo) {
            this.editorTasks = ''
            if (todo.title === '') {
                todo.title = this.beforeTask
            }
        },
        cancelTasked(todo) {
            todo.title = this.beforeTask
            this.beforeTask = ''
            this.editorTasks = ''
        }
    },
    directives: {
        "focus": {
            update(el, binding) {
                if (binding.value) {
                    el.focus()
                }
            }
        }
    },
    watch: {
        list: {
            handler: function () {
                store.save('my-task', this.list)
            },
            deep: true

        }
    }
})