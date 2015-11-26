export default function loadInfo() {
  return new Promise((resolve, reject) => {

    // simulate async load
    setTimeout(() => {
      resolve({
        message: 'This came from the api server',
        time: Date.now()
      });
      //reject(new Error('error from api loadInfo!'));

    }, 1000);
  });
}
