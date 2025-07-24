import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import type { Session, TimeSlot } from '@interfaces/session.ts';
import { useAPI } from "@/hook/useAPI.ts";
import { useSession} from "@/hook/useSession.ts";

interface SessionFormProps {
    onSessionAdded: (session: Session) => void;
    onSessionUpdated: (session: Session) => void;
    sessionToEdit?: Session | null;
}

const DEFAULT_TIME_SLOT: Partial<TimeSlot> = { dayOfWeek: 'Lundi', startTime: '10:00' };

const SessionForm: React.FC<SessionFormProps> = ({ onSessionAdded, onSessionUpdated, sessionToEdit }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [tags, setTags] = useState<string[]>(['']);
    const [duration, setDuration] = useState(60);
    const [price, setPrice] = useState(25);
    const [minParticipants, setMinParticipants] = useState(2);
    const [maxParticipants, setMaxParticipants] = useState(10);
    const [difficulty, setDifficulty] = useState(3);
    const [pictures, setPictures] = useState<string[]>(['']);
    const [timeSlots, setTimeSlots] = useState<Partial<TimeSlot>[]>([DEFAULT_TIME_SLOT]);
    const [error, setError] = useState<string | null>(null);
    const { baseUrl } = useAPI();
    const { getToken } = useSession();

    useEffect(() => {
        if (sessionToEdit) {
            setName(sessionToEdit.name || '');
            setDescription(sessionToEdit.description || '');
            setTags(sessionToEdit.tags?.length ? sessionToEdit.tags : ['']);
            setDuration(sessionToEdit.duration ?? 60);
            setPrice(sessionToEdit.price ?? 25);
            setMinParticipants(sessionToEdit.minParticipants ?? 2);
            setMaxParticipants(sessionToEdit.maxParticipants ?? 10);
            setDifficulty(sessionToEdit.difficulty ?? 3);
            setPictures(sessionToEdit.pictures?.length ? sessionToEdit.pictures : ['']);
            setTimeSlots(sessionToEdit.timeSlots?.length ? sessionToEdit.timeSlots.map(ts => ({ ...ts })) : [DEFAULT_TIME_SLOT]);
        } else {
            setName('');
            setDescription('');
            setTags(['']);
            setDuration(60);
            setPrice(25);
            setMinParticipants(2);
            setMaxParticipants(10);
            setDifficulty(3);
            setPictures(['']);
            setTimeSlots([DEFAULT_TIME_SLOT]);
        }
    }, [sessionToEdit]);

    const handleArrayChange = <T,>(arr: T[], setter: (v: T[]) => void, index: number, value: T) => {
        const copy = [...arr];
        copy[index] = value;
        setter(copy);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        const validTags = tags.filter(t => t.trim());
        const validPictures = pictures.filter(p => p.trim());
        const validTimeSlots = timeSlots
            .filter(ts => ts.dayOfWeek && ts.startTime)
            .map(ts => ({
                dayOfWeek: ts.dayOfWeek!,
                startTime: ts.startTime!.length === 5 ? ts.startTime + ":00" : ts.startTime!
            }));

        if (validTimeSlots.length === 0) {
            setError("Veuillez ajouter au moins un créneau horaire");
            return;
        }

        const sessionData = {
            name,
            description,
            tags: validTags,
            duration,
            price,
            minParticipants,
            maxParticipants,
            difficulty,
            pictures: validPictures,
            timeSlots: validTimeSlots,
        };

        try {
            const url = sessionToEdit ? `${baseUrl}/sessions/${sessionToEdit.id}` : `${baseUrl}/sessions`;
            const method = sessionToEdit ? 'PUT' : 'POST';
            const token = getToken();
            if (!token) {
                setError("Session expirée, veuillez vous reconnecter.");
                toast.error("Session expirée, veuillez vous reconnecter.");
                return;
            }
            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(sessionData),
            });

            if (!response.ok) {
                const errorResponse = await response.json();
                throw new Error(errorResponse.message || 'Une erreur est survenue');
            }

            const updatedSession = await response.json();
            toast.success(`Session ${sessionToEdit ? 'mise à jour' : 'ajoutée'} avec succès !`);
            if (sessionToEdit) {
                onSessionUpdated(updatedSession);
            } else {
                onSessionAdded(updatedSession);
            }
        } catch (error: any) {
            setError(error.message || "Erreur inconnue.");
            toast.error(error.message || "Erreur inconnue.");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-4">
            <h2 className="text-xl font-bold mb-4">{sessionToEdit ? 'Modifier la session' : 'Ajouter une nouvelle session'}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="col-span-1 md:col-span-2">
                    <label className="label"><span className="label-text">Nom</span></label>
                    <input
                        type="text"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        className="input input-bordered w-full"
                        required
                    />
                </div>
                <div className="col-span-1 md:col-span-2">
                    <label className="label"><span className="label-text">Description</span></label>
                    <textarea
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        className="textarea textarea-bordered w-full"
                        required
                    />
                </div>
                <div className="col-span-1 md:col-span-2">
                    <h3 className="font-bold mb-2">Tags</h3>
                    {tags.map((tag, index) => (
                        <div key={index} className="flex items-center gap-2 mb-2">
                            <input
                                type="text"
                                value={tag}
                                onChange={e => handleArrayChange(tags, setTags, index, e.target.value)}
                                className="input input-bordered w-full"
                            />
                            {tags.length > 1 && (
                                <button type="button" onClick={() => setTags(tags.filter((_, i) => i !== index))} className="btn btn-error">Supprimer</button>
                            )}
                        </div>
                    ))}
                    <button type="button" onClick={() => setTags([...tags, ''])} className="btn btn-secondary mt-2">Ajouter un tag</button>
                </div>
                <div>
                    <label className="label"><span className="label-text">Durée (minutes)</span></label>
                    <input
                        type="number"
                        min={1}
                        value={duration}
                        onChange={e => setDuration(Number(e.target.value))}
                        className="input input-bordered w-full"
                        required
                    />
                </div>
                <div>
                    <label className="label"><span className="label-text">Prix</span></label>
                    <input
                        type="number"
                        min={0}
                        value={price}
                        onChange={e => setPrice(Number(e.target.value))}
                        className="input input-bordered w-full"
                        required
                    />
                </div>
                <div>
                    <label className="label"><span className="label-text">Participants Min</span></label>
                    <input
                        type="number"
                        min={1}
                        value={minParticipants}
                        onChange={e => setMinParticipants(Number(e.target.value))}
                        className="input input-bordered w-full"
                        required
                    />
                </div>
                <div>
                    <label className="label"><span className="label-text">Participants Max</span></label>
                    <input
                        type="number"
                        min={minParticipants}
                        value={maxParticipants}
                        onChange={e => setMaxParticipants(Number(e.target.value))}
                        className="input input-bordered w-full"
                        required
                    />
                </div>
                <div className="flex flex-col">
                    <label className="label"><span className="label-text">Difficulté</span></label>
                    <div className="rating rating-sm">
                        {[1,2,3,4,5].map(i => (
                            <input
                                key={i}
                                type="radio"
                                name="difficulty"
                                className="mask mask-star-2 bg-primary"
                                checked={difficulty === i}
                                onChange={() => setDifficulty(i)}
                            />
                        ))}
                    </div>
                </div>
                <div className="col-span-1 md:col-span-2">
                    <h3 className="font-bold mb-2">Images (URLs)</h3>
                    {pictures.map((picture, index) => (
                        <div key={index} className="flex items-center gap-2 mb-2">
                            <input
                                type="text"
                                value={picture}
                                onChange={e => handleArrayChange(pictures, setPictures, index, e.target.value)}
                                className="input input-bordered w-full"
                            />
                            {pictures.length > 1 && (
                                <button type="button" onClick={() => setPictures(pictures.filter((_, i) => i !== index))} className="btn btn-error">Supprimer</button>
                            )}
                        </div>
                    ))}
                    <button type="button" onClick={() => setPictures([...pictures, ''])} className="btn btn-secondary mt-2">Ajouter une image</button>
                </div>
                <div className="col-span-1 md:col-span-2">
                    <h3 className="font-bold mb-2">Créneaux Horaires</h3>
                    {timeSlots.map((ts, index) => (
                        <div key={index} className="p-2">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                <div>
                                    <label className="label"><span className="label-text">Jour</span></label>
                                    <select
                                        value={ts.dayOfWeek}
                                        onChange={e => handleTimeSlotChange(index, 'dayOfWeek', e.target.value)}
                                        className="select select-bordered w-full"
                                    >
                                        <option>Lundi</option>
                                        <option>Mardi</option>
                                        <option>Mercredi</option>
                                        <option>Jeudi</option>
                                        <option>Vendredi</option>
                                        <option>Samedi</option>
                                        <option>Dimanche</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="label"><span className="label-text">Heure de début</span></label>
                                    <input
                                        type="time"
                                        value={ts.startTime}
                                        onChange={e => handleTimeSlotChange(index, 'startTime', e.target.value)}
                                        className="input input-bordered w-full"
                                        required
                                    />
                                </div>
                            </div>
                            {timeSlots.length > 1 && (
                                <>
                                    <button type="button" onClick={() => removeTimeSlot(index)}
                                            className="btn btn-error mt-2">Supprimer le créneau
                                    </button>
                                    <div className={"divider my-2"}></div>
                                </>
                            )}
                        </div>
                    ))}
                    <button type="button" onClick={() => setTimeSlots([...timeSlots, DEFAULT_TIME_SLOT])} className="btn btn-secondary mt-2">Ajouter un créneau</button>
                </div>
            </div>
            {error && <p className="text-error mt-4">{error}</p>}
            <div className={"w-full flex justify-end"}>
                <button type="submit" className="btn btn-primary mt-4">{sessionToEdit ? 'Mettre à jour' : 'Créer'}</button>
            </div>
        </form>
    );

    function handleTimeSlotChange(index: number, field: keyof TimeSlot, value: string | number) {
        setTimeSlots(prev => {
            const copy = [...prev];
            copy[index] = { ...copy[index], [field]: value };
            return copy;
        });
    }

    function removeTimeSlot(index: number) {
        if (timeSlots.length > 1) {
            setTimeSlots(prev => prev.filter((_, i) => i !== index));
        }
    }
};

export default SessionForm;
