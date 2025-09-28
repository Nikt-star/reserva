import React from 'react';
import { Room } from '../types';
import { RoomCard } from './RoomCard';
import { BarChart3, Users, Clock, CheckCircle } from 'lucide-react';

interface DashboardProps {
  rooms: Room[];
  onReserveRoom: (roomId: string) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ rooms, onReserveRoom }) => {
  const availableRooms = rooms.filter(room => room.status === 'available').length;
  const occupiedRooms = rooms.filter(room => room.status === 'occupied').length;
  const reservedRooms = rooms.filter(room => room.status === 'reserved').length;
  const totalCapacity = rooms.reduce((sum, room) => sum + room.capacity, 0);

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-lg">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Disponibles</p>
              <p className="text-2xl font-bold text-gray-900">{availableRooms}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center">
            <div className="p-3 bg-red-100 rounded-lg">
              <Clock className="h-6 w-6 text-red-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Ocupadas</p>
              <p className="text-2xl font-bold text-gray-900">{occupiedRooms}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center">
            <div className="p-3 bg-yellow-100 rounded-lg">
              <BarChart3 className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Reservadas</p>
              <p className="text-2xl font-bold text-gray-900">{reservedRooms}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Capacidad Total</p>
              <p className="text-2xl font-bold text-gray-900">{totalCapacity}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Rooms Grid */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Salas Disponibles</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rooms.map((room) => (
            <RoomCard
              key={room.id}
              room={room}
              onReserve={onReserveRoom}
            />
          ))}
        </div>
      </div>
    </div>
  );
};