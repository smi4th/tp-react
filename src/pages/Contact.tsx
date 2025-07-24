import React, { useState } from 'react';

const catImages = [
    'src/assets/cat-1.jpg',
    'src/assets/cat-2.jpg',
    'src/assets/cat-3.jpg',
    'src/assets/cat-4.jpg',
    'src/assets/cat-5.jpg'
];

const Contact: React.FC = () => {
    const [toastMessage, setToastMessage] = useState<string | null>(null);
    const [toastType, setToastType] = useState<'success' | 'error' | null>(null);

    const [catImage] = useState<string>(
        catImages[Math.floor(Math.random() * catImages.length)]
    );

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const isSuccess = Math.random() > 0.5;
        if (isSuccess) {
            setToastMessage('Votre message a bien été envoyé !');
            setToastType('success');
        } else {
            setToastMessage("Échec de l'envoi du message. Veuillez réessayer.");
            setToastType('error');
        }
        setTimeout(() => {
            setToastMessage(null);
            setToastType(null);
        }, 3000);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="card w-full max-w-md shadow-xl bg-base-100">
                <div className="card-body">
                    <div className="flex items-center justify-between mb-4">
                        <legend className="fieldset-legend text-2xl font-bold">Contactez-nous</legend>
                        <div className="avatar">
                            <div className="w-16 rounded">
                                <img src={catImage} alt="Chat mignon" />
                            </div>
                        </div>
                    </div>
                    <form onSubmit={handleSubmit} className="w-full">
                        <fieldset className="fieldset mx-auto">

                            <label className="label">Demande</label>
                            <input type="text validator" className="input w-full" placeholder="Votre demande" />

                            <label className="label">Email</label>
                            <input type="email validator" className="input w-full" placeholder="Votre email" />

                            <label className="label">Commentaire</label>
                            <textarea className="textarea w-full" placeholder="Commentaire"></textarea>
                        </fieldset>

                        <div className="form-control mt-6 flex justify-end">
                            <button type="submit" className="btn btn-primary">Envoyer</button>
                        </div>
                    </form>
                </div>
            </div>
            {toastMessage && (
                <div className={`toast toast-${toastType} fixed bottom-4 right-4`}>
                    <div className={`alert alert-${toastType}`}>
                        <span>{toastMessage}</span>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Contact;
