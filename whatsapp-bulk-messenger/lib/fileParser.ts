import { validatePhoneNumber, formatPhoneNumber } from './utils';

export const parseCSV = (content: string): string[] => {
  const numbers: string[] = [];
  const lines = content.split('\n');
  
  lines.forEach(line => {
    const cells = line.split(',').map(cell => cell.trim().replace(/"/g, ''));
    cells.forEach(cell => {
      if (validatePhoneNumber(cell)) {
        numbers.push(formatPhoneNumber(cell));
      }
    });
  });
  
  return [...new Set(numbers)]; // Remove duplicates
};

export const parseTXT = (content: string): string[] => {
  const numbers = content
    .split('\n')
    .map(line => line.trim())
    .filter(line => line !== '')
    .filter(validatePhoneNumber)
    .map(formatPhoneNumber);
  
  return [...new Set(numbers)];
};

export const parseExcel = async (file: File): Promise<string[]> => {
  // For Excel parsing, we'll handle this in the API route
  // This is a placeholder - actual implementation would use a library like xlsx
  return [];
};