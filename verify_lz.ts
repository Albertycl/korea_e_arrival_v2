import LZString from 'lz-string';

const testData = [
    'LJ764',
    '2024-01-02',
    'LJ763',
    '2024-01-06',
    'Hotel The One',
    '제주특별자치도 제주시 연동 사장3길 33',
    '33, Sajang 3-gil, Jeju-si, Jeju-do',
    '82-64-798-0001'
].join('|');

console.log('Original Data:', testData);

// Test Compression
const compressed = LZString.compressToEncodedURIComponent(testData);
console.log('Compressed:', compressed);

// Test Decompression
const decompressed = LZString.decompressFromEncodedURIComponent(compressed);
console.log('Decompressed:', decompressed);

if (testData === decompressed) {
    console.log('SUCCESS: Data matches!');
} else {
    console.error('FAILURE: Data mismatch!');
}

// Compare lengths
const originalEncoded = btoa(encodeURIComponent(testData));
console.log('Original Base64 Length:', originalEncoded.length);
console.log('Compressed Length:', compressed.length);
console.log('Reduction:', Math.round((1 - compressed.length / originalEncoded.length) * 100) + '%');
