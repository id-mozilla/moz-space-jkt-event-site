<template>
  <v-layout>
        <div v-if="participant" class="pyro">
          <div class="before"></div>
          <div class="after"></div>
        </div>
    <v-flex xs12 class="text-xs-center pa-5">
      <h2 class="heading ma-5">Selamat Datang di <br> Mozilla Community Space Jakarta</h2>

      <v-layout>
        <v-flex xs4>
          <img src="~/assets/images/dimo-halo.png" 
            class="dimo-halo"
            alt="Halo Dimo">
        </v-flex>
        <v-flex xs4 class="text-xs-center mt-5">
          <div v-if="showParticipant">
            <h1  class="display-2 mt-5">{{ participant.name }}</h1>
            <h3 class="subheading mt-3">Selamat belajar dan bersenang-senang!</h3>
          </div>
          <div v-else >
            <h1 class="heading">" The internet is a global public resource that must remain open and accessible."</h1>
            <h3 class="subheading mt-3">- Mozilla Manifesto</h3>
          </div>
        </v-flex>
        <v-flex xs4 class="text-xs-center mt-5">
          <img src="~/assets/images/dimo-hore.png" 
            class="dimo-hore"
            style="max-height: 350px;"
            alt="Halo Dimo">
        </v-flex>
      </v-layout>

    </v-flex>
  </v-layout>
</template>

<script>
import socket from '~/plugins/socket-io'


export default {
  name: 'WelcomeToMozSpace',
  beforeMount() {
    socket.on('new-participant', (newParticipant) => {
      this.participant = newParticipant;
      this.showParticipant = true
      this.removeParticipant()
    })
    socket.on('joined-participant', (newParticipant) => {
      this.participant = newParticipant;
      this.showParticipant = true
      this.removeParticipant()
    })
  },
  computed: {
  },
  data() {
    return {
      participant: null,
      showParticipant: false,
    }
  },
  methods: {
    removeParticipant() {
      setTimeout(() => {
        this.showParticipant = false
      }, 30000);
    },
  }
}

</script>
<style>
.dimo-halo{
  max-height: 350px;
  position: fixed;
  bottom: 5px;
  left: 50px;
}

.dimo-hore{
  max-height: 300px;
  position: fixed;
  bottom: 5px;
  right: 50px;
}
body {
  margin: 0;
  padding: 0;
  background: #000;
  overflow: hidden;
}

.pyro > .before, .pyro > .after {
  position: absolute;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  box-shadow: 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff, 0 0 #fff;
  -moz-animation: 1s bang ease-out infinite backwards, 1s gravity ease-in infinite backwards, 5s position linear infinite backwards;
  -webkit-animation: 1s bang ease-out infinite backwards, 1s gravity ease-in infinite backwards, 5s position linear infinite backwards;
  -o-animation: 1s bang ease-out infinite backwards, 1s gravity ease-in infinite backwards, 5s position linear infinite backwards;
  -ms-animation: 1s bang ease-out infinite backwards, 1s gravity ease-in infinite backwards, 5s position linear infinite backwards;
  animation: 1s bang ease-out infinite backwards, 1s gravity ease-in infinite backwards, 5s position linear infinite backwards;
}

.pyro > .after {
  -moz-animation-delay: 1.25s, 1.25s, 1.25s;
  -webkit-animation-delay: 1.25s, 1.25s, 1.25s;
  -o-animation-delay: 1.25s, 1.25s, 1.25s;
  -ms-animation-delay: 1.25s, 1.25s, 1.25s;
  animation-delay: 1.25s, 1.25s, 1.25s;
  -moz-animation-duration: 1.25s, 1.25s, 6.25s;
  -webkit-animation-duration: 1.25s, 1.25s, 6.25s;
  -o-animation-duration: 1.25s, 1.25s, 6.25s;
  -ms-animation-duration: 1.25s, 1.25s, 6.25s;
  animation-duration: 1.25s, 1.25s, 6.25s;
}

