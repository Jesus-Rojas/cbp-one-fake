export const sleep = (timer = 500) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(true);
    }, timer);
  })
}