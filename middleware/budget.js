export default ({ app, redirect }) => {
  if (app.$auth.loggedIn) {
    if (app.$auth.$state.user['role'] == 4 || app.$auth.$state.user['role'] == 1) {
    } else if (app.$auth.$storage.getCookie('role') == 4 || app.$auth.$storage.getCookie('role') == 1) {
    } else {
      return redirect('/dashboard')
    }
  } else {
    console.log('D')
    return redirect('/')
  }
}
