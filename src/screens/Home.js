import { StyleSheet, View } from 'react-native';
import Categories from '../components/Categories';
import colors from '../globals/colors';
import ErrorBoundary from '../ErrorBoundary';

const Home = () => {
	return (
		<ErrorBoundary>
			<View style={styles.container}>
				<Categories />
			</View>
		</ErrorBoundary>
	);
};

export default Home;

const styles = StyleSheet.create({
	container: {
		backgroundColor: colors.lightGray,
		alignItems: 'center',
		justifyContent: 'center',
	},
});
