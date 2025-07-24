import React from 'react';
import type { TimeSlot } from '@interfaces/session.ts';

interface TimeSlotCardProps {
    timeSlot: TimeSlot;
}

const TimeSlotCard: React.FC<TimeSlotCardProps> = ({ timeSlot }) => {
    return (
        <div className={`p-2 shadow-lg bg-white rounded`}>
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
