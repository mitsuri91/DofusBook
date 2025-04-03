import { useEffect, useState } from "react";
import { useParams } from "react-router";

function Caractere() {
  const { id } = useParams();

  const [caractere, setCaractere] = useState<
    Array<{
      id: number;
      user_id: number;
      class_id: number;
      name: string;
      gender: string;
      level: number;
      class_name: string;
    }>
  >([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const handleSubmitDelete = (characterId: number) => {
    fetch(`${import.meta.env.VITE_API_URL}/api/characters/${characterId}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Erreur ${response.status}: ${response.statusText}`);
        }
        alert(`Caractère avec l'ID ${characterId} supprimé avec succès.`);

        setCaractere((prevCaractere) =>
          prevCaractere.filter((char) => char.id !== characterId),
        );
      })
      .catch((error) => {
        console.error("Erreur lors de la suppression :", error);
        alert("Une erreur est survenue lors de la suppression.");
      });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/characters/${id}`,
        );

        if (!response.ok) {
          throw new Error(`Erreur ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        setCaractere(data);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("Une erreur inconnue s'est produite.");
        }
        console.error("Erreur lors de la récupération de l'adresse :", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur : {error}</p>;
  console.info(caractere);
  return (
    <>
      {caractere.length > 0 ? (
        caractere.map((item) => (
          <div key={item.id}>
            <p>Name: {item.name}</p>
            <p>Gender: {item.gender}</p>
            <p>Level: {item.level}</p>
            <p>Class: {item.class_name}</p>
            <button type="button">Modifier</button>
            <button type="button" onClick={() => handleSubmitDelete(item.id)}>
              Supprimer
            </button>
          </div>
        ))
      ) : (
        <p>Aucun caractère trouvé.</p>
      )}
    </>
  );
}
export default Caractere;
