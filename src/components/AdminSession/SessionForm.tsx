import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import type { Session, TimeSlot } from '../../interfaces/session';

interface SessionFormProps {
    onSessionAdded: (session: Session) => void;
    onSessionUpdated: (session: Session) => void;
    sessionToEdit?: Session | null;
}

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
    const [timeSlots, setTimeSlots] = useState<Partial<TimeSlot>[]>([{ dayOfWeek: 'Lundi', startTime: '10:00' }]);
    const [error, setError] = useState<string | null>(null);
    const apiUrl = "http://localhost:3000";

    useEffect(() => {
        if (sessionToEdit) {
            setName(sessionToEdit.name);
            setDescription(sessionToEdit.description);
            setTags(sessionToEdit.tags);
            setDuration(sessionToEdit.duration);
            setPrice(sessionToEdit.price);
            setMinParticipants(sessionToEdit.minParticipants);
            setMaxParticipants(sessionToEdit.maxParticipants);
            setDifficulty(sessionToEdit.difficulty);
            setPictures(sessionToEdit.pictures);
            setTimeSlots(sessionToEdit.timeSlots ? sessionToEdit.timeSlots.map(ts => ({ ...ts })) : []);
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
            setTimeSlots([{ dayOfWeek: 'Lundi', startTime: '10:00' }]);
        }
    }, [sessionToEdit]);

    const handleTimeSlotChange = (index: number, field: keyof TimeSlot, value: string | number) => {
        const newTimeSlots = [...timeSlots];
        const timeSlot = { ...newTimeSlots[index], [field]: value };
        newTimeSlots[index] = timeSlot;
        setTimeSlots(newTimeSlots);
    };

    const addTimeSlot = () => {
        setTimeSlots([...timeSlots, { dayOfWeek: 'Lundi', startTime: '10:00' }]);
    };

    const removeTimeSlot = (index: number) => {
        if (timeSlots.length > 1) {
            const newTimeSlots = timeSlots.filter((_, i) => i !== index);
            setTimeSlots(newTimeSlots);
        }
    };

    const handleTagChange = (index: number, value: string) => {
        const newTags = [...tags];
        newTags[index] = value;
        setTags(newTags);
    };

    const addTag = () => {
        setTags([...tags, '']);
    };

    const removeTag = (index: number) => {
        const newTags = tags.filter((_, i) => i !== index);
        setTags(newTags);
    };

    const handlePictureChange = (index: number, value: string) => {
        const newPictures = [...pictures];
        newPictures[index] = value;
        setPictures(newPictures);
    };

    const addPicture = () => {
        setPictures([...pictures, '']);
    };

    const removePicture = (index: number) => {
        const newPictures = pictures.filter((_, i) => i !== index);
        setPictures(newPictures);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        const sessionData = {
            name,
            description,
            tags: tags.filter(t => t.trim() !== ''),
            duration,
            price,
            minParticipants,
            maxParticipants,
            difficulty,
            pictures: pictures.filter(p => p.trim() !== ''),
            timeSlots: timeSlots
                .filter(ts => ts.dayOfWeek && ts.startTime)
                .map(ts => ({
                    dayOfWeek: ts.dayOfWeek,
                    startTime: ts.startTime ? (ts.startTime.length === 5 ? `${ts.startTime}:00` : ts.startTime) : '00:00:00' // Ensure HH:mm:ss format
                })),
        };

        if (sessionData.timeSlots.length === 0) {
            setError("Veuillez ajouter au moins un créneau horaire");
            return;
        }

        try {
            const url = sessionToEdit ? `${apiUrl}/sessions/${sessionToEdit.id}` : `${apiUrl}/sessions`;
            const method = sessionToEdit ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('authToken')}`
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
            setError(error.message);
            toast.error(error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-4 border rounded-lg bg-base-200">
            <h2 className="text-xl font-bold mb-4">{sessionToEdit ? 'Modifier la session' : 'Ajouter une nouvelle session'}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="col-span-1 md:col-span-2">
                    <label className="label">
                        <span className="label-text">Nom</span>
                    </label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="input input-bordered w-full"
                        required
                    />
                </div>
                <div className="col-span-1 md:col-span-2">
                    <label className="label">
                        <span className="label-text">Description</span>
                    </label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
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
                                onChange={(e) => handleTagChange(index, e.target.value)}
                                className="input input-bordered w-full"
                                required
                            />
                            {tags.length > 1 &&
                                <button type="button" onClick={() => removeTag(index)} className="btn btn-error">Supprimer</button>
                            }
                        </div>
                    ))}
                    <button type="button" onClick={addTag} className="btn btn-secondary mt-2">Ajouter un tag</button>
                </div>
                <div>
                    <label className="label">
                        <span className="label-text">Durée (minutes)</span>
                    </label>
                    <input
                        type="number"
                        value={duration}
                        onChange={(e) => setDuration(Number(e.target.value))}
                        className="input input-bordered w-full"
                        required
                    />
                </div>
                <div>
                    <label className="label">
                        <span className="label-text">Prix</span>
                    </label>
                    <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(Number(e.target.value))}
                        className="input input-bordered w-full"
                        required
                    />
                </div>
                <div>
                    <label className="label">
                        <span className="label-text">Participants Min</span>
                    </label>
                    <input
                        type="number"
                        value={minParticipants}
                        onChange={(e) => setMinParticipants(Number(e.target.value))}
                        className="input input-bordered w-full"
                        required
                    />
                </div>
                <div>
                    <label className="label">
                        <span className="label-text">Participants Max</span>
                    </label>
                    <input
                        type="number"
                        value={maxParticipants}
                        onChange={(e) => setMaxParticipants(Number(e.target.value))}
                        className="input input-bordered w-full"
                        required
                    />
                </div>
                <div className='flex flex-col'>
                    <label className="label">
                        <span className="label-text">Difficulté</span>
                    </label>
                    <div className="rating rating-sm">
                        {[...Array(5)].map((_, i) => (
                            <input
                                key={i}
                                type="radio"
                                name="difficulty"
                                className="mask mask-star-2 bg-orange-400"
                                checked={difficulty === i + 1}
                                onChange={() => setDifficulty(i + 1)}
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
                                onChange={(e) => handlePictureChange(index, e.target.value)}
                                className="input input-bordered w-full"
                                required
                            />
                            {pictures.length > 1 &&
                                <button type="button" onClick={() => removePicture(index)} className="btn btn-error">Supprimer</button>
                            }
                        </div>
                    ))}
                    <button type="button" onClick={addPicture} className="btn btn-secondary mt-2">Ajouter une image</button>
                </div>
                <div className="col-span-1 md:col-span-2">
                    <h3 className="font-bold mb-2">Créneaux Horaires</h3>
                    {timeSlots.map((ts, index) => {
                        const timeSlot = ts as TimeSlot;
                        return (
                            <div key={index} className="p-2 border rounded-md bg-base-100">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                    <div>
                                        <label className="label">
                                            <span className="label-text">Jour</span>
                                        </label>
                                        <select
                                            value={timeSlot.dayOfWeek}
                                            onChange={(e) => handleTimeSlotChange(index, 'dayOfWeek', e.target.value)}
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
                                        <label className="label">
                                            <span className="label-text">Heure de début</span>
                                        </label>
                                        <input
                                            type="time"
                                            value={timeSlot.startTime}
                                            onChange={(e) => handleTimeSlotChange(index, 'startTime', e.target.value)}
                                            className="input input-bordered w-full"
                                            required
                                        />
                                    </div>
                                </div>
                                {timeSlots.length > 1 && (
                                    <button type="button" onClick={() => removeTimeSlot(index)} className="btn btn-error mt-2">Supprimer le créneau</button>
                                )}
                            </div>
                        );
                    })}
                    <button type="button" onClick={addTimeSlot} className="btn btn-secondary mt-2">Ajouter un créneau</button>
                </div>
            </div>
            {error && <p className="text-red-500 mt-4">{error}</p>}
            <button type="submit" className="btn btn-primary mt-4">{sessionToEdit ? 'Mettre à jour' : 'Créer'}</button>
        </form>
    );
};

export default SessionForm;
