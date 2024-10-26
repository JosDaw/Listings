import { database } from "@/app/config/firebase"
import useUser from "@/app/store/useUser"
import { showToast } from "@/app/utils/common"
import { router } from "expo-router"
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"
import { doc, DocumentData, getDoc } from "firebase/firestore"
import { useState } from "react"
import { StyleSheet, Text, View } from "react-native"
import RoundedButton from "../common/rounded-button"
import RoundedInput from "../common/rounded-input"

interface ILogin {
  email: string
  password: string
}

export default function Login() {
  const [loginData, setLoginData] = useState<ILogin>({
    email: "",
    password: "",
  })

  const [isSaving, setIsSaving] = useState<boolean>(false);

  const { loginUser } = useUser();

  /**
   * Handles the login process
   */
  const handleLogin = async () => {
    console.log("Logging in with data:", loginData)
    if (!loginData.email || !loginData.password) {
      showToast('Please fill in all fields.', 'error');
      return;
    }

    setIsSaving(true);

    const auth = getAuth();

    // Register with Firebase auth
    await signInWithEmailAndPassword(auth, loginData.email, loginData.password)
      .then(async (userCredential: { user: { uid: string } }) => {

        const userDoc = await getDoc(doc(database, 'user', userCredential.user.uid));
        console.log("🚀 ~ .then ~ userDoc:", userDoc)

        if (!userDoc.exists()) {
          showToast("User document does not exist.", "error")
          return null
        }

        // Retrieve document data safely
        const userData = userDoc.data() as DocumentData | null

        if (userData) {
          // Check for specific fields
          if (userData.isDeleted) {
            showToast("Your account has been deleted. Please register again to log in.", "error")
            return null
          }

          // Perform other checks or actions based on the document's fields
          console.log("User document data:", userData)

          loginUser({
            email: userData.email,
            expoPushToken: userData.expoPushToken,
            allowPushNotifications: userData.allowPushNotifications,
            isRealtor: userData.isRealtor,
            userID: userCredential.user.uid,
            name: userData.name,
          })

          setIsSaving(false);
          showToast("Login successful.", "success")
          router.push("/home")
        } else {
          showToast("Failed to retrieve user data.", "error")
          return null
        }

      })
      .catch((error: any) => {
        showToast('An error occurred. Please try again. Error: ' + JSON.stringify(error), 'error');
        setIsSaving(false);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign In</Text>
      <RoundedInput
        placeholder="Email"
        secureTextEntry={false}
        value={loginData.email}
        onChangeText={(text) => {
          setLoginData({ ...loginData, email: text })
        }}
      />
      <RoundedInput
        placeholder="Password"
        secureTextEntry={true}
        value={loginData.password}
        onChangeText={(text) => {
          setLoginData({ ...loginData, password: text })
        }}
      />
      <RoundedButton
        title="Sign In"
        color="yellow"
        onPress={handleLogin}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    width: "90%",
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 24,
    fontFamily: "Exo2_400Regular",
    color: '#15392F'
  },
})
