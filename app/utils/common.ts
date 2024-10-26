import Toast from 'react-native-root-toast'
import { ToastType } from '../types'

// TODO: fix why showToast is not working
export const showToast = (message: string, type: ToastType = "success"): void => {
  const backgroundColor = type === "success" ? "#4CAF50" : "#F44336"

  Toast.show(message, {
    duration: Toast.durations.SHORT,
    position: Toast.positions.BOTTOM,
    backgroundColor,
    shadow: true,
    animation: true,
    hideOnPress: true,
    textColor: "#FFF",
    delay: 0,
  })
}
