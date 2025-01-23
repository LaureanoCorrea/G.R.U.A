import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet } from 'react-native';
import TabNavigator from './TabNavigator.js';
import AuthStack from './AuthStack.js';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSession, init } from '../config/dbSqlite.js';
import { useEffect } from 'react';
import { setUser } from '../features/userSlice.js';

const Navigator = () => {
	const idToken = useSelector((state) => state.user.idToken);
	const dispatch = useDispatch();

	useEffect(() => {
		(async () => {
			await init();
			const sessionUser = await fetchSession();
			if (sessionUser) {
				dispatch(setUser(sessionUser));
			}
		})();
	}, []);

	return (
		<NavigationContainer>
			{idToken ? <TabNavigator /> : <AuthStack />}
		</NavigationContainer>
	);
};

const styles = StyleSheet.create({});

export default Navigator;
