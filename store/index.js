import Vuex from 'vuex';
import authUtil from "~/utils/authUtil";

const CreateStore = () => {
  return new Vuex.Store({
    state: {
      token: null,
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
      SET_TOKEN(state, token) {
        state.token = token;
      },
      CLEAR_TOKEN(state) {
        state.token = null;
      }
    },
    actions: {
      nuxtServerInit(vuexCtx, { req }) {
        vuexCtx.dispatch("initAuth", req);
      },
      initAuth(vuexCtx, req) {
        let token;

        if (req) {
          if (!req.headers.cookie) {
            return;
          }

          const jwtCookie = req.headers.cookie
            .split(";")
            .find(c => c.trim().startsWith("jwt="));

          if (!jwtCookie) {
            return;
          }

          token = jwtCookie.split("=")[1];
        } else {
          token = localStorage.getItem("token");
        }

        vuexCtx.commit('SET_TOKEN', token);
      },
      login(vuexContext, authData) {
        return new Promise(resolve => {
          this.$axios
            .$post("/users/custom-login", authData)
            .then(result => {
              if (result.success) {
                vuexContext.commit("SET_TOKEN", result.token);
                authUtil.setToken(result.token);
                resolve(true)
              } else {
                vuexContext.dispatch('notify', { type: 'error', message: result.message})
                resolve(false)
              }
            })
            .catch(err => {
              vuexContext.dispatch('notify', { type: 'error', message: result.message})
              resolve(false)
            });

        })
      },
      logout(vuexContext) {
        vuexContext.commit("CLEAR_TOKEN");
        if (process.client) {
          authUtil.unsetToken();
        }
},
      setEvents(vuexCtx, events) {
        vuexCtx.commit('SET_EVENT', events);
      },
      notify(vuexCtx, payload) {
        vuexCtx.commit('SET_NOTIFICATION', payload)
      }
    },
    getters: {
      isLogedIn(state) {
        return state.token !== null ? true : false;
      },
    }
  })
}

export default CreateStore;