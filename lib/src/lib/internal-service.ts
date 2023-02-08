export async function getServerConfiguration() {
  return Promise.resolve({
    scopes: ['api://jeeblyops/all'],
    redirectUri: 'http://localhost:5173',
    apiUrl: 'https://jeeblyopsapi-dev.azurewebsites.net',
  });
}
