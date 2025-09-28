import React from 'react';
import { Calendar, Clock, MapPin, User } from 'lucide-react';
import { Reservation, Room } from '../types';

interface ReservationHistoryProps {
  reservations: Reservation[];
  rooms: Room[];
}

export const ReservationHistory: React.FC<ReservationHistoryProps> = ({
  reservations,
  rooms,
}) => {
  const getRoomName = (roomId: string) => {
    return rooms.find(room => room.id === roomId)?.name || 'Sala desconocida';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'upcoming':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-gray-100 text-gray-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active':
        return 'Activa';
      case 'upcoming':
        return 'Próxima';
      case 'completed':
        return 'Completada';
      case 'cancelled':
        return 'Cancelada';
      default:
        return status;
    }
  };

  const sortedReservations = [...reservations].sort(
    (a, b) => b.startTime.getTime() - a.startTime.getTime()
  );

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
        <Calendar size={20} className="mr-2 text-blue-600" />
        Historial de Reservas
      </h2>

      <div className="space-y-4 max-h-96 overflow-y-auto">
        {sortedReservations.length === 0 ? (
          <p className="text-gray-500 text-center py-8">
            No hay reservas registradas
          </p>
        ) : (
          sortedReservations.map((reservation) => (
            <div
              key={reservation.id}
              className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center">
                  <MapPin size={16} className="mr-2 text-gray-500" />
                  <h3 className="font-semibold text-gray-800">
                    {getRoomName(reservation.roomId)}
                  </h3>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(reservation.status)}`}>
                  {getStatusText(reservation.status)}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                <div className="flex items-center">
                  <User size={14} className="mr-1" />
                  <span>{reservation.userName}</span>
                </div>
                <div className="flex items-center">
                  <Calendar size={14} className="mr-1" />
                  <span>{reservation.startTime.toLocaleDateString('es-ES')}</span>
                </div>
                <div className="flex items-center">
                  <Clock size={14} className="mr-1" />
                  <span>
                    {reservation.startTime.toLocaleTimeString('es-ES', {
                      hour: '2-digit',
                      minute: '2-digit'
                    })} - {reservation.endTime.toLocaleTimeString('es-ES', {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </span>
                </div>
                <div className="text-xs text-gray-500">
                  Creada: {reservation.createdAt.toLocaleDateString('es-ES')}
                </div>
              </div>

              <div className="mt-2">
                <p className="text-sm text-gray-700">
                  <strong>Propósito:</strong> {reservation.purpose}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};