@-webkit-keyframes bang {
  to {
    box-shadow: 216px -303.6666666667px #0048ff, -40px -201.6666666667px #00ff2b, -66px -392.6666666667px #d000ff, 246px -150.6666666667px #ff0033, -190px 68.3333333333px #8800ff, 59px -373.6666666667px #ffe100, -14px -353.6666666667px blue, 7px -413.6666666667px #66ff00, 129px -154.6666666667px #80ff00, -91px 41.3333333333px #3700ff, 2px -98.6666666667px #ff005e, -148px 31.3333333333px #000dff, 212px -134.6666666667px #0dff00, -215px -195.6666666667px #00ffcc, -183px -365.6666666667px deepskyblue, -12px -62.6666666667px #ea00ff, 228px -137.6666666667px #e100ff, 161px -377.6666666667px magenta, -68px -262.6666666667px #ff00ae, 137px -277.6666666667px #00ddff, 12px -174.6666666667px #0059ff, 204px -349.6666666667px #00bbff, 63px -126.6666666667px #002fff, 142px -187.6666666667px #00ffbb, -223px -53.6666666667px #00ff48, 94px 0.3333333333px #bf00ff, 212px -82.6666666667px #48ff00, -227px 56.3333333333px #bb00ff, 109px 39.3333333333px #00ff37, 194px -10.6666666667px #48ff00, -184px -83.6666666667px #00ff62, -239px -49.6666666667px #ff0095, -225px -267.6666666667px #ff00aa, 20px -408.6666666667px #ff00fb, 10px -163.6666666667px #0055ff, -141px 19.3333333333px #fbff00, -245px -247.6666666667px #fffb00, 188px -90.6666666667px #ff002b, -228px -165.6666666667px red, -216px -216.6666666667px #aa00ff, 239px 31.3333333333px #d500ff, 123px -17.6666666667px #00ff8c, -98px -68.6666666667px #99ff00, 181px -267.6666666667px #ff00f2, -129px -63.6666666667px #ffd000, 70px -308.6666666667px #00a2ff, 154px -302.6666666667px #00ff5e, -82px 49.3333333333px #00ffb3, 247px -79.6666666667px #0066ff, -162px -102.6666666667px #0026ff, 119px 23.3333333333px #ff005e;
  }
}
@-moz-keyframes bang {
  to {
    box-shadow: 216px -303.6666666667px #0048ff, -40px -201.6666666667px #00ff2b, -66px -392.6666666667px #d000ff, 246px -150.6666666667px #ff0033, -190px 68.3333333333px #8800ff, 59px -373.6666666667px #ffe100, -14px -353.6666666667px blue, 7px -413.6666666667px #66ff00, 129px -154.6666666667px #80ff00, -91px 41.3333333333px #3700ff, 2px -98.6666666667px #ff005e, -148px 31.3333333333px #000dff, 212px -134.6666666667px #0dff00, -215px -195.6666666667px #00ffcc, -183px -365.6666666667px deepskyblue, -12px -62.6666666667px #ea00ff, 228px -137.6666666667px #e100ff, 161px -377.6666666667px magenta, -68px -262.6666666667px #ff00ae, 137px -277.6666666667px #00ddff, 12px -174.6666666667px #0059ff, 204px -349.6666666667px #00bbff, 63px -126.6666666667px #002fff, 142px -187.6666666667px #00ffbb, -223px -53.6666666667px #00ff48, 94px 0.3333333333px #bf00ff, 212px -82.6666666667px #48ff00, -227px 56.3333333333px #bb00ff, 109px 39.3333333333px #00ff37, 194px -10.6666666667px #48ff00, -184px -83.6666666667px #00ff62, -239px -49.6666666667px #ff0095, -225px -267.6666666667px #ff00aa, 20px -408.6666666667px #ff00fb, 10px -163.6666666667px #0055ff, -141px 19.3333333333px #fbff00, -245px -247.6666666667px #fffb00, 188px -90.6666666667px #ff002b, -228px -165.6666666667px red, -216px -216.6666666667px #aa00ff, 239px 31.3333333333px #d500ff, 123px -17.6666666667px #00ff8c, -98px -68.6666666667px #99ff00, 181px -267.6666666667px #ff00f2, -129px -63.6666666667px #ffd000, 70px -308.6666666667px #00a2ff, 154px -302.6666666667px #00ff5e, -82px 49.3333333333px #00ffb3, 247px -79.6666666667px #0066ff, -162px -102.6666666667px #0026ff, 119px 23.3333333333px #ff005e;
  }
}
@-o-keyframes bang {
  to {
    box-shadow: 216px -303.6666666667px #0048ff, -40px -201.6666666667px #00ff2b, -66px -392.6666666667px #d000ff, 246px -150.6666666667px #ff0033, -190px 68.3333333333px #8800ff, 59px -373.6666666667px #ffe100, -14px -353.6666666667px blue, 7px -413.6666666667px #66ff00, 129px -154.6666666667px #80ff00, -91px 41.3333333333px #3700ff, 2px -98.6666666667px #ff005e, -148px 31.3333333333px #000dff, 212px -134.6666666667px #0dff00, -215px -195.6666666667px #00ffcc, -183px -365.6666666667px deepskyblue, -12px -62.6666666667px #ea00ff, 228px -137.6666666667px #e100ff, 161px -377.6666666667px magenta, -68px -262.6666666667px #ff00ae, 137px -277.6666666667px #00ddff, 12px -174.6666666667px #0059ff, 204px -349.6666666667px #00bbff, 63px -126.6666666667px #002fff, 142px -187.6666666667px #00ffbb, -223px -53.6666666667px #00ff48, 94px 0.3333333333px #bf00ff, 212px -82.6666666667px #48ff00, -227px 56.3333333333px #bb00ff, 109px 39.3333333333px #00ff37, 194px -10.6666666667px #48ff00, -184px -83.6666666667px #00ff62, -239px -49.6666666667px #ff0095, -225px -267.6666666667px #ff00aa, 20px -408.6666666667px #ff00fb, 10px -163.6666666667px #0055ff, -141px 19.3333333333px #fbff00, -245px -247.6666666667px #fffb00, 188px -90.6666666667px #ff002b, -228px -165.6666666667px red, -216px -216.6666666667px #aa00ff, 239px 31.3333333333px #d500ff, 123px -17.6666666667px #00ff8c, -98px -68.6666666667px #99ff00, 181px -267.6666666667px #ff00f2, -129px -63.6666666667px #ffd000, 70px -308.6666666667px #00a2ff, 154px -302.6666666667px #00ff5e, -82px 49.3333333333px #00ffb3, 247px -79.6666666667px #0066ff, -162px -102.6666666667px #0026ff, 119px 23.3333333333px #ff005e;
  }
}
@-ms-keyframes bang {
  to {
    box-shadow: 216px -303.6666666667px #0048ff, -40px -201.6666666667px #00ff2b, -66px -392.6666666667px #d000ff, 246px -150.6666666667px #ff0033, -190px 68.3333333333px #8800ff, 59px -373.6666666667px #ffe100, -14px -353.6666666667px blue, 7px -413.6666666667px #66ff00, 129px -154.6666666667px #80ff00, -91px 41.3333333333px #3700ff, 2px -98.6666666667px #ff005e, -148px 31.3333333333px #000dff, 212px -134.6666666667px #0dff00, -215px -195.6666666667px #00ffcc, -183px -365.6666666667px deepskyblue, -12px -62.6666666667px #ea00ff, 228px -137.6666666667px #e100ff, 161px -377.6666666667px magenta, -68px -262.6666666667px #ff00ae, 137px -277.6666666667px #00ddff, 12px -174.6666666667px #0059ff, 204px -349.6666666667px #00bbff, 63px -126.6666666667px #002fff, 142px -187.6666666667px #00ffbb, -223px -53.6666666667px #00ff48, 94px 0.3333333333px #bf00ff, 212px -82.6666666667px #48ff00, -227px 56.3333333333px #bb00ff, 109px 39.3333333333px #00ff37, 194px -10.6666666667px #48ff00, -184px -83.6666666667px #00ff62, -239px -49.6666666667px #ff0095, -225px -267.6666666667px #ff00aa, 20px -408.6666666667px #ff00fb, 10px -163.6666666667px #0055ff, -141px 19.3333333333px #fbff00, -245px -247.6666666667px #fffb00, 188px -90.6666666667px #ff002b, -228px -165.6666666667px red, -216px -216.6666666667px #aa00ff, 239px 31.3333333333px #d500ff, 123px -17.6666666667px #00ff8c, -98px -68.6666666667px #99ff00, 181px -267.6666666667px #ff00f2, -129px -63.6666666667px #ffd000, 70px -308.6666666667px #00a2ff, 154px -302.6666666667px #00ff5e, -82px 49.3333333333px #00ffb3, 247px -79.6666666667px #0066ff, -162px -102.6666666667px #0026ff, 119px 23.3333333333px #ff005e;
  }
}
@keyframes bang {
  to {
    box-shadow: 216px -303.6666666667px #0048ff, -40px -201.6666666667px #00ff2b, -66px -392.6666666667px #d000ff, 246px -150.6666666667px #ff0033, -190px 68.3333333333px #8800ff, 59px -373.6666666667px #ffe100, -14px -353.6666666667px blue, 7px -413.6666666667px #66ff00, 129px -154.6666666667px #80ff00, -91px 41.3333333333px #3700ff, 2px -98.6666666667px #ff005e, -148px 31.3333333333px #000dff, 212px -134.6666666667px #0dff00, -215px -195.6666666667px #00ffcc, -183px -365.6666666667px deepskyblue, -12px -62.6666666667px #ea00ff, 228px -137.6666666667px #e100ff, 161px -377.6666666667px magenta, -68px -262.6666666667px #ff00ae, 137px -277.6666666667px #00ddff, 12px -174.6666666667px #0059ff, 204px -349.6666666667px #00bbff, 63px -126.6666666667px #002fff, 142px -187.6666666667px #00ffbb, -223px -53.6666666667px #00ff48, 94px 0.3333333333px #bf00ff, 212px -82.6666666667px #48ff00, -227px 56.3333333333px #bb00ff, 109px 39.3333333333px #00ff37, 194px -10.6666666667px #48ff00, -184px -83.6666666667px #00ff62, -239px -49.6666666667px #ff0095, -225px -267.6666666667px #ff00aa, 20px -408.6666666667px #ff00fb, 10px -163.6666666667px #0055ff, -141px 19.3333333333px #fbff00, -245px -247.6666666667px #fffb00, 188px -90.6666666667px #ff002b, -228px -165.6666666667px red, -216px -216.6666666667px #aa00ff, 239px 31.3333333333px #d500ff, 123px -17.6666666667px #00ff8c, -98px -68.6666666667px #99ff00, 181px -267.6666666667px #ff00f2, -129px -63.6666666667px #ffd000, 70px -308.6666666667px #00a2ff, 154px -302.6666666667px #00ff5e, -82px 49.3333333333px #00ffb3, 247px -79.6666666667px #0066ff, -162px -102.6666666667px #0026ff, 119px 23.3333333333px #ff005e;
  }
}
@-webkit-keyframes gravity {
  to {
    transform: translateY(200px);
    -moz-transform: translateY(200px);
    -webkit-transform: translateY(200px);
    -o-transform: translateY(200px);
    -ms-transform: translateY(200px);
    opacity: 0;
  }
}
@-moz-keyframes gravity {
  to {
    transform: translateY(200px);
    -moz-transform: translateY(200px);
    -webkit-transform: translateY(200px);
    -o-transform: translateY(200px);
    -ms-transform: translateY(200px);
    opacity: 0;
  }
}
@-o-keyframes gravity {
  to {
    transform: translateY(200px);
    -moz-transform: translateY(200px);
    -webkit-transform: translateY(200px);
    -o-transform: translateY(200px);
    -ms-transform: translateY(200px);
    opacity: 0;
  }
}
@-ms-keyframes gravity {
  to {
    transform: translateY(200px);
    -moz-transform: translateY(200px);
    -webkit-transform: translateY(200px);
    -o-transform: translateY(200px);
    -ms-transform: translateY(200px);
    opacity: 0;
  }
}
@keyframes gravity {
  to {
    transform: translateY(200px);
    -moz-transform: translateY(200px);
    -webkit-transform: translateY(200px);
    -o-transform: translateY(200px);
    -ms-transform: translateY(200px);
    opacity: 0;
  }
}
@-webkit-keyframes position {
  0%, 19.9% {
    margin-top: 10%;
    margin-left: 40%;
  }
  20%, 39.9% {
    margin-top: 40%;
    margin-left: 30%;
  }
  40%, 59.9% {
    margin-top: 20%;
    margin-left: 70%;
  }
  60%, 79.9% {
    margin-top: 30%;
    margin-left: 20%;
  }
  80%, 99.9% {
    margin-top: 30%;
    margin-left: 80%;
  }
}
@-moz-keyframes position {
  0%, 19.9% {
    margin-top: 10%;
    margin-left: 40%;
  }
  20%, 39.9% {
    margin-top: 40%;
    margin-left: 30%;
  }
  40%, 59.9% {
    margin-top: 20%;
    margin-left: 70%;
  }
  60%, 79.9% {
    margin-top: 30%;
    margin-left: 20%;
  }
  80%, 99.9% {
    margin-top: 30%;
    margin-left: 80%;
  }
}
@-o-keyframes position {
  0%, 19.9% {
    margin-top: 10%;
    margin-left: 40%;
  }
  20%, 39.9% {
    margin-top: 40%;
    margin-left: 30%;
  }
  40%, 59.9% {
    margin-top: 20%;
    margin-left: 70%;
  }
  60%, 79.9% {
    margin-top: 30%;
    margin-left: 20%;
  }
  80%, 99.9% {
    margin-top: 30%;
    margin-left: 80%;
  }
}
@-ms-keyframes position {
  0%, 19.9% {
    margin-top: 10%;
    margin-left: 40%;
  }
  20%, 39.9% {
    margin-top: 40%;
    margin-left: 30%;
  }
  40%, 59.9% {
    margin-top: 20%;
    margin-left: 70%;
  }
  60%, 79.9% {
    margin-top: 30%;
    margin-left: 20%;
  }
  80%, 99.9% {
    margin-top: 30%;
    margin-left: 80%;
  }
}
@keyframes position {
  0%, 19.9% {
    margin-top: 10%;
    margin-left: 40%;
  }
  20%, 39.9% {
    margin-top: 40%;
    margin-left: 30%;
  }
  40%, 59.9% {
    margin-top: 20%;
    margin-left: 70%;
  }
  60%, 79.9% {
    margin-top: 30%;
    margin-left: 20%;
  }
  80%, 99.9% {
    margin-top: 30%;
    margin-left: 80%;
  }
}


</style>


