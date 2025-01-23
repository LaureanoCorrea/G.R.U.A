import { StyleSheet, View } from 'react-native';

const ShadowCard = ({ children, style }) => {
	return <View style={[styles.container, style]}>{children}</View>;
};

export default ShadowCard;

const styles = StyleSheet.create({
	container: {
		elevation: 15,
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
	},
});
