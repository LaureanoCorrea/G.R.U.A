import {
	StyleSheet,
	Text,
	View,
	Image,
	Modal,
	TouchableOpacity,
} from 'react-native';
import SubmitButton from '../components/SubmitButton';
import * as ImagePicker from 'expo-image-picker';
import { useState, useEffect } from 'react';
import {
	usePatchImageProfileMutation,
	useGetuserQuery,
} from '../services/user';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import LoadingSpinner from '../components/LoadingSpinner';

const ImageSelector = () => {
	const [image, setImage] = useState('');
	const [isModalVisible, setModalVisible] = useState(false);
	const [triggerAddImageProfile] = usePatchImageProfileMutation();
	const localId = useSelector((state) => state.user.localId);
	const navigation = useNavigation();

	const { data: userData, isLoading } = useGetuserQuery({ localId });

	useEffect(() => {
		if (userData?.image) {
			setImage(userData.image);
		}
	}, [userData]);

	const pickImage = async (source) => {
		const permission =
			source === 'camera'
				? await ImagePicker.requestCameraPermissionsAsync()
				: await ImagePicker.requestMediaLibraryPermissionsAsync();

		if (!permission.granted) return;

		const result =
			source === 'camera'
				? await ImagePicker.launchCameraAsync({
						aspect: [1, 1],
						quality: 0.5,
						base64: true,
						allowsEditing: true,
				  })
				: await ImagePicker.launchImageLibraryAsync({
						aspect: [1, 1],
						quality: 0.5,
						base64: true,
						allowsEditing: true,
				  });

		if (!result.canceled) {
			setImage('data:image/jpg;base64,' + result.assets[0].base64);
			setModalVisible(false);
		}
	};

	const confirmImage = () => {
		triggerAddImageProfile({ localId, image });
		navigation.navigate('MyProfile');
	};

	if (isLoading) return <LoadingSpinner />;

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
				onPress={() => setModalVisible(true)}
			/>
			<SubmitButton
				title='Confirmar Imagen'
				onPress={confirmImage}
			/>

			<Modal
				visible={isModalVisible}
				animationType='slide'
				transparent={true}
				onRequestClose={() => setModalVisible(false)}
			>
				<View style={styles.modalOverlay}>
					<View style={styles.modalContent}>
						<Text style={styles.modalTitle}>Seleccionar Imagen</Text>
						<TouchableOpacity
							style={styles.modalOption}
							onPress={() => pickImage('camera')}
						>
							<Text style={styles.modalOptionText}>Cámara</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={styles.modalOption}
							onPress={() => pickImage('gallery')}
						>
							<Text style={styles.modalOptionText}>Galería</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={styles.modalCancel}
							onPress={() => setModalVisible(false)}
						>
							<Text style={styles.modalCancelText}>Cancelar</Text>
						</TouchableOpacity>
					</View>
				</View>
			</Modal>
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
		width: '100%',
		height: '100%',
	},
	title: {
		fontSize: 24,
		fontWeight: 'bold',
		textAlign: 'center',
		marginBottom: 16,
	},
	modalOverlay: {
		flex: 1,
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
		justifyContent: 'center',
		alignItems: 'center',
	},
	modalContent: {
		width: '80%',
		backgroundColor: '#fff',
		borderRadius: 10,
		padding: 20,
		alignItems: 'center',
	},
	modalTitle: {
		fontSize: 20,
		fontWeight: 'bold',
		marginBottom: 16,
	},
	modalOption: {
		width: '100%',
		padding: 15,
		backgroundColor: '#2196F3',
		borderRadius: 10,
		marginVertical: 10,
		alignItems: 'center',
	},
	modalOptionText: {
		color: '#fff',
		fontSize: 16,
		fontWeight: 'bold',
	},
	modalCancel: {
		marginTop: 10,
	},
	modalCancelText: {
		color: '#f00',
		fontSize: 16,
	},
});

export default ImageSelector;
