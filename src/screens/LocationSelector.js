import { StyleSheet, Text, View } from 'react-native';
import SubmitButton from '../components/SubmitButton';
import MapPreview from '../components/MapPreview';
import { useEffect, useState } from 'react';
import * as Location from 'expo-location';
import { googleApi } from '../googleApi';
import { useSelector } from 'react-redux';
import { usePatchLocationMutation } from '../services/user';
import { useNavigation } from '@react-navigation/native';

const LocationSelector = () => {
	const navigation = useNavigation();
	const localId = useSelector((state) => state.user.localId);
	const [triggerLocation] = usePatchLocationMutation();
	const [address, setAddress] = useState('');
	const [location, setLocation] = useState({
		lat: '',
		lng: '',
	});

	useEffect(() => {
		(async () => {
			try {
				const { status } = await Location.requestForegroundPermissionsAsync();
				if (status !== 'granted') {
					console.error('Permisos de ubicación denegados');
					return;
				}

				const newLocation = await Location.getCurrentPositionAsync();

				setLocation({
					lat: newLocation.coords.latitude,
					lng: newLocation.coords.longitude,
				});
			} catch (error) {
				console.log('Error al obtener la ubicación', error);
			}
		})();
	}, []);

	useEffect(() => {
		(async () => {
			if (location.lat) {
				const urlReverseGeocoding = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.lat},${location.lng}&key=${googleApi}`;
				try {
					const response = await fetch(urlReverseGeocoding);
					const data = await response.json();
					setAddress(data.results[0].formatted_address);
				} catch (error) {
					console.error('Error al obtener la dirección');
				}
			}
		})();
	}, [location]);

	const handleSelectLocation = () => {
		triggerLocation({ localId, address, location });
		navigation.navigate('MyProfile');
	};

	return (
		<View style={styles.container}>
			<Text>Selecciona Ubicación: {address}</Text>
			<MapPreview location={location} />
			<SubmitButton
				title='Seleccionar Ubicación'
				onPress={handleSelectLocation}
			/>
		</View>
	);
};

export default LocationSelector;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#fff',
		gap: 16,
	},
});
