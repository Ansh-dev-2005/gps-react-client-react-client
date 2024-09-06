import config from '../config.json'
const URL = config.URL

export const getUser = () => {
  
  let match = JSON.parse(localStorage.getItem('user'))
  if (match !== null) {
    return match
  }
  return false
 
}
export const getToken = () => {
  let match = localStorage.getItem('token')
  if (match !== null) {
    return match
  }
  return false
}

export const logout = async () => {
    if(localStorage.getItem('user') && localStorage.getItem('token')) {
        localStorage.removeItem('user')
        localStorage.removeItem('token')
        return true
    }else {
        return false
    }
}

export const signIn = async (body) => {
    let res = await fetch(`${URL}/auth/signin`,  {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        method: "POST",
        body: JSON.stringify(body)
    })
    let json = await res.json()

    return json


}
export const signOut = async () => {
    let res = await fetch(`${URL}/auth/logout`,  {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        method: "POST",
    })
    let json = await res.json()

    return json


}


export const getBuses = async () => {
    let res = await fetch(`${URL}/bus/bus`,  {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getToken()}`
        },
        credentials: 'include',
        method: "GET"
    })
    let json = await res.json()

    return json


}

export const getBusById = async (busId) => {
    let res = await fetch(`${URL}/bus/bus/${busId}`,  {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getToken()}`
        },
        credentials: 'include',
        method: "GET"
    })
    let json = await res.json()

    return json


}
