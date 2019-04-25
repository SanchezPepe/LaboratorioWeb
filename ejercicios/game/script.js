const app = new Vue({
    el: '#load-date',
    data: {
        message: 'Ejemplo con VueJs',
        vue: 'You loaded this page on ' + new Date().toLocaleString(),
    }
})

const startButton = new Vue({
    el: '#start',
    data: {
        hide: false,
    },
    methods: {
        startGame() {
            this.hide = !this.hide,
            playButtons.hide = false
        },
    },
})

const playButtons = new Vue({
    el: '#play',
    data: {
        hide: true,
    },
    methods: {
        endGame() {
            playButtons.hide = !playButtons.hide,
            startButton.hide = !startButton,
            monsterHealth.health = 100,
            yourHealth.health = 100
        },
        attack() {
            monsterHealth.health -= Math.floor(Math.random() * 15);
            yourHealth.health -= Math.floor(Math.random() * 15);            
        },
        superAttack() {
            monsterHealth.health -= Math.floor(Math.random() * 30);
            yourHealth.health -= Math.floor(Math.random() * 30);            
        },
        heal() {
            yourHealth.health += Math.floor(Math.random() * 15);            
        },
    },
})

const yourHealth = new Vue({
    el: '#you',
    data: {
        health: 100,
    },
})

const monsterHealth = new Vue({
    el: '#rival',
    data: {
        health: 100,
    },
})





//====================================TESTING

var app4 = new Vue({
    el: '#app-4',
    data: {
        todos: [{
                text: 'Learn JavaScript'
            },
            {
                text: 'Learn Vue'
            },
            {
                text: 'Build something awesome'
            }
        ]
    }
})

var app5 = new Vue({
    el: '#app-5',
    data: {
        message: 'Hello Vue.js!'
    },
    methods: {
        reverseMessage: function () {
            this.message = this.message.split('').reverse().join('')
        }
    }
})

var app6 = new Vue({
    el: '#app-6',
    data: {
        message: 'Hello Vue!'
    }
})

Vue.component('todo-item', {
    props: ['todo'],
    template: '<li>{{ todo.text }}</li>'
})

var app7 = new Vue({
    el: '#app-7',
    data: {
        groceryList: [{
                id: 0,
                text: 'Vegetables'
            },
            {
                id: 1,
                text: 'Cheese'
            },
            {
                id: 2,
                text: 'Whatever else humans are supposed to eat'
            }
        ]
    }
})