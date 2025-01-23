import { View, Text, StyleSheet, Image } from 'react-native';
import SubmitButton from '../components/SubmitButton';
import { useNavigation } from '@react-navigation/native';
import { useGetuserQuery } from '../services/user';
import { useSelector } from 'react-redux';

const ProfileScreen = () => {
	const navigation = useNavigation();
	const localId = useSelector((state) => state.user.localId);
	const { data } = useGetuserQuery({ localId });

	const profileButtonText = data?.image
		? 'Cambia tu foto de perfil'
		: 'Agrega tu foto de perfil';

	const locationButtonText = data?.address
		? 'Cambia tu localización'
		: 'Agrega tu localización';

	return (
		<View style={styles.container}>
			<View style={styles.imageContainer}>
				<Image
					source={
						data?.image
							? { uri: data.image }
							: require('../../assets/profile_default.png')
					}
					resizeMode='contain'
					style={styles.image}
				/>
			</View>
			<SubmitButton
				title={profileButtonText}
				onPress={() => navigation.navigate('ImageSelector')}
			/>
			<SubmitButton
				title={locationButtonText}
				onPress={() => navigation.navigate('LocationSelector')}
			/>
			<View>
				<Text style={styles.address}>
					Dirección: {data?.address || 'No definida'}
				</Text>
			</View>
		</View>
	);
};

export default ProfileScreen;

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
		marginBottom: 16,
	},
	image: {
		width: 180,
		height: 180,
	},
	title: {
		fontSize: 24,
		fontWeight: 'bold',
	},
	address: {
		fontSize: 18,
		marginTop: 16,
	},
});
