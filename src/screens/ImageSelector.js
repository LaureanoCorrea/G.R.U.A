import { StyleSheet, Text, View, Image, Alert } from 'react-native';
import SubmitButton from '../components/SubmitButton';
import * as ImagePicker from 'expo-image-picker';
import { useState, useEffect } from 'react';
import {
	usePatchImageProfileMutation,
	useGetuserQuery,
} from '../services/user';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

const ImageSelector = () => {
	const [image, setImage] = useState('');
	const [triggerAddImageProfile] = usePatchImageProfileMutation();
	const localId = useSelector((state) => state.user.localId);
	const navigation = useNavigation();

	const { data: userData, isLoading } = useGetuserQuery({ localId });

	useEffect(() => {
		if (userData?.image) {
			setImage(userData.image);
		}
	}, [userData]);
	const handleImageOption = async () => {
		Alert.alert(
			'Seleccionar Imagen',
			'¿Qué opción prefieres?',
			[
				{ text: 'Cancelar', style: 'cancel' },
				{ text: 'Cámara', onPress: pickFromCamera },
				{ text: 'Galería', onPress: pickFromGallery },
			],
			{ cancelable: true }
		);
	};

	const pickFromCamera = async () => {
		const { granted } = await ImagePicker.requestCameraPermissionsAsync();
		if (!granted) return;
		const result = await ImagePicker.launchCameraAsync({
			aspect: [1, 1],
			quality: 0.5,
			base64: true,
			allowsEditing: true,
		});
		if (!result.canceled) {
			setImage('data:image/jpg;base64,' + result.assets[0].base64);
		}
	};

	const pickFromGallery = async () => {
		const { granted } = await ImagePicker.requestMediaLibraryPermissionsAsync();
		if (!granted) return;
		const result = await ImagePicker.launchImageLibraryAsync({
			aspect: [1, 1],
			quality: 0.5,
			base64: true,
			allowsEditing: true,
		});
		if (!result.canceled) {
			setImage('data:image/jpg;base64,' + result.assets[0].base64);
		}
	};

	const confirmImage = () => {
		triggerAddImageProfile({ localId, image });
		navigation.navigate('MyProfile');
	};

	if (isLoading) {
		return (
			<View style={styles.container}>
				<Text>Cargando...</Text>
			</View>
		);
	}

	return (
		<View style={styles.container}>
			<Text style={styles.title}>
				{image ? 'Cambia tu imagen de perfil' : 'Agrega una imagen de perfil'}
			</Text>
			<View style={styles.imageContainer}>
				<Image
					source={
						image ? { uri: image } : require('../../assets/profile_default.png')
					}
					resizeMode='contain'
					style={styles.image}
				/>
			</View>
			<SubmitButton
				title={image ? 'Cambiar Imagen' : 'Agregar Imagen'}
				onPress={handleImageOption}
			/>
			<SubmitButton
				title='Confirmar Imagen'
				onPress={confirmImage}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#fff',
	},
	imageContainer: {
		width: 180,
		height: 180,
		borderRadius: 90,
		overflow: 'hidden',
	},
	image: {
		width: 180,
		height: 180,
		marginBottom: 16,
	},
	title: {
		fontSize: 24,
		fontWeight: 'bold',
		textAlign: 'center',
		marginBottom: 16,
	},
});

export default ImageSelector;
