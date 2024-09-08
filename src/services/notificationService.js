import { getMessaging, getToken } from "firebase/messaging"
import { messaging } from "../firebaseConfig"
import { getAccessToken, updateUser } from "../Helpers"

export const requestForToken = async () => {
  try {
    const fcmToken = await getToken(messaging, { vapidKey: "BJFNcl-f7y_Rai-3MkrNQdU-r57Jt5uumh-VvUycd8ueu_c_c2grx1ne32ym5GaJHIcnZyUSaVBd_btCW2AHxLc"})    
    return fcmToken
  }catch(err) {
    return err
  }
}

export const requestPermission = async () => {
  try {
      console.log("Requesting permission...")
      const permission = await Notification.requestPermission()
      if (permission === "granted" && getAccessToken()) {
          const fcmToken = await requestForToken()
          
          const update = await updateUser({ fcmToken: fcmToken})

          console.log(update)
      } else {
        console.log("Error")
      }
    }catch(err) {
      console.error("Error getting token", err)
    }
  
  
}
