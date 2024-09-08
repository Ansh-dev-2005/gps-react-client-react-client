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
  let match = localStorage.getItem('refreshToken')
  if (match !== null) {
    return match
  }
  return false
}
export const getAccessToken = () => {
  let match = document.cookie.match(new RegExp("(^| )accessToken=([^;]+)"));
  console.log(match)
  if (match) {
    return match[2]; // Return only the value of the cookie
  }
  return false;
};

export const getRefreshToken = () => {
    let match = document.cookie.match(new RegExp("(^| )refreshToken=([^;]+)"));
    console.log(match)
    if (match !== null) {
        return match[2]
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
    // set the token in local storage

      

    return json


}
export const updateUser = async (user) => {
    let res = await fetch(`${URL}/user/update`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${getAccessToken()}`,
      },
      credentials: "include",
      method: "PUT",
      body: JSON.stringify({update: user}),
    });
    let json = await res.json()
    return json
}


export const signUp = async (body) => {
    let res = await fetch(`${URL}/auth/signup`,  {
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


export const getaccesstoken = async () => {
    let res = await fetch(`${URL}/auth/access-token`,  {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getRefreshToken()}`
        },

        credentials: 'include',
        method: "POST",
        body: JSON.stringify({refreshToken: getRefreshToken()})
    })
    let json = await res.json()
    document.cookie = `accessToken=${json.accessToken}`

    return json
    
}


export const getAllSightings = async () => {
    let res = await fetch(`${URL}/sight/all`,  {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getAccessToken()}`
        },

        credentials: 'include',
        method: "GET",
    })
    let json = await res.json()
    
    return json
}

export const uploadImage = async (body) => {
  console.log("body", body);

  let res = await fetch(`${URL}/upload/image`, {
    headers: {
      // 'Content-Type': 'multipart/form-data', // REMOVE THIS LINE
      Authorization: `Bearer ${getAccessToken()}`, // Keep this for authorization
    },
    credentials: "include",
    method: "POST",
    body: body, // Ensure 'body' is an instance of FormData
  });

  let json = await res.json();

  return json;
};


export const createSighting = async (body) => {
    let res = await fetch(`${URL}/sight/new`,  {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getAccessToken()}`
        },
        credentials: 'include',
        method: "POST",
        body: JSON.stringify(body)
    })
    let json = await res.json()

    return json
}


export const getSight = async (id) => {
    let res = await fetch(`${URL}/sight/id/${id}`,  {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getAccessToken()}`
        },
        credentials: 'include',
        method: "GET",
    })
    let json = await res.json()
    return json
}

