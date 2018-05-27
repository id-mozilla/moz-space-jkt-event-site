export default function({ store, route, redirect }) {
  // redirect when it's logedin
  const pageNames = ['index', 'login']

  pageNames.forEach(page => {
    if (store.getters.isLogedIn && page === route.name) {
      redirect('/dashboard') 
    }
  })
}