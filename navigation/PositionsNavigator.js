import { createStackNavigator } from '@react-navigation/stack';

import Positions from "../screens/position/Positions";
import PositionsSingle from "../screens/position/PositionsSingle";
import PlayerProfile from "../screens/common/PlayerProfile";

const Stack = createStackNavigator();

export default function PositionStack() {
    return (
        <Stack.Navigator
            initialRouteName={'PositionsInner'}
            screenOptions={{headerShown: false}}>
            <Stack.Screen name="PositionsInner" component={Positions} />
            <Stack.Screen name="PositionsSingle" component={PositionsSingle} />
            <Stack.Screen name="PlayerProfile" component={PlayerProfile} />
        </Stack.Navigator>
    );
}