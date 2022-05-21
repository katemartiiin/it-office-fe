// role 1 admin
export default ({ app, redirect }) => {
  if (app.$auth.loggedIn) {
    if (app.$auth.$state.user['role'] == 2 || app.$auth.$state.user['role'] == 1) {
    } else if (app.$auth.$storage.getCookie('role') == 2 || app.$auth.$storage.getCookie('role') == 1) {
    } else {
      return redirect('/dashboard')
    }
  } else {
    return redirect('/')
  }
}
