export const AppConfig = {
  apiUrl: 'http://localhost:8000/api', // Local API URL
  authUrl: 'http://localhost:8000',
  
  //apiUrl: 'https://backend.evenupez.com/api', // Local API URL
  //authUrl: 'https://backend.evenupez.com',
  
  liveApiUrl: 'https://your-live-api-domain.com/api', // Live API URL
  liveauthUrl: 'http://localhost:8000/',
};

// Export the current API URL based on environment
export const CurrentApiUrl = AppConfig.apiUrl;
export const CurrentAuthUrl = AppConfig.authUrl;