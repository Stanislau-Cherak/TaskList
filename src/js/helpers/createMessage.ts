export function createMessage(severity: 'success' | 'warning' | 'error', message: string, show = true) {
  return {
    severity: severity,
    message: message,
    show: show,
  }
};
