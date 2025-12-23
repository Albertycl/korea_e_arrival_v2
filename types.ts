
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
  koreaAddressKr?: string; 
  detailAddress: string; 
  koreaPhone: string;
  email: string; 
  purpose: string;
  flightNumber: string;
  entryDate?: string;
  departureDate?: string;
  departureFlightNumber?: string;
}

export interface AdminConfig {
  arrivalFlight: string;
  arrivalDate: string;
  departureFlight: string;
  departureDate: string;
  hotelName: string;
  hotelAddressKr: string;
  hotelAddressEn: string;
  hotelPhone: string;
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
