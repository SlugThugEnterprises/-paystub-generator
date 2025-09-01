import { getAllEmployeeData } from './src/utils/paystubData.js';

// Test the function
const employees = getAllEmployeeData();
console.log('Employees found:', employees.length);
console.log('First employee:', employees[0]?.employee?.first_name, employees[0]?.employee?.last_name);