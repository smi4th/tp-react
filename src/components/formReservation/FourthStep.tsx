import React, { useState } from "react";
import {useAPI} from "@/hook/useAPI.ts";

interface ReservationFormData {
    name: string;
    customerEmail: string;
    date: string;
    time: string;
    guests: string;
    timeSlotId: string;
}

type Toasted = {
    message: string;
    type: "success" | "error";
}

const FourthStep: React.FC<ReservationFormData> = (props) => {
    const [showToast, setShowToast] = useState<Boolean>(false);
    const [toast, setToast] = useState<Toasted>({
        message: "",
        type: "success"
    });
    const { baseUrl } = useAPI();

    const handleConfirm = () => {

        const createReservation = async () => {
            try {
                const response = await fetch(baseUrl + "/reservations", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(props),
                });
                if (!response.ok) {
                    throw new Error("Failed to create formReservation");
                }
                setToast({
                    message: "Inscription validée. Vous recevrez un email de confirmation.",
                    type: "success"
                });
                setShowToast(true);

            } catch (error) {
                setToast({
                    message: "Erreur lors de la création de la réservation. Veuillez réessayer.",
                    type: "error"
                })
                setShowToast(true);
                console.error("Error creating formReservation:", error);

            }finally {
                setTimeout(() => setShowToast(false), 10000);
            }
        };
        createReservation();
    };

    return (
        <div className="p-4 flex flex-col items-center justify-center space-y-4 w-full">
            <h2 className="text-xl font-bold mb-4">Récapitulatif de la réservation</h2>
            <div className="card shadow-accent shaddow-lg w-full max-w-md border-2 border-secondary">
                <div className="card-body">
                    <table className="table w-full">
                        <tbody>
                        <tr>
                            <td className="font-bold">Nom:</td>
                            <td>{props.name}</td>
                        </tr>
                        <tr>
                            <td className="font-bold">Email:</td>
                            <td>{props.customerEmail}</td>
                        </tr>
                        <tr>
                            <td className="font-bold">Date:</td>
                            <td>{props.date}</td>
                        </tr>
                        <tr>
                            <td className="font-bold">Heure:</td>
                            <td>{props.time}</td>
                        </tr>
                        <tr>
                            <td className="font-bold">Nombre de participants:</td>
                            <td>{props.guests}</td>
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
                <Toaster message={toast.message} type={toast.type} />
            )}
        </div>
    );
};

export default FourthStep;

interface ToasterProps {
    message: string;
    type: "success" | "error";
}

const Toaster: React.FC<ToasterProps> = ({ message, type }) => {
    return (
        <div className="toast toast-end">
            <div className={`alert alert-${type}`}>
                <span>{message}</span>
            </div>
        </div>
    );
};
