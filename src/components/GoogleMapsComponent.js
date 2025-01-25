import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { googleApi } from '../googleApi';
import MapViewComponent from './MapViewComponent';
import InputsBaseDomain from './InputsBaseDomain';
import InputsOriginDestination from './InputsOriginDestination';
import SuggestionsList from './SuggestionsList';

const GoogleMapsComponent = () => {
	const [base, setBase] = useState(null);
	const [origin, setOrigin] = useState(null);
	const [destination, setDestination] = useState(null);
	const [route, setRoute] = useState([]);
	const [inputValues, setInputValues] = useState({
		base: '',
		domain: '',
	});
	const [suggestions, setSuggestions] = useState([]);
	const [focusedField, setFocusedField] = useState(null);
	const [currentLocation, setCurrentLocation] = useState(null);
	const [isJourneyActive, setIsJourneyActive] = useState(false);
	const [isBaseAndDomainSet, setIsBaseAndDomainSet] = useState(false);

	const GOOGLE_API_KEY = googleApi;

	useEffect(() => {
		// Verificar permisos y obtener la ubicación actual
		const getCurrentLocation = async () => {
			navigator.geolocation.getCurrentPosition(
				(position) => {
					const { latitude, longitude } = position.coords;
					setCurrentLocation({ latitude, longitude });
					setOrigin({ latitude, longitude });
				},
				(error) => Alert.alert('Error', error.message),
				{ enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
			);
		};
		getCurrentLocation();
	}, []);

	const handleInputChange = async (field, value) => {
		setInputValues((prev) => ({ ...prev, [field]: value }));
		setFocusedField(field);

		if (field === 'domain') return; // No buscar sugerencias si el campo es dominio

		if (value.length > 2) {
			try {
				const response = await axios.get(
					`https://maps.googleapis.com/maps/api/place/autocomplete/json`,
					{
						params: {
							input: value,
							key: GOOGLE_API_KEY,
						},
					}
				);
				if (response.data.predictions) {
					setSuggestions(response.data.predictions);
				}
			} catch (error) {
				console.error('Error fetching suggestions:', error);
			}
		} else {
			setSuggestions([]);
		}
	};

	const selectSuggestion = async (description) => {
		setInputValues((prev) => ({ ...prev, [focusedField]: description }));
		setSuggestions([]);

		try {
			const response = await axios.get(
				`https://maps.googleapis.com/maps/api/geocode/json`,
				{
					params: {
						address: description,
						key: GOOGLE_API_KEY,
					},
				}
			);

			if (response.data.results.length > 0) {
				const { lat, lng } = response.data.results[0].geometry.location;
				const coordinates = { latitude: lat, longitude: lng };

				if (focusedField === 'base') setBase(coordinates);
				else if (focusedField === 'origin') setOrigin(coordinates);
				else if (focusedField === 'destination') setDestination(coordinates);
			}
		} catch (error) {
			console.error('Error fetching coordinates:', error);
		}
	};

	const handleBaseAndDomainSet = () => {
		if (!inputValues.base || !inputValues.domain) {
			Alert.alert('Error', 'Debes definir la base y el dominio primero.');
			return;
		}

		setIsBaseAndDomainSet(true);
	};

	const fetchRoute = async () => {
		if (!base || !origin || !destination) {
			Alert.alert('Error', 'Primero debes definir la base, origen y destino.');
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
				Alert.alert('Error', 'No se encontró una ruta válida.');
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

			setIsJourneyActive(true); // Iniciar el viaje

			Alert.alert('Ruta generada', 'Se ha trazado la ruta correctamente.');
		} catch (error) {
			console.error('Error fetching route:', error);
			Alert.alert(
				'Error',
				'Hubo un problema al obtener la ruta. Por favor, verifica tu conexión a Internet o intenta nuevamente.'
			);
		}
	};

	const cancelJourney = () => {
		Alert.alert(
			'Cancelar Viaje',
			'¿Estás seguro que deseas cancelar el viaje?',
			[
				{ text: 'No' },
				{
					text: 'Sí',
					onPress: () => {
						setIsJourneyActive(false); // Cancelar el viaje
						setRoute([]); // Limpiar la ruta
						setBase(null); // Limpiar la base
						setOrigin(null); // Limpiar origen
						setDestination(null); // Limpiar destino
						setInputValues({ base: '', domain: '' }); // Limpiar inputs
						setIsBaseAndDomainSet(false); // Reiniciar la configuración de base y dominio
					},
				},
			]
		);
	};

	const decodePolyline = (encoded) => {
		let points = [];
		let index = 0,
			len = encoded.length;
		let lat = 0,
			lng = 0;

		while (index < len) {
			let b,
				shift = 0,
				result = 0;
			do {
				b = encoded.charCodeAt(index++) - 63;
				result |= (b & 0x1f) << shift;
				shift += 5;
			} while (b >= 0x20);
			let dlat = result & 1 ? ~(result >> 1) : result >> 1;
			lat += dlat;

			shift = 0;
			result = 0;
			do {
				b = encoded.charCodeAt(index++) - 63;
				result |= (b & 0x1f) << shift;
				shift += 5;
			} while (b >= 0x20);
			let dlng = result & 1 ? ~(result >> 1) : result >> 1;
			lng += dlng;

			points.push({
				latitude: lat / 1e5,
				longitude: lng / 1e5,
			});
		}

		return points;
	};

	return (
		<View style={styles.container}>
			{/* Inputs para la base y el dominio */}
			{!isBaseAndDomainSet && (
				<InputsBaseDomain
					inputValues={inputValues}
					handleInputChange={handleInputChange}
					handleBaseAndDomainSet={handleBaseAndDomainSet}
				/>
			)}

			{/* Inputs para origen y destino */}
			{isBaseAndDomainSet && !isJourneyActive && (
				<InputsOriginDestination
					inputValues={inputValues}
					handleInputChange={handleInputChange}
					fetchRoute={fetchRoute}
				/>
			)}

			{/* Mostrar las sugerencias de autocompletar debajo de los inputs */}
			<SuggestionsList
				suggestions={suggestions}
				focusedField={focusedField}
				selectSuggestion={selectSuggestion}
			/>

			{/* Map View */}
			<MapViewComponent
				currentLocation={currentLocation}
				base={base}
				origin={origin}
				destination={destination}
				route={route}
			/>

			{/* Botón para cancelar viaje */}
			{isJourneyActive && (
				<TouchableOpacity
					style={[styles.button, styles.cancelButton]}
					onPress={cancelJourney}
				>
					<Text style={styles.buttonText}>Cancelar Viaje</Text>
				</TouchableOpacity>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'flex-end',
	},
	button: {
		marginTop: 20,
		backgroundColor: '#007BFF',
		paddingVertical: 10,
		paddingHorizontal: 20,
		borderRadius: 5,
	},
	buttonText: {
		color: '#fff',
		fontSize: 16,
	},
	cancelButton: {
		backgroundColor: '#dc3545',
	},
});

export default GoogleMapsComponent;
