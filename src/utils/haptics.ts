export const hapticFeedback = {
  light: () => {
    if ('vibrate' in navigator) {
      navigator.vibrate(10)
    }
  },
  medium: () => {
    if ('vibrate' in navigator) {
      navigator.vibrate(20)
    }
  },
  heavy: () => {
    if ('vibrate' in navigator) {
      navigator.vibrate([30, 10, 30])
    }
  },
  success: () => {
    if ('vibrate' in navigator) {
      navigator.vibrate([10, 10, 10])
    }
  },
  error: () => {
    if ('vibrate' in navigator) {
      navigator.vibrate([50, 30, 50])
    }
  },
}
