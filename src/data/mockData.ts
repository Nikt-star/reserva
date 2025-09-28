import { Room, Reservation } from '../types';

export const rooms: Room[] = [
  {
    id: '1',
    name: 'Sala de Estudio A',
    capacity: 4,
    type: 'study',
    features: ['Proyector', 'Pizarra', 'WiFi'],
    status: 'available'
  },
  {
    id: '2',
    name: 'Sala de Estudio B',
    capacity: 6,
    type: 'study',
    features: ['Pizarra', 'WiFi', 'Enchufes'],
    status: 'occupied',
    currentReservation: {
      id: 'res1',
      roomId: '2',
      userName: 'María González',
      userEmail: 'maria@universidad.edu',
      startTime: new Date(Date.now() - 30 * 60 * 1000),
      endTime: new Date(Date.now() + 30 * 60 * 1000),
      purpose: 'Estudio grupal',
      status: 'active',
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000)
    }
  },
  {
    id: '3',
    name: 'Sala de Reuniones C',
    capacity: 8,
    type: 'meeting',
    features: ['Proyector', 'TV', 'WiFi', 'Videoconferencia'],
    status: 'reserved',
    currentReservation: {
      id: 'res2',
      roomId: '3',
      userName: 'Carlos Rodríguez',
      userEmail: 'carlos@universidad.edu',
      startTime: new Date(Date.now() + 60 * 60 * 1000),
      endTime: new Date(Date.now() + 120 * 60 * 1000),
      purpose: 'Reunión de proyecto',
      status: 'upcoming',
      createdAt: new Date(Date.now() - 60 * 60 * 1000)
    }
  },
  {
    id: '4',
    name: 'Sala de Conferencias D',
    capacity: 20,
    type: 'conference',
    features: ['Proyector', 'Sistema de Audio', 'WiFi', 'Aire Acondicionado'],
    status: 'available'
  },
  {
    id: '5',
    name: 'Sala de Estudio E',
    capacity: 2,
    type: 'study',
    features: ['Pizarra', 'WiFi', 'Silenciosa'],
    status: 'available'
  },
  {
    id: '6',
    name: 'Sala de Estudio F',
    capacity: 10,
    type: 'study',
    features: ['Proyector', 'Pizarra', 'WiFi', 'Mesas Modulares'],
    status: 'available'
  }
];

export const mockReservations: Reservation[] = [
  {
    id: 'res3',
    roomId: '1',
    userName: 'Ana Martínez',
    userEmail: 'ana@universidad.edu',
    startTime: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    endTime: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000 + 2 * 60 * 60 * 1000),
    purpose: 'Estudio individual',
    status: 'completed',
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)
  },
  {
    id: 'res4',
    roomId: '4',
    userName: 'Luis García',
    userEmail: 'luis@universidad.edu',
    startTime: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
    endTime: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000 + 3 * 60 * 60 * 1000),
    purpose: 'Presentación de tesis',
    status: 'upcoming',
    createdAt: new Date()
  }
];