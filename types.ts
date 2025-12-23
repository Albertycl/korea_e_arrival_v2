
export interface ArrivalCardData {
  familyName: string;
  givenName: string;
  gender: 'M' | 'F' | '';
  birthYear: string;
  birthMonth: string;
  birthDay: string;
  nationality: string;
  passportNumber: string;
  passportExpiryYear?: string;
  passportExpiryMonth?: string;
  passportExpiryDay?: string;
  homeAddress: string;
  koreaAddress: string;
  koreaAddressKr?: string; // Korean Address for display
  detailAddress: string; // New field for room number or hotel name details
  koreaPhone: string;
  email: string; // New field for Step 2
  purpose: string;
  flightNumber: string;
  entryDate?: string;
  departureDate?: string;
  departureFlightNumber?: string;
}

export enum PurposeOfVisit {
  TOUR = 'Tour',
  BUSINESS = 'Business',
  VISIT = 'Visit',
  EMPLOYMENT = 'Employment',
  OTHER = 'Other'
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}