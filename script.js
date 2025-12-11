// Simple loan calculation logic
document.getElementById('calculateBtn').addEventListener('click', function () {
  const amount = parseFloat(document.getElementById('amount').value);
  const annualRate = parseFloat(document.getElementById('interest').value);
  const years = parseFloat(document.getElementById('years').value);

  const monthlyEl = document.getElementById('monthly');
  const totalEl = document.getElementById('total');
  const totalInterestEl = document.getElementById('totalInterest');

  // basic validation
  if (!isFinite(amount) || !isFinite(annualRate) || !isFinite(years) || amount <= 0 || years <= 0) {
    alert('Please enter valid positive numbers for amount and years.');
    return;
  }

  const monthlyRate = (annualRate / 100) / 12;
  const n = years * 12;

  // If interest is zero, simple division
  let monthlyPayment;
  if (monthlyRate === 0) {
    monthlyPayment = amount / n;
  } else {
    const x = Math.pow(1 + monthlyRate, n);
    monthlyPayment = (amount * monthlyRate * x) / (x - 1);
  }

  const totalPayment = monthlyPayment * n;
  const totalInterest = totalPayment - amount;

  // Format to currency
  function formatUSD(num) {
    return num.toLocaleString(undefined, { style: 'currency', currency: 'USD', maximumFractionDigits: 2 });
  }

  monthlyEl.textContent = formatUSD(monthlyPayment);
  totalEl.textContent = formatUSD(totalPayment);
  totalInterestEl.textContent = formatUSD(totalInterest);
});
