export default ({ app, redirect }) => {
  if (app.$auth.loggedIn) {
    if (
      app.$auth.$state.user['role'] == 1 ||
      app.$auth.$state.user['role'] == 7
    ) {
    } else {
      return redirect('/dashboard')
    }
  } else {
    return redirect('/')
  }
}
