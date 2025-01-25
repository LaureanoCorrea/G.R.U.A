import React, { useState, useEffect } from 'react';
import { View, Alert, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { googleApi } from '../googleApi';
import axios from 'axios';
import InputsBaseDomain from '../components/InputsBaseDomain';
import InputsOriginDestination from '../components/InputsOriginDestination';
import SuggestionsList from '../components/SuggestionsList';
import MapViewComponent from '../components/MapViewComponent';
import { fetchRoute } from '../Js/RouteUtils';

const StartTravel = () => {
	const [base, setBase] = useState(null);
	const [baseAddress, setBaseAddress] = useState('');
	const [domain, setDomain] = useState('');
	const [origin, setOrigin] = useState(null);
	const [destination, setDestination] = useState(null);
	const [route, setRoute] = useState([]);
	const [inputValues, setInputValues] = useState({
		base: '',
		domain: '',
		origin: '',
		destination: '',
	});
	const [suggestions, setSuggestions] = useState([]);
	const [focusedField, setFocusedField] = useState(null);
	const [currentLocation, setCurrentLocation] = useState(null);
	const [isJourneyActive, setIsJourneyActive] = useState(false);
	const [isBaseAndDomainSet, setIsBaseAndDomainSet] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const GOOGLE_API_KEY = googleApi;

	// Obtener la ubicación actual
	useEffect(() => {
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

	useEffect(() => {
		if (base) {
			const fetchBaseAddress = async () => {
				try {
					const response = await axios.get(
						`https://maps.googleapis.com/maps/api/geocode/json`,
						{
							params: {
								latlng: `${base.latitude},${base.longitude}`,
								key: GOOGLE_API_KEY,
							},
						}
					);

					if (response.data.results.length > 0) {
						const address = response.data.results[0].formatted_address;
						setBaseAddress(address);
					} else {
						setBaseAddress('Dirección no disponible');
					}
				} catch (error) {
					console.error('Error al obtener la dirección de la base:', error);
					setBaseAddress('Error al obtener la dirección');
				}
			};

			fetchBaseAddress();
		}
	}, [base]);

	// Manejar cambios en los inputs
	const handleInputChange = async (field, value) => {
		setInputValues((prev) => ({ ...prev, [field]: value }));
		setFocusedField(field);

		if (field === 'domain') return;

		if (value.length > 2) {
			setIsLoading(true);
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
			} finally {
				setIsLoading(false);
			}
		} else {
			setSuggestions([]);
		}
	};

	// Seleccionar una sugerencia
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

	// Setear base y dominio
	const handleBaseAndDomainSet = () => {
		if (!inputValues.base || !inputValues.domain) {
			Alert.alert('Error', 'Debes definir la base y el dominio primero.');
			return;
		}
		setDomain(inputValues.domain);
		setIsBaseAndDomainSet(true);
	};

	// Obtener la ruta
	const handleFetchRoute = () => {
		fetchRoute(base, origin, destination, setRoute, setIsJourneyActive); // Llamada a la función externa
	};

	// const fetchRoute = async () => {
	// 	if (!base || !origin || !destination) {
	// 		Alert.alert('Error', 'Primero debes definir la base, origen y destino.');
	// 		return;
	// 	}

	// 	const baseLatLng = `${base.latitude},${base.longitude}`;
	// 	const originLatLng = `${origin.latitude},${origin.longitude}`;
	// 	const destinationLatLng = `${destination.latitude},${destination.longitude}`;

	// 	try {
	// 		const firstLegResponse = await axios.get(
	// 			`https://maps.googleapis.com/maps/api/directions/json`,
	// 			{
	// 				params: {
	// 					origin: baseLatLng,
	// 					destination: originLatLng,
	// 					key: GOOGLE_API_KEY,
	// 				},
	// 			}
	// 		);

	// 		const secondLegResponse = await axios.get(
	// 			`https://maps.googleapis.com/maps/api/directions/json`,
	// 			{
	// 				params: {
	// 					origin: originLatLng,
	// 					destination: destinationLatLng,
	// 					key: GOOGLE_API_KEY,
	// 				},
	// 			}
	// 		);

	// 		if (
	// 			firstLegResponse.data.routes.length === 0 ||
	// 			secondLegResponse.data.routes.length === 0
	// 		) {
	// 			Alert.alert('Error', 'No se encontró una ruta válida.');
	// 			return;
	// 		}

	// 		const firstLegPoints =
	// 			firstLegResponse.data.routes[0].overview_polyline.points;
	// 		const secondLegPoints =
	// 			secondLegResponse.data.routes[0].overview_polyline.points;

	// 		const decodedFirstLeg = decodePolyline(firstLegPoints);
	// 		const decodedSecondLeg = decodePolyline(secondLegPoints);

	// 		const fullRoute = [...decodedFirstLeg, ...decodedSecondLeg];
	// 		setRoute(fullRoute);
	// 		setIsJourneyActive(true);

	// 		Alert.alert('Ruta generada', 'Se ha trazado la ruta correctamente.');
	// 	} catch (error) {
	// 		console.error('Error fetching route:', error);
	// 		Alert.alert(
	// 			'Error',
	// 			'Hubo un problema al obtener la ruta. Por favor, verifica tu conexión a Internet o intenta nuevamente.'
	// 		);
	// 	}
	// };

	// Cancelar el viaje
	const cancelJourney = () => {
		Alert.alert(
			'Cancelar Viaje',
			'¿Estás seguro que deseas cancelar el viaje?',
			[
				{ text: 'No' },
				{
					text: 'Sí',
					onPress: () => {
						setIsJourneyActive(false);
						setRoute([]);
						setBase(null);
						setOrigin(null);
						setDestination(null);
						setInputValues({ base: '', domain: '' });
						setIsBaseAndDomainSet(false);
					},
				},
			]
		);
	};

	return (
		<View style={styles.container}>
			{/* Componente para mostrar base y dominio */}
			{isBaseAndDomainSet && (
				<View style={styles.baseDomainContainer}>
					<Text style={styles.baseText}>Base: {baseAddress}</Text>
					<Text style={styles.domainText}>Dominio: {domain}</Text>
				</View>
			)}
			{/* Componente de mapa */}
			<MapViewComponent
				currentLocation={currentLocation}
				base={base}
				origin={origin}
				destination={destination}
				route={route}
			/>
			{/* Inputs para la base y dominio */}
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
					fetchRoute={handleFetchRoute}
				/>
			)}

			{/* Botón para cancelar viaje */}
			{isJourneyActive && (
				<TouchableOpacity
					style={styles.cancelButton}
					onPress={cancelJourney}
				>
					<Text style={styles.buttonText}>Cancelar Viaje</Text>
				</TouchableOpacity>
			)}

			{/* Lista de sugerencias */}
			<SuggestionsList
				suggestions={suggestions}
				focusedField={focusedField}
				selectSuggestion={selectSuggestion}
				isLoading={isLoading}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		borderWidth: 4,
		borderColor: 'blue',
		overflow: 'visible',
		marginBottom: 50,
	},
	cancelButton: {
		backgroundColor: 'red',
		padding: 10,
		borderRadius: 5,
		position: 'absolute', // Se fija sobre la pantalla
		bottom: 20, // Asegura que esté en la parte inferior
		right: 20, // Asegura que esté en la parte derecha
		zIndex: 10, // Asegura que esté por encima de otros elementos
	},
	buttonText: {
		color: 'white',
		fontWeight: 'bold',
		textAlign: 'center',
	},
});

export default StartTravel;
