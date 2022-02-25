const app = Vue.createApp({

    data() {
        return {
            viePerso:100,
            vieIA:100,
            currentRound:0,
            disabledMagie: false,
            disabledAction: false,
            winner: ''
        };
    },

    methods: {
        attackAdversaire() {
            this.disabledAction = true;
            let random = 10 + Math.floor(Math.random()*10);
            this.vieIA -= random;

            if(this.vieIA <= 0){
                this.vieIA = 0;
            } else {
                this.attackPlayer();

                if(this.currentRound>0){
                    this.currentRound--;
                }
            }
        },
        attackPlayer() {
            setTimeout(()=>{
                let random = 13 + Math.floor(Math.random()*13);
                this.viePerso -= random;

                this.disabledAction = false;

                if(this.viePerso < 0){
                    this.viePerso = 0;
                }
            },1000);
        },
        attackMagik() {
            this.disabledAction = true;
            let random = 20 + Math.floor(Math.random()*20);
            this.vieIA -= random;

            if(this.vieIA < 0){
                this.vieIA = 0;
            } else {
                this.attackPlayer();

                this.currentRound = 3;
            }
        },
        soigner() {
            this.disabledAction = true;
            let random = 12+ Math.floor(Math.random()*24);
            this.viePerso += random;
            if(this.viePerso > 100){
                this.viePerso = 100;
            }
            this.attackPlayer();

            if(this.currentRound>0){
                this.currentRound--;
            }
        }, 
        abandonner() {
            this.viePerso = 0;
        },
        restart() {
            window.location.reload();
        }
    },
    watch: {
        currentRound(val) {
            if(val == 0) {
                this.disabledMagie=false;
            }
            else {
                this.disabledMagie=true;
            }
        },
        viePerso(val) {
            if(val == 0) {
                this.winner = "PERDU";
            }
        },
        vieIA(val) {
            if(val == 0) {
                this.winner = "VICTOIRE";;
            }
        }
    },
    computed: {

    }

});
app.mount('#app');