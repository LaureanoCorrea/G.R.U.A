import { Image, StyleSheet, View } from 'react-native';
import { googleApi } from '../googleApi';

const MapPreview = ({ location }) => {
	const mapStaticUrl =
		`https://maps.googleapis.com/maps/api/staticmap?center=${location.lat},${location.lng}&zoom=14&size=600x300&maptype=roadmap&markers=color:red%7Clabel:A%7C${location.lat},${location.lng}&key=${googleApi}`.trim();

	return (
		<View>
			<Image
				source={location.lat && { uri: mapStaticUrl }}
				style={styles.mapImage}
			/>
		</View>
	);
};

export default MapPreview;

const styles = StyleSheet.create({
	mapImage: {
		width: 300,
		height: 400,
	},
});
