'use client'

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import validate from "./validate";

export const NewEmployee = () => {
    const router = useRouter()
    const [formValues, setFormValues] = useState({
        name: "",
        role: "",
        description: "",
        skills: []
    });
    const [errors, setErrors] = useState({});


    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });
        setErrors(
            validate({
                ...formValues,
                [name]: value,
            })
        );
    };

    const handleSkillChange = (skill) => {
        setFormValues((prev) => ({
            ...prev,
            skills: prev.skills.includes(skill)
                ? prev.skills.filter((s) => s !== skill)
                : [...prev.skills, skill],
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const validationErrors = validate(formValues)
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            const storedEmployees = localStorage.getItem('employees');
            let employeesArray = [];

            try {
                const parsedEmployees = JSON.parse(storedEmployees);
                if (Array.isArray(parsedEmployees)) {
                    employeesArray = parsedEmployees;
                }
            } catch (error) {
                console.error("Error al parsear los empleados de localStorage", error);
            }

            const updatedEmployees = [...employeesArray, formValues];

            localStorage.setItem('employees', JSON.stringify(updatedEmployees));

            console.log('Datos guardados en localStorage:', JSON.stringify(updatedEmployees));

            router.push('/');
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg w-96 mx-auto mt-10 shadow-lg">
            <h1 className="text-black text-2xl font-bold mb-4">Crea una actividad turística</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="name" className="block text-black">Nombre:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formValues.name}
                        onChange={handleChange}
                        required
                        className="w-full p-2 rounded border border-gray-300 text-black"
                    />
                    {errors.nombre && <p className="text-red-500 text-sm">{errors.nombre}</p>}
                </div>

                <div className="mb-4">
                    <label htmlFor="role" className="block text-black">Rol:</label>
                    <select
                        id="role"
                        name="role"
                        value={formValues.role}
                        onChange={handleChange}
                        className="w-full p-2 rounded border border-gray-300 text-black"
                        required
                    >
                        <option value="">Seleccione un rol</option>
                        <option value="Diseñador">Diseñador</option>
                        <option value="Desarrollador">Desarrollador</option>
                        <option value="Cocinero">Cocinero</option>
                        <option value="Mesero">Mesero</option>
                        <option value="Limpieza">Personal de Limpieza</option>
                    </select>
                    {errors.role && <p className="text-red-500 text-sm">{errors.role}</p>}
                </div>

                <div className="mb-4">
                    <label htmlFor="descripcion" className="block text-black">Descripción:</label>
                    <textarea
                        name="description"
                        id="descripcion"
                        placeholder="Me caracterizo por..."
                        value={formValues.description}
                        onChange={handleChange}
                        className="w-full p-2 rounded border border-gray-300 text-black placeholder:text-gray-800 placeholder:opacity-70"
                    />
                    {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
                </div>

                <div className="h-36">
                    <span className="block text-sm font-medium text-black">Habilidades:</span>
                    <div className="mt-2 grid grid-cols-2 gap-2">
                        {['JavaScript', 'React', 'Node.js', 'Python', 'UI/UX', 'Agile'].map((skills) => (
                            <div key={skills} className="flex items-center">
                                <input
                                    id={skills}
                                    name={skills}
                                    type="checkbox"
                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                    checked={formValues.skills.includes(skills)}
                                    onChange={() => handleSkillChange(skills)}
                                />
                                <label htmlFor={skills} className="ml-2 block text-sm text-gray-900">
                                    {skills}
                                </label>
                            </div>
                        ))}
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={errors.name || errors.role || errors.description || errors.skills}
                    className="bg-blue-500 hover:bg-blue-600 text-black font-bold py-2 px-4 rounded w-full"
                >
                    Subir
                </button>
            </form>

            <Link href="/" className="text-blue-300 hover:underline mt-4 block">
                Volver al Home
            </Link>
        </div>
    );
};

export default NewEmployee;