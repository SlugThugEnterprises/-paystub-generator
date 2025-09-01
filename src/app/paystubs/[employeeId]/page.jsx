import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getEmployeeData } from '../../../utils/paystubData.js';
import { PayStub } from '../../../components/PayStub.jsx';

export default async function PayStubPage({ params }) {
  const { employeeId } = params;
  const employeeData = getEmployeeData(employeeId);
  
  if (!employeeData) {
    return notFound();
  }
  
  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        <div className="mb-6 no-print">
          <Link href="/" className="text-blue-600 hover:text-blue-800 flex items-center">
            ← Back to Employee List
          </Link>
        </div>
        <div className="paystub-container">
          <PayStub employeeData={employeeData} />
        </div>
        <div className="mt-8 text-center no-print">
          <button 
            onClick={() => window.print()}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Print Pay Stub
          </button>
        </div>
      </div>
    </div>
  );
}