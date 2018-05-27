export default function({ route, redirect, store }) {
  const adminPathRegex = /admin/g
  if (adminPathRegex.test(route.path)) {
    if (!store.isLogedIn) {
      redirect('/login')
    }
  }
}