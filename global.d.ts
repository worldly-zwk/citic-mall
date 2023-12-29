type RecordAny<T = any> = Record<string, T>;

type LiteralUnion<T extends string> = T | (string & {});
