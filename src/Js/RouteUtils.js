import axios from 'axios';
import { googleApi } from '../googleApi';
import { decodePolyline } from './utils';

const GOOGLE_API_KEY = googleApi;

export const fetchRoute = async (
	base,
	origin,
	destination,
	setRoute,
	setIsJourneyActive
) => {
	if (!base || !origin || !destination) {
		alert('Error', 'Primero debes definir la base, origen y destino.');
		return;
	}

	const baseLatLng = `${base.latitude},${base.longitude}`;
	const originLatLng = `${origin.latitude},${origin.longitude}`;
	const destinationLatLng = `${destination.latitude},${destination.longitude}`;

	try {
		const firstLegResponse = await axios.get(
			`https://maps.googleapis.com/maps/api/directions/json`,
			{
				params: {
					origin: baseLatLng,
					destination: originLatLng,
					key: GOOGLE_API_KEY,
				},
			}
		);

		const secondLegResponse = await axios.get(
			`https://maps.googleapis.com/maps/api/directions/json`,
			{
				params: {
					origin: originLatLng,
					destination: destinationLatLng,
					key: GOOGLE_API_KEY,
				},
			}
		);

		if (
			firstLegResponse.data.routes.length === 0 ||
			secondLegResponse.data.routes.length === 0
		) {
			alert('Error', 'No se encontró una ruta válida.');
			return;
		}

		const firstLegPoints =
			firstLegResponse.data.routes[0].overview_polyline.points;
		const secondLegPoints =
			secondLegResponse.data.routes[0].overview_polyline.points;

		const decodedFirstLeg = decodePolyline(firstLegPoints);
		const decodedSecondLeg = decodePolyline(secondLegPoints);

		const fullRoute = [...decodedFirstLeg, ...decodedSecondLeg];
		setRoute(fullRoute);
		setIsJourneyActive(true);

		alert('Ruta generada', 'Se ha trazado la ruta correctamente.');
	} catch (error) {
		console.error('Error fetching route:', error);
		alert(
			'Error',
			'Hubo un problema al obtener la ruta. Por favor, verifica tu conexión a Internet o intenta nuevamente.'
		);
	}
};
