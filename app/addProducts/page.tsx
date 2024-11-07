"use client";  // Ceci indique que ce composant est un Client Component

import React, { useState } from 'react';
import Contact from '../Service/ContacSer';

const AjoutCompte: React.FC = () => {
    const [prenom, setPrenom] = useState('');
    const [nom, setNom] = useState('');
    const [email, setEmail] = useState('');
    const [numero, setNumero] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const validateForm = () => {
        if (!prenom || !nom || !email || !numero) {
            setError('Tous les champs sont obligatoires');
            return false;
        }
        return true;
    };

    const handleAddContact = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) return;

        setLoading(true);
        try {
            const data = { Prenom: prenom, Nom: nom, Email: email, Numero: numero };
            await Contact.create(data);
            alert("Compte créé avec succès");
        } catch (error) {
            console.error("Erreur lors de la création d'un compte:", error);
            setError("Erreur lors de la création du compte");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg">
            <h2>Créer un compte</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleAddContact}>
                <div>
                    <label htmlFor="prenom">Prénom</label>
                    <input
                        type="text"
                        id="prenom"
                        value={prenom}
                        onChange={(e) => setPrenom(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="nom">Nom</label>
                    <input
                        type="text"
                        id="nom"
                        value={nom}
                        onChange={(e) => setNom(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="numero">Numéro de téléphone</label>
                    <input
                        type="text"
                        id="numero"
                        value={numero}
                        onChange={(e) => setNumero(e.target.value)}
                        required
                    />
                </div>

                <button type="submit" disabled={loading}>
                    {loading ? 'Chargement...' : 'Ajouter Contact'}
                </button>
            </form>
        </div>
    );
};

export default AjoutCompte;
