import * as React from 'react';
import { ScrollView, StyleSheet, Button, Text, TextInput, View, Image, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Card } from 'react-native-paper';
import { DefaultTheme } from 'react-native-paper';
import LocationLog from "./components/LocationLog";
import ScanQRScreen5 from "./components/ScanQRScreen5";

const AuthContext = React.createContext();

function SplashScreen() {
  return (
    <View>
      <Text>Loading...</Text>
    </View>
  );
}

function HomeScreen({ navigation}) {
  const { signOut } = React.useContext(AuthContext);
  //const Screen1 = props => {
  return (
    <View>
      <Text>Signed in!</Text>
      <Button title="Sign out" onPress={signOut} />
      <Text accessible={true} accessibilityLabel="bsms digital attendance" style={styles.titleText} style={{ color: '#005E7E', fontSize: 20, marginTop: 20, textAlign:"center"}}>BSMS DIGITAL PLACEMENT</Text>
        <Text accessible={true} accessibilityLabel="and skills record" style={styles.titleText} style={{ color: '#005E7E', fontSize: 20, marginTop: 1, textAlign:"center"}}>CLINICAL SKILLS RECORD</Text> 

<TouchableOpacity onPress = {() => navigation.navigate('Location', { screen: 'LocationLog' }) }>
             <Image accessible={true} accessibilityLabel="Image" source={require('./assets/images/placement3.png')} style={{width: 250, height: 75, marginTop:20, marginLeft:55}} />
</TouchableOpacity>

<TouchableOpacity onPress = {() => navigation.navigate('Barcode', { screen: 'ScanQRScreen5' }) }>
             <Image accessible={true} accessibilityLabel="Image" source={require('./assets/images/placement6.png')} style={{width: 250, height: 75, marginTop:20, marginLeft:55}} />
</TouchableOpacity>
  </View>


    
  );
};



function SignInScreen() {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  const { signIn } = React.useContext(AuthContext);

  return (
    <View>
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Sign in" onPress={() => signIn({ username, password })} />
    </View>
  );
}

const Stack = createStackNavigator();

export default function App({ navigation }) {
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    }
  );

  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken;

      try {
        // Restore token stored in `SecureStore` or any other encrypted storage
        // userToken = await SecureStore.getItemAsync('userToken');
      } catch (e) {
        // Restoring token failed
      }

      // After restoring token, we may need to validate it in production apps

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      dispatch({ type: 'RESTORE_TOKEN', token: userToken });
    };

    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async (data) => {
        // In a production app, we need to send some data (usually username, password) to server and get a token
        // We will also need to handle errors if sign in failed
        // After getting token, we need to persist the token using `SecureStore` or any other encrypted storage
        // In the example, we'll use a dummy token

        dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
      },
      signOut: () => dispatch({ type: 'SIGN_OUT' }),
      signUp: async (data) => {
        // In a production app, we need to send user data to server and get a token
        // We will also need to handle errors if sign up failed
        // After getting token, we need to persist the token using `SecureStore` or any other encrypted storage
        // In the example, we'll use a dummy token

        dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
      },
    }),
    []
  );

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='HomeScreen'>
          {state.isLoading ? (
            // We haven't finished checking for the token yet
            <Stack.Screen name="Splash" component={SplashScreen} />
          ) : state.userToken == null ? (
            // No token found, user isn't signed in
            <Stack.Screen
              name="SignIn"
              component={SignInScreen}
              options={{
                title: 'Sign in',
                // When logging out, a pop animation feels intuitive
                animationTypeForReplace: state.isSignout ? 'pop' : 'push',
              }}
            />
          ) : (
            // User is signed in
            <Stack.Screen name="Home" component={HomeScreen} />
          )}
          {/* <Stack.Screen name="LocationLog" component={LocationLog} /> */}
          <Stack.Screen name="Location" component={LocationLog} options={{ headerShown: true }} />
          <Stack.Screen name="Barcode" component={ScanQRScreen7} options={{ headerShown: true }} />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: DefaultTheme.colors.background,
    paddingTop: 10
  },
  card: {
    width: '90%',
    height: '30%',
    marginLeft: 'auto',
    marginRight: 'auto',
    backgroundColor: '#FAD607'
    
  }
});