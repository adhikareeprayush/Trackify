/**
 * Utility function to format a date into a readable string.
 * @param {Date} date - The date to format.
 * @returns {string} - Formatted date string like "1st Jun 2024".
 */
export const getFormattedDate = (date: Date): string => {
    if (!(date instanceof Date)) {
      throw new Error("Invalid date object provided.");
    }
  
    const ordinalSuffix = (day: number): string => {
      if (day > 3 && day < 21) return "th"; // Handles 11th to 19th
      switch (day % 10) {
        case 1: return "st";
        case 2: return "nd";
        case 3: return "rd";
        default: return "th";
      }
    };
  
    const day = date.getDate();
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();
  
    return `${day}${ordinalSuffix(day)} ${month} ${year}`;
  };
  