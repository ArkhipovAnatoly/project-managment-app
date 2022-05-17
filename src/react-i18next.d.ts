import 'react-i18next';
import En from './translations/en.json';

declare module 'react-i18next' {
  interface CustomTypeOptions {
    defaultNS: 'header';
    resources: typeof En;
  }
}
