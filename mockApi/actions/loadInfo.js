export default function loadInfo() {
  return new Promise((resolve) => {

    // simulate async load
    setTimeout(() => {
      resolve({
        message: 'This came from the api server',
        time: Date.now()
      });
    }, 1000);
  });
}
