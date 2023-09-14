import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'ch.devsohneg.petrackerlite',
  appName: 'petrack_lite',
  webDir: 'www',
  server: {
    androidScheme: 'https',
  },
  plugins: {
    GoogleAuth: {
      scopes: ['profile', 'email'],
      serverClientId: 'ADD HERE GOOGLE CLIENT ID',
      forceCodeForRefreshToken: true,
    },
  },
};

export default config;
