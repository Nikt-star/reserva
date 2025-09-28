import React from 'react';
import { Room } from '../types';
import { Clock, Users, Wifi, Monitor, Volume2, Zap } from 'lucide-react';
import { useTimeRemaining } from '../hooks/useTime';

interface RoomCardProps {
  room: Room;
  onReserve: (roomId: string) => void;
}

export const RoomCard: React.FC<RoomCardProps> = ({ room, onReserve }) => {
  const timeRemaining = room.currentReservation 
    ? useTimeRemaining(room.currentReservation.endTime)
    : null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'occupied':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'reserved':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'available':
        return 'Disponible';
      case 'occupied':
        return 'Ocupada';
      case 'reserved':
        return 'Reservada';
      default:
        return 'Desconocido';
    }
  };

  const getFeatureIcon = (feature: string) => {
    switch (feature.toLowerCase()) {
      case 'wifi':
        return <Wifi size={16} />;
      case 'proyector':
        return <Monitor size={16} />;
      case 'sistema de audio':
        return <Volume2 size={16} />;
      case 'enchufes':
        return <Zap size={16} />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-200">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-1">{room.name}</h3>
          <div className="flex items-center text-gray-600">
            <Users size={16} className="mr-1" />
            <span>{room.capacity} personas</span>
          </div>
        </div>
        <div className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(room.status)}`}>
          {getStatusText(room.status)}
        </div>
      </div>

      {room.currentReservation && (
        <div className="mb-4 p-3 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-700 font-medium mb-1">
            Reservado por: {room.currentReservation.userName}
          </p>
          <div className="flex items-center text-sm text-gray-600">
            <Clock size={14} className="mr-1" />
            <span>
              {room.currentReservation.startTime.toLocaleTimeString('es-ES', { 
                hour: '2-digit', 
                minute: '2-digit' 
              })} - {room.currentReservation.endTime.toLocaleTimeString('es-ES', { 
                hour: '2-digit', 
                minute: '2-digit' 
              })}
            </span>
          </div>
          {timeRemaining && !timeRemaining.expired && room.status === 'occupied' && (
            <p className="text-sm text-orange-600 font-medium mt-1">
              Termina en: {timeRemaining.minutes}m {timeRemaining.seconds}s
            </p>
          )}
          {timeRemaining && !timeRemaining.expired && room.status === 'reserved' && (
            <p className="text-sm text-blue-600 font-medium mt-1">
              Inicia en: {Math.abs(timeRemaining.minutes)}m {Math.abs(timeRemaining.seconds)}s
            </p>
          )}
        </div>
      )}

      <div className="mb-4">
        <h4 className="text-sm font-medium text-gray-700 mb-2">Características</h4>
        <div className="flex flex-wrap gap-2">
          {room.features.map((feature, index) => (
            <div key={index} className="flex items-center bg-blue-50 text-blue-700 px-2 py-1 rounded-md text-xs">
              {getFeatureIcon(feature)}
              <span className="ml-1">{feature}</span>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={() => onReserve(room.id)}
        disabled={room.status === 'occupied'}
        className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
          room.status === 'occupied'
            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
            : 'bg-blue-600 text-white hover:bg-blue-700'
        }`}
      >
        {room.status === 'occupied' ? 'No disponible' : 'Reservar'}
      </button>
    </div>
  );
};