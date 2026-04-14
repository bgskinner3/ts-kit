const __brand: unique symbol = Symbol('brand');

export type Branded<T, B> = T & { [__brand]: B };

type TBufferLikeObject = Branded<
  {
    type: 'Buffer';
    data: number[];
  },
  'TBufferLikeObject'
>;

type TAbsoluteURL = Branded<URL, 'TAbsoluteURL'>;
type TInternalUrl = Branded<string, 'TInternalUrl'>;
type THexByteString = Branded<string, 'THexByteString'>;
type TJSONArrayString = Branded<string, 'TJSONArrayString'>;
type TJSONObjectString = Branded<string, 'TJSONObjectString'>;

export type {
  TBufferLikeObject,
  TAbsoluteURL,
  THexByteString,
  TJSONObjectString,
  TJSONArrayString,
  TInternalUrl,
};
