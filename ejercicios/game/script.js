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
            var rand = Math.floor(Math.random() * num)
            if (obj.health != 0 || obj.health != 100)
                obj.health += rand
            return rand
        },
        endGame() {
            playButtons.hide = !playButtons.hide,
            startButton.hide = !startButton,
            monster.restart(),
            you.restart(),
            log.reset()
        },
        attack(num) {
            var mons = this.changeHealth(monster, num)
            var me = this.changeHealth(you, num)
            this.changeBar(monster),
            this.changeBar(you),
            log.add(me, mons)
            if (monster.health <= 0){
                alert("YOU WIN")
                this.endGame()
            }
            if (you.health <= 0) {
                alert("MONSTER WIN")
                this.endGame()
            }
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

const log = new Vue({
    el: '#log',
    data:{
        items: [],
    },
    methods: {
        add(me, mons){
            this.item = ['<div class="columns">' + 
                            '<div class="column hero is-success">' + 
                                '<h3 class="has-text-centered">' +
                                    '<strong>' + "Ataque de: " + me +'</strong>' +
                                '</h3>' +
                            '</div>' +
                            '<div class="column hero is-warning">' + 
                                '<h3 class="has-text-centered">' +
                                    '<strong>' + "Ataque de: " + mons + '</strong>' +
                                '</h3>' +
                            '</div>' +
                         '</div></br>'];
            this.items.push(this.item);
        },
        reset() {
            this.items = []
        }
    },
})

