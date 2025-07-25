import React from "react";
import type { escapeSession } from "@interfaces/escape.ts";
import Rating from "./Rating.tsx";

const Modal: React.FC<escapeSession> = (props) => {
    return (
        <>
            <button
                className="btn btn-primary"
                onClick={() =>
                    (document.getElementById('session_modal') as HTMLDialogElement)?.showModal()
                }
            >
                Plus d'informations ici
            </button>

            <dialog id="session_modal" className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">{props.name}</h3>
                    <p className="py-2"><strong>Description :</strong> {props.description}</p>
                    <p className="py-2"><strong>Durée :</strong> {props.duration} minutes</p>
                    <p className="py-2">
                        <strong>Joueurs :</strong> {props.minParticipants} - {props.maxParticipants}
                    </p>
                    <div className="py-2">
                        <strong>Difficulté :</strong> <Rating rating={props.difficulty} />
                    </div>
                    <p className="py-2">
                        <strong>Type :</strong> {props.isVr ? "VR" : "Non-VR"},{" "}
                        {props.isCoop ? "Co-op" : "Solo"}
                    </p>

                    {props.tags?.length > 0 && (
                        <div className="py-2">
                            <strong>Tags :</strong>
                            <div className="flex flex-wrap gap-2 mt-2">
                                {props.tags.map((tag, index) => (
                                    <span key={index} className="badge badge-secondary">{tag}</span>
                                ))}
                            </div>
                        </div>
                    )}

                    {props.pictures?.length > 0 && (
                        <div className="py-2">
                            <strong>Images :</strong>
                            <div className="flex flex-wrap gap-2 mt-2">
                                {props.pictures.map((picture, index) => (
                                    <img
                                        key={index}
                                        src={picture}
                                        alt={`Escape session ${index}`}
                                        className="w-32 h-20 object-cover rounded"
                                    />
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="modal-action">
                        <form method="dialog">
                            <button className="btn">Fermer</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </>
    );
};

export default Modal;
