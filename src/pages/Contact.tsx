import React, { useState, useEffect } from 'react';

const Contact: React.FC = () => {
    const [toastMessage, setToastMessage] = useState<string | null>(null);
    const [toastType, setToastType] = useState<'success' | 'error' | null>(null);
    const [catImage, setCatImage] = useState<string>('');

    useEffect(() => {
        // List of cat images
        const catImageNumbers = Array.from({ length: 5 }, (_, i) => i + 1);
        const randomNumber = catImageNumbers[Math.floor(Math.random() * catImageNumbers.length)];
        setCatImage(`src/assets/cat-${randomNumber}.jpg`);
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Simulate form submission logic
        const isSuccess = Math.random() > 0.5; // Random success or error for demonstration

        if (isSuccess) {
            setToastMessage('Your message has been sent successfully!');
            setToastType('success');
        } else {
            setToastMessage('Failed to send your message. Please try again.');
            setToastType('error');
        }

        // Clear toast after 3 seconds
        setTimeout(() => {
            setToastMessage(null);
            setToastType(null);
        }, 3000);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="card w-full max-w-md shadow-xl bg-base-100">
                <div className="card-body">
                    <div className="flex">
                        <h2 className="card-title text-center mr-4">
                            Contact Us
                        </h2>
                        <div className="avatar">
                            <div className="w-16 rounded">
                                <img src={catImage} alt="Contact Avatar" />
                            </div>
                        </div>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <fieldset className="fieldset w-full p-0">
                            <label className="label">Name</label>
                            <input type="text" className="input" placeholder="Your Name" required />

                            <label className="label mt-4">Email</label>
                            <input type="email" className="input" placeholder="Your Email" required />

                            <label className="label mt-4">Message</label>
                            <textarea className="textarea" placeholder="Your Message" required></textarea>
                        </fieldset>

                        <div className="form-control mt-6">
                            <button type="submit" className="btn btn-primary">Send</button>
                        </div>
                    </form>
                </div>
            </div>

            {/* Toast Notification */}
            {toastMessage && (
                <div
                    className={`toast toast-${toastType} fixed bottom-4 right-4`}
                >
                    <div className={`alert alert-${toastType}`}>
                        <span>{toastMessage}</span>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Contact;