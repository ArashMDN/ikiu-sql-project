export const p2e = (s) => s.replace(/[۰-۹]/g, (d) => "۰۱۲۳۴۵۶۷۸۹".indexOf(d));
export const e2p = (input) => {
  if (input === undefined || input === null) {
    return;
  }

  return Number(input).toLocaleString();
};

export function getIranianLast10Digits(phoneNumber) {
  // Define a regex to check if the phone number contains Persian digits
  const persianDigitRegex = /[\u06F0-\u06F9]/;

  // Function to convert Persian digits to English digits
  function convertPersianToEnglish(input) {
    const persianToEnglishMap = {
      "۰": "0",
      "۱": "1",
      "۲": "2",
      "۳": "3",
      "۴": "4",
      "۵": "5",
      "۶": "6",
      "۷": "7",
      "۸": "8",
      "۹": "9",
    };
    return input.replace(/[\u06F0-\u06F9]/g, (m) => persianToEnglishMap[m]);
  }

  // Check if the phone number contains Persian digits and convert if necessary
  if (persianDigitRegex.test(phoneNumber)) {
    phoneNumber = convertPersianToEnglish(phoneNumber);
  }

  const regex = /^(?:\+98|0|۰۹۸|۰)([1-9]\d{8,9})$/;
  const match = regex.exec(phoneNumber);

  if (match) {
    let last10Digits = match[1];
    // Handle "+" at the end for LTR display
    if (phoneNumber.endsWith("+") && phoneNumber.length > 12) {
      // Check length to avoid "+" in area code
      last10Digits = "+" + last10Digits;
    }
    return last10Digits;
  } else {
    return null;
  }
}
