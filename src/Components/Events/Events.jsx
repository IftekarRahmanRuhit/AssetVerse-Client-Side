import React from 'react';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Users 
} from 'lucide-react';

const staticEvents = [
  {
    id: 1,
    title: 'Annual Team Building',
    date: 'Feb 15, 2025',
    time: '10:00 AM',
    location: 'Riverside Resort',
    participants: '120+ Employees'
  },
  {
    id: 2,
    title: 'Company Innovation Summit',
    date: 'Feb 22, 2025',
    time: '9:30 AM',
    location: 'Main Conference Hall',
    participants: '80+ Departments'
  },
  {
    id: 3,
    title: 'Quarterly Performance Review',
    date: 'Feb 26, 2025',
    time: '2:00 PM',
    location: 'Corporate Headquarters',
    participants: 'Management Team'
  }
];

const EventCard = ({ event }) => (
  <div className="group bg-gray-900/80 backdrop-blur-xl border border-gray-700 hover:border-purple-600/50 rounded-2xl p-6 hover:shadow-2xl hover:shadow-purple-900/20 transition-all duration-500 hover:-translate-y-2 space-y-4 cursor-pointer">
    <div className="flex items-center justify-between">
      <h3 className="text-lg font-semibold text-white group-hover:text-purple-300 transition-colors duration-300">{event.title}</h3>
    </div>
    
    <div className="space-y-3">
      <div className="flex items-center text-gray-400 space-x-3 group-hover:text-gray-300 transition-colors duration-300">
        <div className="p-2 bg-gradient-to-br from-blue-900/20 to-blue-800/20 rounded-lg group-hover:scale-110 transition-transform duration-300">
          <Calendar className="w-5 h-5 text-blue-400" />
        </div>
        <span className="text-sm">{event.date}</span>
      </div>
      
      <div className="flex items-center text-gray-400 space-x-3 group-hover:text-gray-300 transition-colors duration-300">
        <div className="p-2 bg-gradient-to-br from-green-900/20 to-green-800/20 rounded-lg group-hover:scale-110 transition-transform duration-300">
          <Clock className="w-5 h-5 text-green-400" />
        </div>
        <span className="text-sm">{event.time}</span>
      </div>
      
      <div className="flex items-center text-gray-400 space-x-3 group-hover:text-gray-300 transition-colors duration-300">
        <div className="p-2 bg-gradient-to-br from-red-900/20 to-red-800/20 rounded-lg group-hover:scale-110 transition-transform duration-300">
          <MapPin className="w-5 h-5 text-red-400" />
        </div>
        <span className="text-sm">{event.location}</span>
      </div>
      
      <div className="flex items-center text-gray-400 space-x-3 group-hover:text-gray-300 transition-colors duration-300">
        <div className="p-2 bg-gradient-to-br from-purple-900/20 to-purple-800/20 rounded-lg group-hover:scale-110 transition-transform duration-300">
          <Users className="w-5 h-5 text-purple-400" />
        </div>
        <span className="text-sm">{event.participants}</span>
      </div>
    </div>
  </div>
);

const Events = () => {
  return (
    <div className="p-6 pb-16 relative">
      {/* Dark background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-80 h-80 bg-purple-900/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-900/20 rounded-full blur-3xl"></div>
      </div>
      
      <div className="relative z-10">
        <div className="flex justify-between items-center mt-10 mb-8">
          <div className="text-center mx-auto">
            <div className="inline-block p-2 bg-gradient-to-r from-purple-900/30 to-blue-900/30 rounded-full mb-6">
              <h2 className="text-2xl md:text-3xl font-bold text-[#9538E2]">Upcoming Events</h2>
            </div>
          </div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6 w-11/12 mx-auto cursor-pointer">
          {staticEvents.map(event => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Events;