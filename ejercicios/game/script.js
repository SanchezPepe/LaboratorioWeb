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
        changeHealth(obj, num) {
            if (obj.health != 0 || obj.health != 100)
                obj.health += Math.floor(Math.random() * num)
        },
        endGame() {
            playButtons.hide = !playButtons.hide,
            startButton.hide = !startButton,
            monster.restart(),
            you.restart()
        },
        attack(num) {
            this.changeHealth(monster, num),
            this.changeHealth(you, num),
            this.changeBar(monster),
            this.changeBar(you)
        },
        heal() {
            this.changeHealth(monster, 15),
            this.changeHealth(you, 15),
            this.changeBar(monster),
            this.changeBar(you)
        },
        changeBar(obj) {
            if (obj.health <= 30) {
                obj.green = false;
                obj.red = true;
            } else {
                obj.green = true;
                obj.red = false
            }
        },
    },
})

const you = new Vue({
    el: '#you',
    data: {
        health: 100,
        green: true,
        red: false
    },
    methods: {
        restart(){
            this.green = true,
            this.red = false,
            this.health = 100
        }
    },
})

const monster = new Vue({
    el: '#rival',
    data: {
        health: 100,
        green: true,
        red: false
    },
    methods: {
        restart(){
            this.green = true,
            this.red = false,
            this.health = 100
        }
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