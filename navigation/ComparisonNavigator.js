import { createStackNavigator } from '@react-navigation/stack';


import PlayerComparison from "../screens/compare/PlayerComparison";
import playerComparisonSelect from "../screens/compare/PlayerComparisonSelect";

const Stack = createStackNavigator();

export default function ComparisonStack() {
    return (
        <Stack.Navigator
            initialRouteName={'PlayerComparison'}
            screenOptions={{headerShown: false}}>
            <Stack.Screen name="PlayerComparison" component={PlayerComparison} />
            <Stack.Screen name="playerComparisonSelect" component={playerComparisonSelect} />
        </Stack.Navigator>
    );
}