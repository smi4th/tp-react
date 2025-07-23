import React, { useState } from "react";

export interface FourthStepProps {
    name: string;
    customerEmail: string;
    date: string;
    time: string;
    timeSlotId: string;
    guests: string;
    setFormData: React.Dispatch<React.SetStateAction<{
        name: string;
        email: string;
        date: string;
        time: string;
        guests: string;
        idSlot: string;
    }>>;
}

const apiUrl = import.meta.env.API_URL || "http://localhost:3000";

const FourthStep: React.FC<FourthStepProps> = ({ name, customerEmail, date, time, guests,timeSlotId }) => {
    const [showToast, setShowToast] = useState(false);

    const handleConfirm = () => {
        
        const createReservation = async () => {
            try {
                const response = await fetch(apiUrl + "/reservations", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ name, customerEmail, date, time, guests , timeSlotId }),
                });
                if (!response.ok) {
                    throw new Error("Failed to create reservation");
                }
                const data = await response.json();
                console.log("Reservation created successfully:", data);
                setShowToast(true);
                setTimeout(() => setShowToast(false), 3000); // Hide toast after 3 seconds
            } catch (error) {
                console.error("Error creating reservation:", error);
                alert("Failed to create reservation. Please try again.");
            }
        };
        createReservation();
    }

    return (
        <div className="p-4 flex flex-col items-center justify-center space-y-4 w-full">
            <h2 className="text-xl font-bold mb-4">Récapitulatif de la réservation</h2>
            <div className="card shadow-accent shaddow-lg w-full max-w-md border-2 border-secondary">
                <div className="card-body">
                    <table className="table w-full">
                        <tbody>
                            <tr>
                                <td className="font-bold">Nom:</td>
                                <td>{name}</td>
                            </tr>
                            <tr>
                                <td className="font-bold">Email:</td>
                                <td>{customerEmail}</td>
                            </tr>
                            <tr>
                                <td className="font-bold">Date:</td>
                                <td>{date}</td>
                            </tr>
                            <tr>
                                <td className="font-bold">Heure:</td>
                                <td>{time}</td>
                            </tr>
                            <tr>
                                <td className="font-bold">Nombre de participants:</td>
                                <td>{guests}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="flex justify-between mt-4">
                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleConfirm}
                >
                    Confirmer la réservation
                </button>
            </div>
            {showToast && (
                <div className="toast toast-end">
                    <div className="alert alert-success">
                        <span>Message sent successfully.</span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FourthStep;