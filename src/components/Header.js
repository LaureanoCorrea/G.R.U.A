import { Pressable, StyleSheet, Text, View } from 'react-native';
import colors from '../globals/colors';
import GoBack from './GoBack';
import { useNavigation, useRoute } from '@react-navigation/native';
import ErrorBoundary from '../ErrorBoundary';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useDispatch } from 'react-redux';
import { deleteSession } from '../config/dbSqlite';
import { deleteUser } from '../features/userSlice';

const Header = ({ title }) => {
	const navigate = useNavigation();
	const route = useRoute();
	const dispatch = useDispatch();

	const onLogout = () => {
		deleteSession();
		dispatch(deleteUser());
	};

	const noGoBackRoutes = ['Home', 'MainCart', 'OrderScreen', 'MyProfile'];

	return (
		<ErrorBoundary>
			<View style={styles.container}>
				{!noGoBackRoutes.includes(route.name) && navigate.canGoBack() ? (
					<GoBack />
				) : null}
				<Text style={styles.title}>{title}</Text>
				<Pressable
					styles={styles.logout}
					onPress={onLogout}
				>
					<AntDesign
						name='logout'
						size={24}
						color={colors.error}
					/>
				</Pressable>
			</View>
		</ErrorBoundary>
	);
};

export default Header;

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		backgroundColor: colors.primary,
		height: 60,
		alignItems: 'center',
		justifyContent: 'center',
		position: 'relative',
	},
	title: {
		width: '75%',
		color: colors.darkGray,
		fontSize: 18,
		fontFamily: 'Josefin',
		textAlign: 'center',
	},
	logout: {
		position: 'absolute',
		right: 5,
	},
});
