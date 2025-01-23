import { object, string } from 'yup';

export const loginSchema = object({
	password: string()
		.min(8, 'La contraseña debe contener al menos 8 caracteres')
		.matches(
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
			'La contraseña debe contener al menos una letra mayúscula, una minúscula y un número'
		)
		.required('La contraseña es obligatoria'),

	email: string()
		.email('El Email no es válido')
		.required('El Email es requerido'),
});
