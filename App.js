import { NavigationContainer } from "@react-navigation/native";
import DrawerNavigator from "./src/navigation/DrawerNavigator";
import { UserTypeProvider } from "./src/hooks/UserTypeContext";

export default function App() {
  return (
    <UserTypeProvider>
      <NavigationContainer>
        <DrawerNavigator />
      </NavigationContainer>
    </UserTypeProvider>
  );
}
