export default function loadInfo() {
  return new Promise((resolve) => {
    resolve({
      message: 'This is einfo',
      time: Date.now()
    });
  });
}
