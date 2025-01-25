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
		? 'Cambia tu Base'
		: 'Agrega tu Base';

	return (
		<View style={styles.container}>
			<View style={styles.profileSection}>
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
					style={styles.profileButton}
				/>
			</View>

			<View style={styles.locationSection}>
				<View style={styles.addressContainer}>
					<Text style={styles.addressLabel}>Dirección:</Text>
					<Text style={styles.addressText}>
						{data?.address || 'No definida'}
					</Text>
				</View>
				<SubmitButton
					title={locationButtonText}
					onPress={() => navigation.navigate('LocationSelector')}
					style={styles.locationButton}
				/>
			</View>
			<View style={styles.startTravel}>
				<SubmitButton
					title='StartTravel'
					onPress={() => navigation.navigate('StartTravel')}
					style={styles.startTravelButton}
				/>
			</View>
		</View>
	);
};

export default ProfileScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		backgroundColor: '#fff',
		padding: 20,
	},
	profileSection: {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 20,
	},
	imageContainer: {
		width: 150,
		height: 150,
		borderRadius: 90,
		overflow: 'hidden',
		marginRight: 20,
	},
	image: {
		width: '100%',
		height: '100%',
	},
	profileButton: {
		flex: 1,
	},
	locationSection: {
		flexDirection: 'row',
		alignItems: 'flex-start',
		width: '100%',
		marginTop: 20,
	},
	addressContainer: {
		flex: 1,
	},
	addressLabel: {
		fontSize: 18,
		fontWeight: 'bold',
		marginBottom: 4,
	},
	addressText: {
		fontSize: 16,
		color: '#666',
		flexWrap: 'wrap',
	},
	locationButton: {
		marginLeft: 20,
	},
	startTravel: {
		marginTop: 20,
	},
	startTravelButton: {
		width: '100%',
	},
});
