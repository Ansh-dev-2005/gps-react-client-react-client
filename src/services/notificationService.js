import { getToken } from "firebase/messaging";
import { messaging } from "../firebaseConfig";
import { updateUser } from "../Helpers";

export const requestPermission = async () => {
  try {
    console.log("Requesting permission...");
        const permission = await Notification.requestPermission();

if (permission === "granted") {
      
    const token = await getToken(messaging, {
      vapidKey: "BJFNcl-f7y_Rai-3MkrNQdU-r57Jt5uumh-VvUycd8ueu_c_c2grx1ne32ym5GaJHIcnZyUSaVBd_btCW2AHxLc", // Replace with your public VAPID key
    });
    if (token) {
      console.log("FCM Token:", token);
      // Optionally, send the token to your server or save it
      const User = JSON.parse(localStorage.getItem("user"));

      // append the token to the user object


      const response = await updateUser({
        fcmToken: token,
      });
      if (response.success) {
        console.log("FCM token saved successfully.");
      }

    } else {
      console.log("No registration token available.");
    }
  } }catch (error) {
    console.error("Error getting token", error);
  }
  
};
