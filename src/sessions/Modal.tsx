import React from "react";
import type { escapeSession } from "../interfaces/escape.ts";

const Modal: React.FC<escapeSession> = (props) => {
    return (
        <>
            <button className="btn btn-primary" onClick={() => (document.getElementById('session_modal') as HTMLDialogElement)?.showModal()}>
                Plus d'informations ici
            </button>
            <dialog id="session_modal" className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">{props.name}</h3>
                    <p className="py-2"><strong>Description :</strong> {props.description}</p>
                    <p className="py-2"><strong>Durée :</strong> {props.durationSeconds / 60} minutes</p>
                    <p className="py-2"><strong>Joueurs :</strong> {props.min_players} - {props.max_players}</p>
                    <p className="py-2"><strong>Difficulté :</strong> {props.difficulty}/5</p>
                    <p className="py-2"><strong>Type :</strong> {props.isVr ? "VR" : "Non-VR"}, {props.isCoop ? "Co-op" : "Solo"}</p>
                    <div className="py-2">
                        <strong>Tags :</strong>
                        <div className="flex flex-wrap gap-2 mt-2">
                            {props.tags.map((tag, index) => (
                                <span key={index} className="badge badge-secondary">{tag}</span>
                            ))}
                        </div>
                    </div>
                    <div className="py-2">
                        <strong>Images :</strong>
                        <div className="flex flex-wrap gap-2 mt-2">
                            {props.images.map((image, index) => (
                                <img key={index} src={image} alt={`Image ${index + 1}`} className="w-24 h-24 object-cover rounded" />
                            ))}
                        </div>
                    </div>
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