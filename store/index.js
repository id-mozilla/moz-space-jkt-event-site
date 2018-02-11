import Vuex from 'vuex';

const CreateStore = () => {
  return new Vuex.Store({
    state: {
      loadedEvents: []
    },
    mutations: {
      SET_EVENTS(state, events) {
        state.loadedEvents = events;
      }
    },
    actions: {
      nuxtServerInit(vuexCtx, ctx) {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            vuexCtx.commit('SET_EVENTS', [
              {
                id: 'as323131af',
                title: "#MozBelajar CSS Grid",
                slug: "moz-belajar-css-grid",
                organization: "Mozilla Indonesia",
                description: "Anggap aja ini description dulu ya",
              },
              {
                id: 'as32kjfas',
                title: "#MozBelajar Firefox Quantum",
                slug: "moz-belajar-firefox-quantum",
                organization: "Mozilla Indonesia",
                description: "Anggap aja ini description dulu ya",
              },
            ])
            resolve()
          }, 1500)
        });
      },
      setEvents(vuexCtx, events) {
        vuexCtx.commit('SET_EVENT', events);
      }
    },
    getters: {
      loadedEvents(state) {
          return state.loadedEvents;
      }
    }
  })
}

export default CreateStore;