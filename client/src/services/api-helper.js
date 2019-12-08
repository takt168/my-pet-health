import axios from 'axios';

  const baseUrl = 'http://localhost:3000'
//const baseUrl = 'https://my-pet-health-api.herokuapp.com/'  

const api = axios.create({
  baseURL: baseUrl
})

export const loginUser = async (loginData) => {
  const resp = await api.post('/auth/login', loginData)
  localStorage.setItem('authToken', resp.data.token);
  api.defaults.headers.common.authorization = `Bearer ${resp.data.token}`
  return resp.data.user
}

export const registerUser = async (registerData) => {
  const resp = await api.post('/users/', { user: registerData })
  localStorage.setItem('authToken', resp.data.token);
  api.defaults.headers.common.authorization = `Bearer ${resp.data.token}`
  return resp.data.user
}

export const verifyUser = async () => {
  const token = localStorage.getItem('authToken');
  if (token) {
    api.defaults.headers.common.authorization = `Bearer ${token}`
    const resp = await api.get('/auth/verify');
    return resp.data
  }
  return false
}

export const createPet = async (data) => {
  const resp = await api.post('/pets', { pet: data })
  return resp.data
}

export const readAllPets = async () => {
  const resp = await api.get('/pets')
  return resp.data
}

export const updatePet = async (id, data) => {
  const resp = await api.put(`/pets/${id}`, { pet: data })
  return resp.data
}

export const destroyPet = async (id) => {
  const resp = await api.delete(`/pets/${id}`)
  return resp.data
}

export const createEvent = async (data) => {
  const resp = await api.post(`/events`, { event: data })
  // return resp.data
  return resp.data
}

export const readAllEvents = async () => {
  const resp = await api.get('/events')
  return resp.data
}

export const updateEvent = async (id, data) => {
  const resp = await api.put(`/events/${id}`, { event: data })
  return resp.data
}

export const destroyEvent = async (id) => {
  const resp = await api.delete(`/events/${id}`)
  return resp.data
}
