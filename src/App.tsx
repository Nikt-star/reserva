import React, { useState, useEffect } from 'react';
import { Dashboard } from './components/Dashboard';
import { ReservationModal } from './components/ReservationModal';
import { NotificationPanel } from './components/NotificationPanel';
import { ReservationHistory } from './components/ReservationHistory';
import { rooms as initialRooms, mockReservations } from './data/mockData';
import { Room, Reservation, Notification } from './types';
import { Calendar, Bell, History, Home } from 'lucide-react';

function App() {
  const [rooms, setRooms] = useState<Room[]>(initialRooms);
  const [reservations, setReservations] = useState<Reservation[]>(mockReservations);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'notifications' | 'history'>('dashboard');

  // Simulate real-time updates
  useEffect(() => {
    const timer = setInterval(() => {
      setRooms(prevRooms => {
        return prevRooms.map(room => {
          if (room.currentReservation) {
            const now = new Date();
            const endTime = room.currentReservation.endTime;
            const startTime = room.currentReservation.startTime;
            
            // Check if reservation has ended
            if (now >= endTime && room.status === 'occupied') {
              return { ...room, status: 'available' as const, currentReservation: undefined };
            }
            
            // Check if reservation should start
            if (now >= startTime && now < endTime && room.status === 'reserved') {
              return { ...room, status: 'occupied' as const };
            }
          }
          return room;
        });
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleReserveRoom = (roomId: string) => {
    const room = rooms.find(r => r.id === roomId);
    if (room && room.status === 'available') {
      setSelectedRoom(room);
      setIsModalOpen(true);
    }
  };

  const handleConfirmReservation = (reservationData: {
    roomId: string;
    userName: string;
    userEmail: string;
    date: string;
    startTime: string;
    endTime: string;
    purpose: string;
  }) => {
    const startDateTime = new Date(`${reservationData.date}T${reservationData.startTime}`);
    const endDateTime = new Date(`${reservationData.date}T${reservationData.endTime}`);
    const now = new Date();

    const newReservation: Reservation = {
      id: `res-${Date.now()}`,
      roomId: reservationData.roomId,
      userName: reservationData.userName,
      userEmail: reservationData.userEmail,
      startTime: startDateTime,
      endTime: endDateTime,
      purpose: reservationData.purpose,
      status: startDateTime <= now ? 'active' : 'upcoming',
      createdAt: now,
    };

    // Update reservations
    setReservations(prev => [...prev, newReservation]);

    // Update room status
    setRooms(prev => prev.map(room => {
      if (room.id === reservationData.roomId) {
        return {
          ...room,
          status: startDateTime <= now ? 'occupied' : 'reserved',
          currentReservation: newReservation
        };
      }
      return room;
    }));

    // Add confirmation notification
    const notification: Notification = {
      id: `notif-${Date.now()}`,
      type: 'confirmation',
      title: 'Reserva Confirmada',
      message: `Tu reserva para ${selectedRoom?.name} ha sido confirmada para el ${startDateTime.toLocaleDateString('es-ES')} a las ${startDateTime.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}.`,
      timestamp: now,
      read: false,
    };

    setNotifications(prev => [notification, ...prev]);

    setIsModalOpen(false);
    setSelectedRoom(null);
  };

  const handleMarkAsRead = (notificationId: string) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === notificationId ? { ...notif, read: true } : notif
      )
    );
  };

  const handleDismissNotification = (notificationId: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== notificationId));
  };

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'notifications', label: 'Notificaciones', icon: Bell },
    { id: 'history', label: 'Historial', icon: History },
  ] as const;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Calendar className="h-8 w-8 text-blue-600 mr-3" />
              <h1 className="text-2xl font-bold text-gray-900">
                Sistema de Reserva de Salas
              </h1>
            </div>
            <div className="text-sm text-gray-500">
              {new Date().toLocaleDateString('es-ES', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-3 py-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <tab.icon size={16} className="mr-2" />
                {tab.label}
                {tab.id === 'notifications' && notifications.filter(n => !n.read).length > 0 && (
                  <span className="ml-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                    {notifications.filter(n => !n.read).length}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'dashboard' && (
          <Dashboard rooms={rooms} onReserveRoom={handleReserveRoom} />
        )}
        
        {activeTab === 'notifications' && (
          <NotificationPanel
            notifications={notifications}
            onMarkAsRead={handleMarkAsRead}
            onDismiss={handleDismissNotification}
          />
        )}
        
        {activeTab === 'history' && (
          <ReservationHistory reservations={reservations} rooms={rooms} />
        )}
      </main>

      {/* Reservation Modal */}
      <ReservationModal
        room={selectedRoom}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmReservation}
      />
    </div>
  );
}

export default App;