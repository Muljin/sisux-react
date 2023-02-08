import {
  AuthenticationResult,
  BrowserAuthOptions,
  BrowserCacheLocation,
  CacheOptions,
  EventMessage,
  EventType,
  LogLevel,
  PublicClientApplication,
} from '@azure/msal-browser';
import { MsalProvider } from '@azure/msal-react';
import { useEffect, useState } from 'react';
import { getServerConfiguration } from './internal-service';
import { SisuxProviderProps } from './types';

function loggerCallback(logLevel: LogLevel, message: string) {
  console.log(message);
}

export function SisuxProvider({
  configuration,
  overrides = {},
  children,
}: SisuxProviderProps) {
  const [serverConfig, setServerConfig] = useState<any | null>(null);

  useEffect(() => {
    getServerConfiguration().then(setServerConfig);
  }, []);

  const auth: BrowserAuthOptions = {
    clientId: configuration.clientId,
    authority: `https://login.microsoftonline.com/${configuration.sisuxTenantId}`,
    redirectUri: serverConfig?.redirectUri,
    ...overrides?.auth,
  };
  const cache: CacheOptions = {
    cacheLocation: BrowserCacheLocation.LocalStorage,
    ...overrides?.cache,
  };
  const msalInstance = new PublicClientApplication({
    auth,
    cache,
    system: {
      loggerOptions: {
        loggerCallback,
        logLevel: LogLevel.Verbose,
        piiLoggingEnabled: false,
      },
    },
  });

  // Account selection logic is app dependent. Adjust as needed for different use cases.
  const accounts = msalInstance.getAllAccounts();
  if (accounts.length > 0) {
    msalInstance.setActiveAccount(accounts[0]);
  }

  msalInstance.addEventCallback((event: EventMessage) => {
    if (event.eventType === EventType.LOGIN_SUCCESS && event.payload) {
      const payload = event.payload as AuthenticationResult;
      const account = payload.account;
      msalInstance.setActiveAccount(account);
    }
  });

  return <MsalProvider instance={msalInstance}>{children}</MsalProvider>;
}
