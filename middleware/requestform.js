// admin 1
// mayor office 3
// budget 4
// treasury 5
// accounting 6
// manager 7

// except dswd and mo.
export default ({ app, redirect }) => {
  if (app.$auth.loggedIn) {
    if (
      app.$auth.$state.user['role'] == 1 ||
      app.$auth.$state.user['role'] == 2 ||
      app.$auth.$state.user['role'] == 3 ||
      app.$auth.$state.user['role'] == 7
    ) {

    } else {
      return redirect('/dashboard')
    }
  } else {
    return redirect('/')
  }
}
