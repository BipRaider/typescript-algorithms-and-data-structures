//https://nodejs.org/api/url.html
import url, { URL } from 'url';

console.dir('--------------URL------------------------------');

const pathname = '/a/b/c';
const search = '?d=e';
const hash = '#fgh';
const myURL = new URL(`https://example.org${pathname}${search}${hash}`);

console.log('URL', myURL);
