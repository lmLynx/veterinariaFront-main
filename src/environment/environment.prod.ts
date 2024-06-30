
export const environment = {
    production: false,
    apiUrl: getApiUrl(),
  };
  
  function getApiUrl() {
    const protocol = window.location.protocol;
    const host = window.location.hostname;
    return `${protocol}//${host}:8080`;
  }
  