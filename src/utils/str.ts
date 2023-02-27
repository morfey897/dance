export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export function dot(str: string) {
  return str.replace(/\.+/, ".");
}