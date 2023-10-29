const development = {
    api: 'http://localhost:3001'
  }
  
  const config =
    process.env.REACT_APP_STAGE === 'development'
      ? development
      : ''
  
  export default {
    ...config
  }