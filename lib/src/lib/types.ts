import { Configuration } from '@azure/msal-browser';
import { PropsWithChildren } from 'react';

export type SisuxProviderProps = PropsWithChildren<{
  configuration: BasicConfiguration;
  overrides?: Overrides;
}>;

export type BasicConfiguration = {
  clientId: string;
  sisuxTenantId: string;
};

type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

export type Overrides = DeepPartial<Configuration>;
