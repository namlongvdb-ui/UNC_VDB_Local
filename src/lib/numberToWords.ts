const ones = ['', 'một', 'hai', 'ba', 'bốn', 'năm', 'sáu', 'bảy', 'tám', 'chín'];
const tens = ['', 'mười', 'hai mươi', 'ba mươi', 'bốn mươi', 'năm mươi', 'sáu mươi', 'bảy mươi', 'tám mươi', 'chín mươi'];

function readGroup(n: number): string {
  const h = Math.floor(n / 100);
  const t = Math.floor((n % 100) / 10);
  const o = n % 10;
  let result = '';

  if (h > 0) {
    result += ones[h] + ' trăm';
    if (t === 0 && o > 0) result += ' lẻ';
  }

  if (t > 1) {
    result += ' ' + tens[t];
    if (o === 1) result += ' mốt';
    else if (o === 5) result += ' lăm';
    else if (o > 0) result += ' ' + ones[o];
  } else if (t === 1) {
    result += ' mười';
    if (o === 5) result += ' lăm';
    else if (o > 0) result += ' ' + ones[o];
  } else if (o > 0) {
    result += ' ' + ones[o];
  }

  return result.trim();
}

const units = ['', 'nghìn', 'triệu', 'tỷ', 'nghìn tỷ', 'triệu tỷ'];

export function numberToVietnameseWords(n: number | string): string {
  // Remove non-digit chars
  const str = String(n).replace(/[^0-9]/g, '');
  if (!str || str === '0') return '';

  const num = BigInt(str);
  if (num === 0n) return 'không đồng';

  // Split into groups of 3 from right
  const groups: number[] = [];
  let temp = str;
  while (temp.length > 0) {
    const start = Math.max(0, temp.length - 3);
    groups.unshift(parseInt(temp.slice(start), 10));
    temp = temp.slice(0, start);
  }

  const parts: string[] = [];
  for (let i = 0; i < groups.length; i++) {
    const unitIndex = groups.length - 1 - i;
    if (groups[i] === 0) continue;
    const groupText = readGroup(groups[i]);
    const unit = units[unitIndex] || '';
    parts.push(groupText + (unit ? ' ' + unit : ''));
  }

  const result = parts.join(' ');
  // Capitalize first letter
  return result.charAt(0).toUpperCase() + result.slice(1) + ' đồng';
}

export function formatNumber(value: string): string {
  const digits = value.replace(/[^0-9]/g, '');
  if (!digits) return '';
  return digits.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}
