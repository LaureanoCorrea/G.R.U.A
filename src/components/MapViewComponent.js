import React from 'react';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { View, StyleSheet } from 'react-native';

const MapViewComponent = ({
	currentLocation,
	base,
	origin,
	destination,
	route,
}) => {
	// Definir colores para las rutas dependiendo de la dirección
	const getRouteColor = (isBaseToOrigin) => {
		return isBaseToOrigin ? 'red' : 'blue'; // Rojo si es de base a origen, verde si es de origen a destino
	};

	const renderPolyline = (route, isBaseToOrigin) => {
		return (
			<Polyline
				coordinates={route}
				strokeColor={getRouteColor(isBaseToOrigin)}
				strokeWidth={4}
			/>
		);
	};

	const initialRegion = currentLocation || base;

	return (
		<View style={styles.container}>
			<MapView
				style={styles.map}
				initialRegion={{
					latitude: initialRegion?.latitude || -34.3991219, // Si no hay coordenadas, usa un valor por defecto
					longitude: initialRegion?.longitude || -59.0213314, // Si no hay coordenadas, usa un valor por defecto
					latitudeDelta: 0.7, // Controla el zoom en la dirección latitudinal
					longitudeDelta: 0.0421, // Controla el zoom en la dirección longitudinal
				}}
			>
				{currentLocation && (
					<Marker
						coordinate={currentLocation}
						title='Mi Ubicación'
					/>
				)}
				{base && (
					<Marker
						coordinate={base}
						title='Base'
					/>
				)}
				{origin && (
					<Marker
						coordinate={origin}
						title='Origen'
					/>
				)}
				{destination && (
					<Marker
						coordinate={destination}
						title='Destino'
					/>
				)}

				{/* Ruta de origen a destino */}
				{origin &&
					destination &&
					renderPolyline(route.slice(route.length / 2), false)}
				{/* Ruta de base a origen */}
				{base &&
					origin &&
					renderPolyline(route.slice(0, route.length / 2), true)}
			</MapView>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1, // Asegura que el contenedor ocupe todo el espacio disponible
	},
	map: {
		flex: 1, // Asegura que el mapa ocupe todo el contenedor
	},
});

export default MapViewComponent;
