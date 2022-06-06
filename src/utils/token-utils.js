const tokenUtils = {
  setToken: (token) => {
    localStorage.setItem('token', token)
  },
  getToken: () => {
    return localStorage.getItem('token')
  }
}

export default tokenUtils