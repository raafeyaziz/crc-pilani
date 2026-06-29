export function formatINR(amount){
    return new Intl.NumberFormat('en-IN',{
      style: 'currency',
      currency: 'INR'
    }).format(amount);
  };

export function formatTransactionDate (isoString){
    if (!isoString) return "";
    
    const dateObj = new Date(isoString);

    // 1. Get Date parts: "23", "June", "2026"
    const day = dateObj.getDate();
    const month = dateObj.toLocaleString('default', { month: 'long' });
    const year = dateObj.getFullYear();

    // 2. Get Time parts: "5:00 PM" -> convert to "5:00pm"
    const timeStr = dateObj.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
    
    // Clean up the time string (make lowercase and remove the space)
    const formattedTime = timeStr.toLowerCase().replace(' ', '');

    // 3. Combine them with your pipe character
    return `${day} ${month} ${year} | ${formattedTime}`;
  };