
export interface CountryData {
  currency: string;
  language: string;
}

export const COUNTRY_MAP: Record<string, CountryData> = {
  "Afghanistan": { currency: "AFN", language: "Pashto/Dari" },
  "Albania": { currency: "ALL", language: "Albanian" },
  "Algeria": { currency: "DZD", language: "Arabic" },
  "Australia": { currency: "AUD", language: "English" },
  "Austria": { currency: "EUR", language: "German" },
  "Bangladesh": { currency: "BDT", language: "Bengali" },
  "Belgium": { currency: "EUR", language: "Dutch/French" },
  "Brazil": { currency: "BRL", language: "Portuguese" },
  "Canada": { currency: "CAD", language: "English/French" },
  "China": { currency: "CNY", language: "Chinese" },
  "Egypt": { currency: "EGP", language: "Arabic" },
  "France": { currency: "EUR", language: "French" },
  "Germany": { currency: "EUR", language: "German" },
  "India": { currency: "INR", language: "Hindi/English" },
  "Indonesia": { currency: "IDR", language: "Indonesian" },
  "Iran": { currency: "IRR", language: "Persian" },
  "Iraq": { currency: "IQD", language: "Arabic/Kurdish" },
  "Italy": { currency: "EUR", language: "Italian" },
  "Japan": { currency: "JPY", language: "Japanese" },
  "Jordan": { currency: "JOD", language: "Arabic" },
  "Kuwait": { currency: "KWD", language: "Arabic" },
  "Malaysia": { currency: "MYR", language: "Malay" },
  "Mexico": { currency: "MXN", language: "Spanish" },
  "Netherlands": { currency: "EUR", language: "Dutch" },
  "Norway": { currency: "NOK", language: "Norwegian" },
  "Oman": { currency: "OMR", language: "Arabic" },
  "Pakistan": { currency: "PKR", language: "Urdu/English" },
  "Palestine": { currency: "ILS/JOD", language: "Arabic" },
  "Qatar": { currency: "QAR", language: "Arabic" },
  "Russia": { currency: "RUB", language: "Russian" },
  "Saudi Arabia": { currency: "SAR", language: "Arabic" },
  "Singapore": { currency: "SGD", language: "English/Malay" },
  "South Africa": { currency: "ZAR", language: "English/Afrikaans" },
  "Spain": { currency: "EUR", language: "Spanish" },
  "Sri Lanka": { currency: "LKR", language: "Sinhala/Tamil" },
  "Switzerland": { currency: "CHF", language: "German/French/Italian" },
  "Thailand": { currency: "THB", language: "Thai" },
  "Turkey": { currency: "TRY", language: "Turkish" },
  "United Arab Emirates": { currency: "AED", language: "Arabic/English" },
  "United Kingdom": { currency: "GBP", language: "English" },
  "United States": { currency: "USD", language: "English" },
  "Vietnam": { currency: "VND", language: "Vietnamese" }
};

export const COUNTRIES = [
  "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan",
  "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi",
  "Cabo Verde", "Cambodia", "Cameroon", "Canada", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo", "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czech Republic",
  "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", "Ethiopia",
  "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana",
  "Haiti", "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Ivory Coast",
  "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg",
  "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar",
  "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Korea", "North Macedonia", "Norway",
  "Oman", "Pakistan", "Palau", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal",
  "Qatar", "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Korea", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", "Syria",
  "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu",
  "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Uzbekistan",
  "Vanuatu", "Vatican City", "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"
];
