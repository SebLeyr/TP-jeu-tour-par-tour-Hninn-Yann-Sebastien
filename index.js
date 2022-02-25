const app = Vue.createApp({

    data() {
        return {
            viePerso:100,
            vieIA:100,
            currentRound:0,
            disabledMagie: false,
            disabledAction: false,
            winner: '',
            log: [],
            actionJoueur: '',
            actionIA: '',
            robotAttack: false,
            ninjaMagik: false,
            ninjaHeal: false
        };
    },

    methods: {
        attackAdversaire() {
            this.disabledAction = true;
            let random = 10 + Math.floor(Math.random()*10);
            this.vieIA -= random;
            this.actionJoueur = `Vous lancez une attaque qui inflige ${random} !`;
            this.log.unshift(this.actionJoueur);
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
                this.robotAttack=true;
                let random = 13 + Math.floor(Math.random()*13);
                this.viePerso -= random;
                this.actionIA = `L'adversaire lance une attaque qui vous inflige ${random} !`;
                this.log.unshift(this.actionIA);
                this.disabledAction = false;
                if(this.viePerso < 0){
                    this.viePerso = 0;
                }
                setTimeout(() => {
                    this.robotAttack = !this.robotAttack;
                },500);
            },500);
            
        },
        attackMagik() {
            this.ninjaMagik = true;
            this.disabledAction = true;
            let random = 20 + Math.floor(Math.random()*20);
            this.vieIA -= random;
            this.actionJoueur = `Vous lancez une attaque magique qui inflige ${random} !`;
            this.log.unshift(this.actionJoueur);
            setTimeout(() => {
                this.ninjaMagik = !this.ninjaMagik;
            },2000);
            if(this.vieIA < 0){
                this.vieIA = 0;
            } else {
                setTimeout(() => {
                    this.attackPlayer();
                },1500);
                this.currentRound = 3;
            }
        },
        soigner() {
            this.ninjaHeal = true;
            this.disabledAction = true;
            let random = 12+ Math.floor(Math.random()*24);
            this.viePerso += random;
            this.actionJoueur = `Vous vous soignez ${random} PV !`;
            this.log.unshift(this.actionJoueur);
            setTimeout(() => {
                this.ninjaHeal = !this.ninjaHeal;
            },500);
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
        allClass(){
            if(this.viePerso == 0){
                return 'loseBg';
            }

            if(this.vieIA == 0){
                return 'winBg';
            }
        }
    }

});
app.mount('#app');