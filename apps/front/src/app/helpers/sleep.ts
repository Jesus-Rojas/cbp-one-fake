export const sleep = (timer = 3000) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(true);
    }, timer);
  })
}