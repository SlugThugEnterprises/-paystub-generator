import fs from 'fs';
import path from 'path';

// Define the path to the employees directory
const employeesDir = path.resolve(process.cwd(), 'employees');

/**
 * Get all employee files
 * @returns {Array} List of employee file names
 */
export function getEmployeeFiles() {
  try {
    return fs.readdirSync(employeesDir).filter(file => file.endsWith('.json'));
  } catch (error) {
    console.error('Error reading employees directory:', error);
    return [];
  }
}

/**
 * Get employee data by filename (without extension)
 * @param {string} filename - Employee filename without .json extension
 * @returns {Object|null} Employee data or null if not found
 */
export function getEmployeeData(filename) {
  try {
    const filePath = path.join(employeesDir, `${filename}.json`);
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error reading employee data for ${filename}:`, error);
    return null;
  }
}

/**
 * Get all employee data
 * @returns {Array} List of all employee data objects
 */
export function getAllEmployeeData() {
  const files = getEmployeeFiles();
  return files.map(file => {
    const filename = file.replace('.json', '');
    return {
      id: filename,
      ...getEmployeeData(filename)
    };
  }).filter(data => data !== null);
}

/**
 * Get paths for all employee pay stubs
 * @returns {Array} List of paths for static generation
 */
export function getPayStubPaths() {
  const files = getEmployeeFiles();
  return files.map(file => {
    const filename = file.replace('.json', '');
    return `/paystubs/${filename}`;
  });
}