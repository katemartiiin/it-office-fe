export default ({ app, redirect }) => {
  if (app.$auth.loggedIn) {
    if (app.$auth.$state.user['role'] == 6) {
    } else if (app.$auth.$storage.getCookie('role') == 6) {
    } else {
      return redirect('/dashboard')
    }
  } else {
    return redirect('/')
  }
}
