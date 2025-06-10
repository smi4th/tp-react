import React from "react";
import type { escapeSession } from "../../interfaces/escape.ts";
import Modal from "./Modal.tsx";

const CardEscapeSession: React.FC<escapeSession> = (props) => {
    return (
        <div className={`card  bg-base-100 border-1-[${props.color}] w-96 shadow-sm`}>
            <div className="card-body">
                <h2 className="card-title">
                    {props.name}
                    {props.tags?.map((tag, index) => (
                        <div key={index} className="badge badge-secondary">{tag}</div>
                    ))}
                </h2>
                <p>{props.description}</p>
                <div className="card-actions justify-end">
                    <Modal {...props}/>
                </div>
                <div className="card-actions justify-end">
                    <div className="badge badge-outline">{props.isVr ? "VR" : "Non-VR"}</div>
                    <div className="badge badge-outline">{props.isCoop ? "Co-op" : "Solo"}</div>
                </div>
            </div>
        </div>
    );
};

export default CardEscapeSession;