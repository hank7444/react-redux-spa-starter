module.exports = {
  development: {
    port: 3000,
    mockApiPort: 3030,
    useMockApi: true,
    debug: true
  },
  production: {
    port: 8080,
    mockApiPort: 3030,
    useMockApi: false,
    debug: false
  }
}[process.env.NODE_ENV || 'development'];
