import React, { useEffect, useState } from "react";
import type { StepProps } from "@interfaces/form.ts";
import { useAPI } from "@/hook/useAPI.ts";
import type { Room, TimeSlot } from "@interfaces/escape.ts";
import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from "@fullcalendar/interaction"
import { useSession } from "@/hook/useSession.ts";

const dayOfWeekMap: Record<string, number> = {
    "Dimanche": 0,
    "Lundi": 1,
    "Mardi": 2,
    "Mercredi": 3,
    "Jeudi": 4,
    "Vendredi": 5,
    "Samedi": 6,
};

const SecondStep: React.FC<StepProps> = ({ formData, setFormData }) => {

    const [rooms, setRooms] = useState<Room[]>([]);
    const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
    const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
    const [events, setEvents] = useState<any[]>([]);
    const [calendarKey, setCalendarKey] = useState<number>(0);
    const [selectedEventId, setSelectedEventId] = useState<string | null>(null);

    const { getToken } = useSession();
    const { baseUrl } = useAPI();

    useEffect(() => {
        const fetchRooms = async () => {
            const token = getToken();
            const res = await fetch(`${baseUrl}/sessions`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            if (res.ok) {
                const roomsData = await res.json();
                setRooms(roomsData);
            } else {
                setRooms([]);
            }
        };
        fetchRooms();
    }, [baseUrl]);

    useEffect(() => {
        const fetchSlots = async () => {
            if (!selectedRoom) {
                setTimeSlots([]);
                setEvents([]);
                setSelectedEventId(null);
                return;
            }
            const token = getToken();
            const res = await fetch(`${baseUrl}/sessions/${selectedRoom.id}/timeslots`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            if (res.ok) {
                const slots: TimeSlot[] = await res.json();
                setTimeSlots(slots);
                setCalendarKey(prev => prev + 1);
                setSelectedEventId(null);
                setFormData((prev) => ({
                    ...prev,
                    idSlot: "",
                }));
            }
        };
        fetchSlots();
    }, [selectedRoom, baseUrl]);

    useEffect(() => {
        if (!selectedRoom || timeSlots.length === 0) {
            setEvents([]);
            return;
        }
        const slotEvents: any[] = [];
        const reservationEvents: any[] = [];
        for (const slot of timeSlots) {
            slotEvents.push({
                id: `slot-${slot.id}`,
                groupId: slot.id,
                title: "Disponible",
                daysOfWeek: [dayOfWeekMap[slot.dayOfWeek]],
                startTime: slot.startTime,
                endTime: slot.endTime,
                color: selectedEventId === String(slot.id) ? "#10b981" : "#2563eb",
                editable: false,
                extendedProps: {
                    slotId: slot.id,
                    isReserved: false,
                },
            });
            for (const reservation of slot.reservations) {
                reservationEvents.push({
                    id: `res-${reservation.id}`,
                    groupId: slot.id,
                    title: "Réservé",
                    start: `${reservation.date}T${slot.startTime.length === 5 ? slot.startTime + ':00' : slot.startTime}`,
                    end: `${reservation.date}T${slot.endTime.length === 5 ? slot.endTime + ':00' : slot.endTime}`,
                    color: "#dc2626",
                    editable: false,
                    extendedProps: {
                        slotId: slot.id,
                        isReserved: true,
                    },
                });
            }
        }
        setEvents([...slotEvents, ...reservationEvents]);
    }, [timeSlots, selectedRoom, selectedEventId]);

    return (
        <div className={"w-full flex flex-col space-y-4"}>
            <div className="flex flex-col">
                <label className="label w-full">
                    <span className="label-text">Escape game</span>
                </label>
                <select
                    className="select select-bordered select-primary w-full"
                    value={selectedRoom ? selectedRoom.id : ""}
                    onChange={(e) => {
                        const room = rooms.find(r => r.id === Number(e.target.value));
                        setSelectedRoom(room || null);
                    }}
                >
                    <option value="">Choisissez un escape game</option>
                    {rooms.map(room => (
                        <option key={room.id} value={room.id}>{room.name}</option>
                    ))}
                </select>
            </div>
            {selectedRoom && (
                <div className="flex flex-col">
                    <label className="label w-full">
                        <span className="label-text">Choisissez un créneau</span>
                    </label>
                    <FullCalendar
                        key={calendarKey}
                        plugins={[timeGridPlugin, interactionPlugin]}
                        initialView="timeGridWeek"
                        locale="fr"
                        height="auto"
                        events={events}
                        selectable={true}
                        selectMirror={true}
                        selectOverlap={false}
                        eventClick={(info) => {
                            const event = info.event;
                            if (event.extendedProps.isReserved) return;
                            if (event.start && event.start < new Date()) {
                                return;
                            }
                            if (selectedEventId === String(event.extendedProps.slotId)) {
                                setSelectedEventId(null);
                                setFormData((prev) => ({
                                    ...prev,
                                    idSlot: "",
                                    dateSlot: null,
                                }));
                                return;
                            }
                            setSelectedEventId(String(event.extendedProps.slotId));
                            setFormData((prev) => ({
                                ...prev,
                                idSlot: String(event.extendedProps.slotId),
                                date : event.start ? event.start.toISOString().slice(0, 10) : "",
                                dateSlot: event.start ? event.start.toISOString().replace('T', ' ').slice(0, 16) : null,
                            }));
                        }}
                        eventDidMount={({ el, event }) => {
                            if (!event.extendedProps.isReserved) {
                                el.style.cursor = "pointer";
                            }
                        }}
                        headerToolbar={{
                            left: 'prev,next today',
                            center: 'title',
                            right: ''
                        }}
                    />
                    <div className="text-xs mt-2">
                        <span className="inline-block w-3 h-3 mr-1 align-middle bg-cyan-600"></span> Disponible
                        <span className="inline-block w-3 h-3 ml-4 mr-1 align-middle bg-red-300"></span> Réservé
                        <span className="inline-block w-3 h-3 ml-4 mr-1 align-middle bg-emerald-400"></span> Sélectionné
                    </div>
                    {formData.idSlot && (
                        <div className="mt-3 text-green-700">
                            Créneau sélectionné : {formData.dateSlot}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default SecondStep;
