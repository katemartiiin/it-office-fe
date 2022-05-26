export default ({ app, redirect }) => {
  if (app.$auth.loggedIn) {
    return redirect('/dashboard')
  } else {
    // return redirect('/')
  }
}
