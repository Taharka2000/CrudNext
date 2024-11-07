"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Contact from "../Service/ContacSer";

interface RemoveBtnProps {
  _id: string; // Assurez-vous que l'identifiant est passé en tant que prop
}

export default function RemoveBtn({ _id }: RemoveBtnProps) {
  const [loading, setLoading] = useState(false);
  const router = useRouter(); // Utilisation du hook useRouter pour naviguer après la suppression
  const handleDeleteContact = async (id: string) => {
    setLoading(true); // Activer l'état de chargement
    try {
      await Contact.delete(id);
      console.log("Contact supprimé avec succès !");
      router.refresh(); // Rafraîchir la page ou rediriger selon le besoin
    } catch (error) {
      console.error("Erreur lors de la suppression du contact:", error);
      alert("Erreur lors de la suppression du contact"); // Afficher un message d'erreur
    } finally {
      setLoading(false); // Désactiver l'état de chargement
    }
  };

  return (
    <button
      onClick={() => handleDeleteContact(_id)} // Appeler la bonne fonction
      className="btn btn-error ml-2"
      disabled={loading} // Désactiver le bouton pendant la suppression
    >
      {loading ? "Deleting..." : "Delete"} {/* Affichage conditionnel du texte */}
    </button>
  );
}
