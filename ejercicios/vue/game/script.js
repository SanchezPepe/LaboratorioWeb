const app = new Vue({
    el: '#log',
    data: {
        message: 'Ejemplo con VueJs',
        vue: 'Esto es un ejemplo del uso de directivas',
        hasMessage: true,
    },
    methods: {
        logMessage() {
            console.log(this.message);
        },
        toggleMessage() {
            this.hasMessage = !this.hasMessage;
        },
    },
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
            startButton.hide = !startButton
        },
    },
})
