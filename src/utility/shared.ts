const letters = '0123456789ABCDEF';

/* eslint-disable @typescript-eslint/no-explicit-any */
export const isUndefined = (obj: any): obj is undefined => typeof obj === 'undefined';

export const isObject = (fn: any): fn is object => !(isNil(fn) && typeof fn === 'object');

export const isPlainObject = (fn: any): fn is object => {
    if (!isObject(fn)) {
        return false;
    }
    const proto = Object.getPrototypeOf(fn);
    if (proto === null) {
        return true;
    }
    const ctor = Object.prototype.hasOwnProperty.call(proto, 'constructor') && proto.constructor;
    return (
        typeof ctor === 'function' &&
        ctor instanceof ctor &&
        Function.prototype.toString.call(ctor) === Function.prototype.toString.call(Object)
    );
};

export const addLeadingSlash = (path?: string): string =>
    path && typeof path === 'string' ? (path.charAt(0) !== '/' ? '/' + path : path) : '';

export const normalizePath = (path?: string): string =>
    path
        ? path.startsWith('/')
            ? ('/' + path.replace(/\/+$/, '')).replace(/\/+/g, '/')
            : '/' + path.replace(/\/+$/, '')
        : '/';

export const stripEndSlash = (path: string): string =>
    path[path.length - 1] === '/' ? path.slice(0, path.length - 1) : path;

// eslint-disable-next-line @typescript-eslint/ban-types
export const isFunction = (val: any): val is Function => typeof val === 'function';

export const isString = (val: any): val is string => typeof val === 'string';

export const isNumber = (val: any): val is number => typeof val === 'number';

export const isConstructor = (val: any): boolean => val === 'constructor';

export const isNil = (val: any): val is null | undefined => isUndefined(val) || val === null;

export const isEmpty = (array: any[]): boolean => !(array && array.length > 0);

export const isSymbol = (val: any): val is symbol => typeof val === 'symbol';

export const isBoolean = (val: any): val is boolean => typeof val === 'boolean';

export const generateRandomColor = () => {
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
};

export const getInitials = (phrase: string) => {
    return phrase
        .split(' ')
        .map((word) => word[0])
        .join('')
        .toUpperCase();
};

export const capitalizeWords = (phrase: string) => {
    return phrase.replace(/\b\w/g, (char) => char.toUpperCase());
};
export function genereateRandomString(length: number) {
    const dict = [
        0,
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        'a',
        'b',
        'c',
        'd',
        'e',
        'f',
        'g',
        'h',
        'i',
        'j',
        'k',
        'l',
        'm',
        'n',
        'o',
        'p',
        'q',
        'r',
        's',
        't',
        'u',
        'v',
        'w',
        'x',
        'y',
        'z',
        'A',
        'B',
        'C',
        'D',
        'E',
        'F',
        'G',
        'H',
        'I',
        'J',
        'K',
        'L',
        'M',
        'N',
        'O',
        'P',
        'Q',
        'R',
        'S',
        'T',
        'U',
        'V',
        'W',
        'X',
        'Y',
        'Z',
    ];
    const dictLength = dict.length;
    let id;
    let randomPartIdx;
    let j;
    if (length === null || typeof length === 'undefined' || length < 1) {
        throw new Error('Invalid Length Provided');
    }
    id = '';
    for (j = 0; j < length; j += 1) {
        randomPartIdx = parseInt((Math.random() * dictLength).toFixed(0), 10) % dictLength;
        id += dict[randomPartIdx];
    }

    return id;
}

export function createUniqueName(prefix: string, length?: number) {
    return prefix + '-' + genereateRandomString(length || 10);
}
