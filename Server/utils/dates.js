exports.formatDate = (dateStr) => {
    // Create a Date object from the given date string
    const date = new Date(dateStr);
  
    // Define an array of month names
    const monthNames = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
  
    // Extract the month and year from the Date object
    const month = monthNames[date.getUTCMonth()];
    const year = date.getUTCFullYear();
  
    // Combine the month and year to create the desired format
    const formattedDate = `${month}, ${year}`;
  
    return formattedDate;
  }