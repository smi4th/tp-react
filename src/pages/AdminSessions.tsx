import { useEffect, useState, useRef } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SessionList from '../components/AdminSession/SessionList';
import type { Session } from '../interfaces/session';
import SessionForm from '../components/AdminSession/SessionForm';

export default function AdminSessions() {
    const [sessions, setSessions] = useState<Session[]>([]);
    const [sessionToEdit, setSessionToEdit] = useState<Session | null>(null);
    const apiUrl = "http://localhost:3000";
    const modalRef = useRef<HTMLDialogElement>(null);

    const fetchSessions = async () => {
        try {
            const response = await fetch(apiUrl + "/sessions");
            if (!response.ok) {
                throw new Error('Failed to fetch sessions');
            }
            const data = await response.json();
            setSessions(data);
        } catch (error: any) {
            toast.error(error.message);
        }
    };

    useEffect(() => {
        fetchSessions();
    }, []);

    const handleSessionUpdated = (updatedSession: Session) => {
        setSessions(sessions.map(s => s.id === updatedSession.id ? updatedSession : s));
        if (modalRef.current) {
            modalRef.current.close();
        }
        setSessionToEdit(null);
    };

    const handleSessionAdded = (newSession: Session) => {
        setSessions([...sessions, newSession]);
        if (modalRef.current) {
            modalRef.current.close();
        }
    };

    const handleEditSession = (session: Session) => {
        setSessionToEdit(session);
        modalRef.current?.showModal();
    }

    const handleDeleteSession = (session: Session) => {
        if (window.confirm(`Voulez-vous vraiment supprimer la session "${session.name}" ?`)) {
            fetch(`${apiUrl}/sessions/${session.id}`, {
                method: 'DELETE',
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Erreur lors de la suppression de la session');
                    }
                    setSessions(sessions.filter(s => s.id !== session.id));
                    toast.success('Session supprimée avec succès');
                })
                .catch(error => {
                    toast.error(error.message);
                });
        }
    }

    const handleAddSessionClick = () => {
        setSessionToEdit(null);
        modalRef.current?.showModal();
    }

    const handleCloseModal = () => {
        setSessionToEdit(null);
    }

    return (
        <div className="container mx-auto p-4">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Admin - Sessions</h1>
                <button className="btn btn-primary" onClick={handleAddSessionClick}>Ajouter une session</button>
            </div>

            <dialog ref={modalRef} className="modal" onClose={handleCloseModal}>
                <div className="modal-box max-h-4/5 min-w-3/5">
                    <button onClick={() => modalRef.current?.close()} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    <SessionForm 
                        onSessionAdded={handleSessionAdded} 
                        onSessionUpdated={handleSessionUpdated} 
                        sessionToEdit={sessionToEdit} 
                    />
                </div>
            </dialog>

            <SessionList sessions={sessions} onEdit={handleEditSession} onDelete={(handleDeleteSession)} />
            <ToastContainer position="bottom-right" autoClose={3000} />
        </div>
    );
}
