import { createStackNavigator } from '@react-navigation/stack';

import UserProfile from "../screens/profile/UserProfile";
import EditProfile from "../screens/profile/EditProfile";
import ContactUs from "../screens/profile/ContactUs";
import ChangePassword from "../screens/profile/ChangePassword";

const Stack = createStackNavigator();

export default function ProfileStack() {
    return (
        <Stack.Navigator
            initialRouteName={'UserProfile'}
            screenOptions={{headerShown: false}}>
            <Stack.Screen name="UserProfile" component={UserProfile} />
            <Stack.Screen name="EditProfile" component={EditProfile} />
            <Stack.Screen name="ContactUs" component={ContactUs} />
            <Stack.Screen name="ChangePassword" component={ChangePassword} />
        </Stack.Navigator>
    );
}