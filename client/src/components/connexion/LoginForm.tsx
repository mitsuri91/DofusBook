import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const savedUserData = localStorage.getItem("userData");
    if (savedUserData) {
      try {
        const parsedData = JSON.parse(savedUserData);
        setFormData(parsedData);
      } catch (error) {
        console.error("Erreur lors de la récupération des données:", error);
      }
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const storedUserData = localStorage.getItem("userData");
    const storedUser = storedUserData ? JSON.parse(storedUserData) : null;

    if (
      storedUser &&
      storedUser.email === formData.email &&
      storedUser.password === formData.password
    ) {
      localStorage.setItem("isAuthenticated", "true");
      alert("Connexion réussie !");
      navigate("/caractere/1");
    } else {
      alert("Identifiants incorrects !");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80">
        <h2 className="text-2xl font-bold mb-4 text-center">Connexion</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name" className="block mb-2">
            Nom :
          </label>
          <input
            id="name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full p-2 mb-4 border border-gray-300 rounded"
          />

          <label htmlFor="email" className="block mb-2">
            Adresse e-mail :
          </label>
          <input
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-2 mb-4 border border-gray-300 rounded"
          />

          <label htmlFor="password" className="block mb-2">
            Mot de passe :
          </label>
          <input
            id="password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full p-2 mb-4 border border-gray-300 rounded"
          />

          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
          >
            Se connecter
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
