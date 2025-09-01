import Link from 'next/link';
import { getAllEmployeeData } from '../utils/paystubData.js';

export default async function HomePage() {
  const employees = getAllEmployeeData();

  return (
    <div className="px-6 py-16 bg-gray-100 sm:px-12 sm:py-24">
      <div className="max-w-6xl mx-auto">
        <h1 className="mb-12 text-4xl font-bold text-center">Pay Stub Generator</h1>
        
        {employees.length === 0 ? (
          <div className="text-center">
            <p className="text-xl mb-8">No employee data found.</p>
            <p className="text-lg">Please ensure employee JSON files are in the correct directory.</p>
          </div>
        ) : (
          <div>
            <h2 className="text-2xl font-semibold mb-8 text-center">Select an Employee</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {employees.map((employee) => (
                <Link 
                  key={employee.id}
                  href={`/paystubs/${employee.id}`}
                  className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                >
                  <h3 className="text-xl font-semibold mb-2">
                    {employee.employee.first_name} {employee.employee.last_name}
                  </h3>
                  <p className="text-gray-600 mb-1">ID: {employee.employee.employee_id}</p>
                  <p className="text-gray-600 mb-1">{employee.employee.department}</p>
                  <p className="text-gray-600">{employee.employee.position}</p>
                  <div className="mt-4 text-blue-600 hover:text-blue-800">
                    View Pay Stub →
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
