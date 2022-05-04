export function createMessage(severity: 'success' | 'warning' | 'error', message: string, show = true, duration=3000) {
  return {
    severity: severity,
    message: message,
    show: show,
    duration: duration,
  }
};
