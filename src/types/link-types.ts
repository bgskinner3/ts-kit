type TGenericUrlObject = {
  pathname?: string | null;
  query?: Record<
    string,
    string | number | boolean | string[] | undefined
  > | null;
  hash?: string | null;
  [key: string]: unknown;
};

export type { TGenericUrlObject };
