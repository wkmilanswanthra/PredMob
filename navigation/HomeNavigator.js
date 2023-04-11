import { createStackNavigator } from '@react-navigation/stack';

import Home from '../screens/discover/Home';
import BestChoices from "../screens/discover/BestChoices";
import BestChoice from "../screens/discover/BestChoicesIndividual";
import BestChoicePlayerProfile from "../screens/discover/BestChoicePlayerProfile";
import UnderAveragePLayers from "../screens/discover/UnderAveragePlayers";
import PlayerProfile from "../screens/common/PlayerProfile";
import UnderAveragePlayerIndividual from "../screens/discover/UnderAveragePlayerIndividual";

const Stack = createStackNavigator();

export default function HomeStack() {
    console.log('HomeStack.js: ')
    return (
        <Stack.Navigator
        initialRouteName={'Home'}
        screenOptions={{headerShown: false}}>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="BestChoices" component={BestChoices} />
            <Stack.Screen name="BestChoice" component={BestChoice} />
            <Stack.Screen name="BestChoicePlayerProfile" component={BestChoicePlayerProfile} />
            <Stack.Screen name="UnderAveragePLayers" component={UnderAveragePLayers} />
            <Stack.Screen name="UnderAveragePlayerIndividual" component={UnderAveragePlayerIndividual} />
            <Stack.Screen name="PlayerProfile" component={PlayerProfile} />
        </Stack.Navigator>
    );
}