const app = Vue.createApp({

    data() {
        return {
            viePerso:100,
            vieIA:100,
            currentRound:0,
            disabledMagie: false,
            winner: ''
        };
    },

    methods: {
        attackAdversaire() {
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

                if(this.viePerso < 0){
                    this.viePerso = 0;
                }
            },1000);
        },
        attackMagik() {
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
        theEnd() {
            
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
                this.disabled=false;
            }
            else {
                this.disabled=true;
            }
        }
    },
    computed: {

    }

});
app.mount('#app');