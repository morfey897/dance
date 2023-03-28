export const toDate = (d: Date | string | number) => {
  if (!(d instanceof Date)) {
    d = new Date(d);
  }
  return d.toISOString().split('T')[0];
}