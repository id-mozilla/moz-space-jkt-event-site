export default function({ route, $auth, redirect, store }) {
  const adminPathRegex = /admin/g
  if (adminPathRegex.test(route.path)) {
    if (!store.state.auth.loggedIn) {
      redirect('/login')
    }
  }
}