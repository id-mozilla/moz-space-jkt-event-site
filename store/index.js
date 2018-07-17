import Vuex from 'vuex';

const CreateStore = () => {
  return new Vuex.Store({
    state: {
      notification: {
        color: 'error',
        active: false,
        message: ''
      }
    },
    mutations: {
      SET_NOTIFICATION(state, payload) {
        state.notification.active = !state.notification.active
        state.notification.message = payload.message
        state.notification.color = payload.type
      },
    },
    actions: {
      nuxtServerInit(vuexCtx, { req }) {
      },
      setEvents(vuexCtx, events) {
        vuexCtx.commit('SET_EVENT', events);
      },
      notify(vuexCtx, payload) {
        vuexCtx.commit('SET_NOTIFICATION', payload)
      }
    },
    getters: {
    }
  })
}

export default CreateStore;