export default function loadInfo() {
  return new Promise((resolve) => {

    setTimeout(() => {
      resolve({
        message: 'This is einfo',
        time: Date.now()
      });
    }, 2000);
  });
}
