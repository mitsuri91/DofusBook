import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

function CreatePersonnage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    user_id: 1,
    class_id: 1,
    name: "",
    gender: "",
    level: 1,
  });

  const [classes, setClasses] = useState<{ id: number; name: string }[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/caractere/classes`,
        );
        if (response.ok) {
          const data = await response.json();
          setClasses(data);
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des classes:", error);
      }
    };

    fetchClasses();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "level" || name === "class_id" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url = `${import.meta.env.VITE_API_URL}/api/characters`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      alert(
        response.ok
          ? "Caractère créé avec succès."
          : "Échec de la création du caractère.",
      );
      if (response.ok) navigate("/characters");
    } catch (error) {
      console.error("Erreur lors de l'enregistrement:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-character-container">
      <h1>Créer un caractère</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Nom:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="gender">Genre:</label>
          <select
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
          >
            <option value="">Sélectionnez un genre</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="level">Niveau:</label>
          <input
            type="number"
            id="level"
            name="level"
            min="1"
            max="200"
            value={formData.level}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="class_id">Classe:</label>
          <select
            id="class_id"
            name="class_id"
            value={formData.class_id}
            onChange={handleChange}
            required
          >
            <option value="">Sélectionnez une classe</option>
            {classes.map((classItem) => (
              <option key={classItem.id} value={classItem.id}>
                {classItem.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-actions">
          <button type="submit" disabled={loading}>
            {loading ? "Enregistrement..." : "Créer"}
          </button>
          <button type="button" onClick={() => navigate("/characters")}>
            Annuler
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreatePersonnage;
