/**  @see {@link CompositeTypeGuardsDocs.isClientSide} */

export const isClientSide = (): boolean => typeof window !== 'undefined';

export const isLocalhost = (hostname: string): boolean =>
  hostname.includes('localhost') || hostname.includes('127.0.0.1');

export const isDevelopment = () => {
  return process.env.NODE_ENV === 'development';
};

export const isProduction = () => {
  return process.env.NODE_ENV === 'production';
};
