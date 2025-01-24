import { StatusBar } from 'react-native';
import colors from './src/globals/colors';
import { useFonts } from 'expo-font';
import fonts from './src/globals/fonts';
import Navigator from './src/Navigation/Navigator';
import { Provider } from 'react-redux';
import store from './src/store';

export default function App() {
	const [fontsLoaded] = useFonts(fonts);

	if (!fontsLoaded) {
		return null;
	}

	return (
		<>
			<Provider store={store}>
				<Navigator />
			</Provider>
			<StatusBar
				style='auto'
				backgroundColor={colors.secondary}
			/>
		</>
	);
}
