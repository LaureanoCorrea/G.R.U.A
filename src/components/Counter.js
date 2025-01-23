import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
	decrement,
	increment,
	incrementByAmount,
} from '../features/CounterSlice';

const Counter = () => {
	const [input, setInput] = useState(0);
	const counter = useSelector((state) => state.counter.value);
	const dispatch = useDispatch();

	return (
		<View>
			<Button
				title='-1'
				onPress={() => dispatch(decrement())}
			/>
			<Text>{counter}</Text>
			<Button
				title='+1'
				onPress={() => dispatch(increment())}
			/>
			<TextInput
				value={input}
				onChangeText={(t) => setInput(parseInt(t))}
			/>
			<Button
				title='Cambiar'
				onPress={() => dispatch(incrementByAmount(input))}
			/>
		</View>
	);
};

export default Counter;

const styles = StyleSheet.create({});
