import React from 'react';
import type { Session } from '../../interfaces/session';
import SessionCard from './SessionCard';

interface SessionListProps {
    sessions: Session[];
    onEdit: (session: Session) => void;
    onDelete: (session: Session) => void;
}

const SessionList: React.FC<SessionListProps> = ({ sessions, onEdit, onDelete }) => {
    return (
        <div>
            {sessions.map(session => (
                <SessionCard key={session.id} session={session} onEdit={onEdit} onDelete={onDelete} />
            ))}
        </div>
    );
};

export default SessionList;
