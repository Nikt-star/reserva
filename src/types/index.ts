export interface Room {
  id: string;
  name: string;
  capacity: number;
  type: 'study' | 'meeting' | 'conference';
  features: string[];
  status: 'available' | 'occupied' | 'reserved';
  currentReservation?: Reservation;
}

export interface Reservation {
  id: string;
  roomId: string;
  userName: string;
  userEmail: string;
  startTime: Date;
  endTime: Date;
  purpose: string;
  status: 'active' | 'upcoming' | 'completed' | 'cancelled';
  createdAt: Date;
}

export interface Notification {
  id: string;
  type: 'reminder' | 'confirmation' | 'cancellation' | 'change';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
}

export interface User {
  name: string;
  email: string;
}