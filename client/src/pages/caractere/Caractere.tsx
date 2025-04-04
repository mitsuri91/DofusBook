import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";

function Caractere() {
  const { id } = useParams();
  const navigate = useNavigate();

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
    fetch(`${import.meta.env.VITE_API_URL}/api/characters/1`, {
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

  const handleEdit = (character: {
    id: number;
    user_id: number;
    class_id: number;
    name: string;
    gender: string;
    level: number;
    class_name: string;
  }) => {
    navigate(`/createCaractere/${character.id}`, {
      state: {
        characterData: character,
      },
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
          <div key={item.id} className="character-card">
            <form>
              <div className="form-group">
                <label htmlFor={`name-${item.id}`}>Name:</label>
                <input
                  type="text"
                  id={`name-${item.id}`}
                  value={item.name}
                  readOnly
                />
              </div>
              <div className="form-group">
                <label htmlFor={`gender-${item.id}`}>Gender:</label>
                <input
                  type="text"
                  id={`gender-${item.id}`}
                  value={item.gender}
                  readOnly
                />
              </div>
              <div className="form-group">
                <label htmlFor={`level-${item.id}`}>Level:</label>
                <input
                  type="text"
                  id={`level-${item.id}`}
                  value={item.level}
                  readOnly
                />
              </div>
              <div className="form-group">
                <label htmlFor={`class-${item.id}`}>Class:</label>
                <input
                  type="text"
                  id={`class-${item.id}`}
                  value={item.class_name}
                  readOnly
                />
              </div>
              <div className="form-actions">
                <button type="button" onClick={() => handleEdit(item)}>
                  Modifier
                </button>
                <button
                  type="button"
                  onClick={() => handleSubmitDelete(item.id)}
                >
                  Supprimer
                </button>

                <button
                  type="button"
                  onClick={() => navigate("/createPersonnage")}
                >
                  Créer un nouveau personnage
                </button>
              </div>
            </form>
          </div>
        ))
      ) : (
        <p>Aucun caractère trouvé.</p>
      )}
    </>
  );
}
export default Caractere;
