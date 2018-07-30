import Random from 'random-js';
const engine = Random.engines.mt19937().autoSeed();

export default {
  int: (min, max) => {
    return Random.integer(min, max)(engine);
  },
  float: (min, max) => {
    return Random.real(min, max)(engine);
  }
};
