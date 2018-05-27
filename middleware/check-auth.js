export default function({ store, req }) {
  store.dispatch('initAuth', req);
}