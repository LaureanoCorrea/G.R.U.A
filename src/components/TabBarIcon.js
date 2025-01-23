import { StyleSheet, Text, View } from 'react-native';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import colors from '../globals/colors';
import ErrorBoundary from '../ErrorBoundary';

const TabBarIcon = ({ text, icon }) => {
	return (
		<ErrorBoundary>
			<View style={styles.container}>
				<FontAwesome6
					name={icon}
					size={24}
					color={colors.white}
				/>
				<Text style={styles.text}>{text}</Text>
			</View>
		</ErrorBoundary>
	);
};

export default TabBarIcon;

const styles = StyleSheet.create({
	container: {
		position: 'relative',
		alignContent: 'center',
		width: 60,
		alignItems: 'center',
	},
	text: {
		color: colors.white,
	},
});
