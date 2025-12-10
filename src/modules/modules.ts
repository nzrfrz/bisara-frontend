export const normalizeStringPath = (path: string): string => {
  // Remove leading and trailing slashes
  let formattedPath = path.replace(/^\/|\/$/g, '');

  // Replace slashes with spaces
  formattedPath = formattedPath.replace(/\//g, ' ');

  // Replace hyphens with spaces
  formattedPath = formattedPath.replace(/-/g, ' ');

  // Return the formatted path
  return formattedPath.replace(/:[^/]+/, "");
};

export type DeepReplaceUndefinedWithString<T> =
  // if T is exactly undefined -> string
  T extends undefined ? string :
  // keep functions as-is
  T extends (...args: any[]) => any ? T :
  // arrays -> map element type recursively
  T extends Array<infer U> ? Array<DeepReplaceUndefinedWithString<U>> :
  // objects -> map each property recursively
  T extends object ? { [K in keyof T]: DeepReplaceUndefinedWithString<T[K]> } :
  // primitives (string/number/boolean/null/...) stay same
  T;

export function hasUndefinedOrEmptyArray(obj: unknown): boolean {
  if (Array.isArray(obj)) {
    if (obj.length === 0) return true; // 🚨 empty array detected
    return obj.some(item => hasUndefinedOrEmptyArray(item));
  }

  if (typeof obj === 'object' && obj !== null) {
    return Object.values(obj).some(value => hasUndefinedOrEmptyArray(value));
  }

  return obj === undefined;
};

export function findInvalidPaths(obj: unknown, currentPath = ''): string[] {
  if (Array.isArray(obj)) {
    if (obj.length === 0) return [currentPath || 'root (empty array)'];
    return obj.flatMap((item, index) =>
      findInvalidPaths(item, `${currentPath}[${index}]`)
    );
  }

  if (typeof obj === 'object' && obj !== null) {
    return Object.entries(obj).flatMap(([key, value]) =>
      findInvalidPaths(value, currentPath ? `${currentPath}.${key}` : key)
    );
  }

  return obj === undefined ? [currentPath || 'root (undefined)'] : [];
};

export function replaceUndefinedWithEmptyString<T>(value: T): DeepReplaceUndefinedWithString<T> {
  // root undefined -> ""
  if (value === undefined) return "" as any;

  // primitives & functions & null -> return as-is
  if (value === null) return value as any;
  const valType = typeof value;
  if (valType !== 'object') return value as any;

  // arrays -> map recursively
  if (Array.isArray(value)) {
    return (value.map(item => replaceUndefinedWithEmptyString(item)) as unknown) as DeepReplaceUndefinedWithString<T>;
  }

  // preserve non-plain objects (Date, RegExp, Map, Set, etc.)
  if (value instanceof Date || value instanceof RegExp || value instanceof Map || value instanceof Set) {
    return value as any;
  }

  // plain object -> recurse each own property
  const out: any = {};
  for (const key of Object.keys(value as any)) {
    const v = (value as any)[key];
    out[key] = replaceUndefinedWithEmptyString(v);
  }
  return out as DeepReplaceUndefinedWithString<T>;
};

export function formatPhoneNumberSimple(
  countryCode: string,
  phoneNumber: string
): string {
  // Remove non-digit chars from phoneNumber
  const digits = phoneNumber?.replace(/\D/g, "");

  const first3 = digits?.slice(0, 3);
  const second3 = digits?.slice(3, 6);
  const rest = digits?.slice(6);

  let formatted = countryCode;
  if (first3) formatted += ` ${first3}`;
  if (second3) formatted += `-${second3}`;
  if (rest) formatted += `-${rest}`;

  return formatted;
}

export function toOrdinal(n: number) {
  const s = ["th", "st", "nd", "rd"];
  const v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}

export function toTitleCase(str: string): string {
  if (typeof str !== 'string') {
    throw new Error('Input must be a string');
  }
  return str
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};