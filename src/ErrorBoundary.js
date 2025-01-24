import { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';

class ErrorBoundary extends Component {
	state = {
		hasError: false,
		errorInfo: null,
	};

	static getDerivedStateFromError(error) {
		return { hasError: true };
	}

	componentDidCatch(error, errorInfo) {
		console.log('Error:', error);
		console.log('Detalles del error:', errorInfo);
		this.setState({ errorInfo });
	}

	render() {
		if (this.state.hasError) {
			return (
				<View style={styles.errorContainer}>
					<Text style={styles.errorMessage}>Oops! Algo salió mal.</Text>
					<Text style={styles.errorDetails}>
						{this.state.errorInfo && this.state.errorInfo.componentStack}
					</Text>
				</View>
			);
		}

		return this.props.children;
	}
}

const styles = StyleSheet.create({
	errorContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		padding: 20,
	},
	errorMessage: {
		fontSize: 18,
		color: 'red',
		fontWeight: 'bold',
	},
	errorDetails: {
		fontSize: 14,
		color: 'gray',
		marginTop: 10,
	},
});

export default ErrorBoundary;
