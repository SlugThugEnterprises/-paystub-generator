export const PayStub = ({ employeeData }) => {
  const { company, employee, pay_period } = employeeData;
  
  // Calculate totals
  const grossPay = pay_period.earnings.reduce((sum, earning) => sum + earning.current, 0);
  const totalDeductions = pay_period.deductions.reduce((sum, deduction) => sum + deduction.current, 0);
  const netPay = grossPay - totalDeductions;
  
  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };
  
  // Format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      {/* Company Header */}
      <div className="bg-blue-900 text-white p-6">
        <h1 className="text-2xl font-bold">{company.name}</h1>
        <p>{company.address}</p>
        {company.address2 && <p>{company.address2}</p>}
        <p>{company.city}, {company.state} {company.zip}</p>
        <p>EIN: {company.ein}</p>
      </div>
      
      {/* Employee Info */}
      <div className="p-6 border-b">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h2 className="text-xl font-semibold mb-2">Employee Information</h2>
            <p><span className="font-medium">Name:</span> {employee.first_name} {employee.last_name}</p>
            <p><span className="font-medium">ID:</span> {employee.employee_id}</p>
            <p><span className="font-medium">SSN:</span> ***-**-{employee.ssn_last4 || '****'}</p>
            <p><span className="font-medium">Department:</span> {employee.department}</p>
            <p><span className="font-medium">Position:</span> {employee.position}</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-2">Pay Period</h2>
            <p><span className="font-medium">Period:</span> {formatDate(pay_period.start_date)} - {formatDate(pay_period.end_date)}</p>
            <p><span className="font-medium">Pay Date:</span> {formatDate(pay_period.pay_date)}</p>
            <p><span className="font-medium">Frequency:</span> {pay_period.frequency}</p>
          </div>
        </div>
      </div>
      
      {/* Earnings */}
      <div className="p-6 border-b">
        <h2 className="text-xl font-semibold mb-4">Earnings</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2">Description</th>
                <th className="text-right py-2">Hours</th>
                <th className="text-right py-2">Rate</th>
                <th className="text-right py-2">Current</th>
                <th className="text-right py-2">YTD</th>
              </tr>
            </thead>
            <tbody>
              {pay_period.earnings.map((earning, index) => (
                <tr key={index} className="border-b">
                  <td className="py-2">{earning.description}</td>
                  <td className="text-right py-2">{earning.hours}</td>
                  <td className="text-right py-2">{formatCurrency(earning.rate)}</td>
                  <td className="text-right py-2">{formatCurrency(earning.current)}</td>
                  <td className="text-right py-2">{earning.ytd ? formatCurrency(earning.ytd) : ''}</td>
                </tr>
              ))}
              <tr className="font-semibold">
                <td className="py-2">Gross Pay</td>
                <td className="text-right py-2"></td>
                <td className="text-right py-2"></td>
                <td className="text-right py-2">{formatCurrency(grossPay)}</td>
                <td className="text-right py-2"></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Deductions */}
      <div className="p-6 border-b">
        <h2 className="text-xl font-semibold mb-4">Deductions</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2">Description</th>
                <th className="text-right py-2">Current</th>
                <th className="text-right py-2">YTD</th>
              </tr>
            </thead>
            <tbody>
              {pay_period.deductions.map((deduction, index) => (
                <tr key={index} className="border-b">
                  <td className="py-2">{deduction.description}</td>
                  <td className="text-right py-2">{formatCurrency(deduction.current)}</td>
                  <td className="text-right py-2">{deduction.ytd ? formatCurrency(deduction.ytd) : ''}</td>
                </tr>
              ))}
              <tr className="font-semibold">
                <td className="py-2">Total Deductions</td>
                <td className="text-right py-2">{formatCurrency(totalDeductions)}</td>
                <td className="text-right py-2"></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Net Pay */}
      <div className="p-6 bg-gray-100">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Net Pay</h2>
          <p className="text-2xl font-bold text-green-700">{formatCurrency(netPay)}</p>
        </div>
      </div>
    </div>
  );
};