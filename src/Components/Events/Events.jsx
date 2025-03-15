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
  <div className="bg-[#1B1D21]  border border-[#9538e277] rounded-lg p-4 hover:shadow-md transition-shadow duration-300 space-y-3">
    <div className="flex items-center justify-between">
      <h3 className="text-lg font-semibold text-gray-300">{event.title}</h3>
    </div>
    
    <div className="space-y-2">
      <div className="flex items-center text-gray-400 space-x-2">
        <Calendar className="w-5 h-5 text-blue-500" />
        <span className="text-sm">{event.date}</span>
      </div>
      
      <div className="flex items-center text-gray-400 space-x-2">
        <Clock className="w-5 h-5 text-green-500" />
        <span className="text-sm">{event.time}</span>
      </div>
      
      <div className="flex items-center text-gray-400 space-x-2">
        <MapPin className="w-5 h-5 text-red-500" />
        <span className="text-sm">{event.location}</span>
      </div>
      
      <div className="flex items-center text-gray-400 space-x-2">
        <Users className="w-5 h-5 text-purple-500" />
        <span className="text-sm">{event.participants}</span>
      </div>
    </div>
  </div>
);

const Events = () => {
  return (
    <div className="bg-[#212428]  p-6 pb-16">
      <div className="flex justify-between items-center mt-10 mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-[#9538E2] text-center mx-auto">Upcoming Events</h2>
      </div>
      
      <div className="grid md:grid-cols-3 gap-4 w-11/12 mx-auto cursor-pointer">
        {staticEvents.map(event => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
};

export default Events;