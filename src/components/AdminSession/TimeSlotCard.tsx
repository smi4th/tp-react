import React from 'react';
import type { TimeSlot } from '../../interfaces/session';

interface TimeSlotCardProps {
    timeSlot: TimeSlot;
}

const TimeSlotCard: React.FC<TimeSlotCardProps> = ({ timeSlot }) => {
    return (
        <div className={`p-2 border rounded ${timeSlot.isBooked ? 'bg-red-200' : 'bg-green-200'}`}>
            <p>Jour: {timeSlot.dayOfWeek}</p>
            <p>Début: {timeSlot.startTime}</p>
            <p>Fin: {timeSlot.endTime}</p>
            <p>Réservé: {timeSlot.isBooked ? 'Oui' : 'Non'}</p>
            {timeSlot.isBooked && (
                <>
                    <p>Email: {timeSlot.customerEmail}</p>
                    <p>Participants: {timeSlot.participants}</p>
                </>
            )}
        </div>
    );
};

export default TimeSlotCard;
