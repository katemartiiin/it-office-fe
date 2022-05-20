export default ({ app, redirect }) => {
  if (app.$auth.loggedIn) {
    if (app.$auth.$state.user['role'] == 2) {
    } else if (app.$auth.$storage.getCookie('role') == 2) {
    } else {
      return redirect('/dashboard')
    }
  } else {
    return redirect('/')
  }
}
