import React from 'react';
import type { Session } from '../../interfaces/session';
import TimeSlotCard from './TimeSlotCard';

interface SessionCardProps {
    session: Session;
    onEdit: (session: Session) => void;
    onDelete: (session: Session) => void;
}

const SessionCard: React.FC<SessionCardProps> = ({ session, onEdit, onDelete }) => {



    return (
        <div className="border p-4 rounded-lg mb-4 shadow-lg">
            <div className="p-4">
                <div className="flex justify-between items-center mb-2">
                    <h2 className="text-xl font-bold">{session.name}</h2>
                    <div>
                        <button onClick={() => onEdit(session)} className="btn btn-secondary mr-2">Modifier</button>
                        <button onClick={() => onDelete(session)} className="btn btn-error">Supprimer</button>
                    </div>
                </div>

                {session.pictures && session.pictures.length > 0 && (
                    <div className="flex items-center space-x-2 my-4">
                        {session.pictures.map((pic, index) => (
                            <div key={index} className="avatar">
                                <div className="w-24 rounded-xl">
                                    <img src={pic} alt={`${session.name} ${index + 1}`} />
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                <p className="text-gray-600 mb-4">{session.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                    {session.tags.map(tag => (
                        <span key={tag} className="badge badge-primary">{tag}</span>
                    ))}
                </div>
                <div className="grid grid-cols-2 gap-4 mb-4">
                    <p><span className="font-bold">Durée:</span> {session.duration} minutes</p>
                    <p><span className="font-bold">Prix:</span> ${session.price}</p>
                    <p><span className="font-bold">Participants:</span> {session.minParticipants} - {session.maxParticipants}</p>
                    <div className="flex items-center">
                        <span className="font-bold mr-2">Difficulté:</span>
                        <div className="rating rating-sm">
                            {[...Array(5)].map((_, i) => (
                                <input key={i} type="radio" name={`rating-${session.id}`} className="mask mask-star-2 bg-orange-400" disabled checked={i + 1 === session.difficulty} />
                            ))}
                        </div>
                    </div>
                </div>
                <div className="mt-4">
                    <h3 className="font-bold">Créneaux horaires:</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 mt-2">
                        {(session.timeSlots || []).map(ts => (
                            <TimeSlotCard key={ts.id} timeSlot={ts} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SessionCard;
