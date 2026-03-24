export default function ConvertIntoRupees(number) {
  const amount = parseFloat(number).toLocaleString('en-IN', {
    style: 'currency',
    currency: 'INR',
    //  minimumFractionDigits: 0,
    // maximumFractionDigits: 0,
  });

  return amount;
}
