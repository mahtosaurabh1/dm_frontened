import dayjs from "dayjs";


import 'dayjs/locale/en'; // Import the locale you want to use

export const dateFormater = (date: any) => {
  return dayjs(date).locale('en').format('D MMM YYYY');
};


export const validateEmail=(email: string): boolean=> {
    // Regular expression to validate the email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  