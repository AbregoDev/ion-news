import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.news',
  appName: 'news-app',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  }
};

export default config;
