export default function validate(formValues) {
	const errors = {};

	if (!formValues.name || !formValues.name.trim()) {
		errors.name = "Debe ingresar un nombre";
	} else {
		const nombreRegex =
			/^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?\sáéíóúÁÉÍÓÚñÑüÜ]*$/;
		if (!nombreRegex.test(formValues.name)) {
			errors.name = "El nombre no puede contener números ni espacios";
		}
	}

	if (!formValues.role || !formValues.role.trim()) {
		errors.role = "Debe ingresar un rol";
	} else {
		const allowedCategories = [
			"Diseñador",
			"Desarrollador",
			"Cocinero",
			"Mesero",
			"Limpieza",
		];
		if (!allowedCategories.includes(formValues.role)) {
			errors.role = "El rol elegido no es válido";
		}
	}

	if (formValues.description && formValues.description.length > 50) {
		errors.description = "La descripción no puede ser mayor a 50 caracteres";
	}

	if (!formValues.skills || formValues.skills.length === 0) {
		errors.skills = "Debe seleccionar al menos una habilidad.";
	} else {
		const tecnologiasPermitidas = [
			"JavaScript",
			"React",
			"Node.js",
			"Python",
			"UI/UX",
			"Agile",
		];

		const tecnologiasInvalidas = formValues.skills.filter(
			(skill) => !tecnologiasPermitidas.includes(skill)
		);

		if (tecnologiasInvalidas.length > 0) {
			errors.skills = `Las tecnologías seleccionadas no son válidas: ${tecnologiasInvalidas.join(
				", "
			)}`;
		}
	}

	return errors;
}
