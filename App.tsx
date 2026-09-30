import { NavigationContainer } from "@react-navigation/native";
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";

// 1. Define character model interface
interface Character {
  id: string;
  name: string;
  element: string;
  description: string;
}

// 2. Define navigation param list
export type RootStackParamList = {
  Home: undefined;
  CharacterList: undefined;
  CharacterDetails: {
    name: string;
    element: string;
    description: string;
  };
};

// 3. Define screen prop types
type HomeScreenProps = NativeStackScreenProps<RootStackParamList, "Home">;
type CharacterListScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "CharacterList"
>;
type CharacterDetailsScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "CharacterDetails"
>;

// Hardcoded mock data
const characters: Character[] = [
  {
    id: "1",
    name: "Rover",
    element: "Havoc / Spectro",
    description: "The wanderer who lost their memory, now exploring Solaris-3.",
  },
  {
    id: "2",
    name: "Jinhsi",
    element: "Spectro",
    description:
      "A leader of the Black Shores with radiant, commanding presence.",
  },
  {
    id: "3",
    name: "Calcharo",
    element: "Electro",
    description: "A silent, sword-wielding drifter with a mysterious past.",
  },
  {
    id: "4",
    name: "Verina",
    element: "Spectro",
    description: "A gentle healer who tends to the Jinzhou Botanical Garden.",
  },
];

// ---------- Screen 1: Home ----------
function HomeScreen({ navigation }: HomeScreenProps) {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Wuwa Character Catalog</Text>
      <Text style={styles.subtitle}>Browse Resonators from Solaris-3</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("CharacterList")}
      >
        <Text style={styles.buttonText}>View Characters</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

// ---------- Screen 2: Character List ----------
function CharacterListScreen({ navigation }: CharacterListScreenProps) {
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={characters}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              navigation.navigate("CharacterDetails", {
                name: item.name,
                element: item.element,
                description: item.description,
              })
            }
          >
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.element}>{item.element}</Text>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}

// ---------- Screen 3: Character Details ----------
function CharacterDetailsScreen({
  route,
  navigation,
}: CharacterDetailsScreenProps) {
  const { name = "", element = "", description = "" } = route.params || {};

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.element}>{element}</Text>
      <Text style={styles.description}>{description}</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.buttonText}>Go Back</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

// ---------- Navigation setup ----------
const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: { backgroundColor: "#0F1220" },
          headerTintColor: "#fff",
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "Wuwa Catalog" }}
        />
        <Stack.Screen
          name="CharacterList"
          component={CharacterListScreen}
          options={{ title: "Characters" }}
        />
        <Stack.Screen
          name="CharacterDetails"
          component={CharacterDetailsScreen}
          options={({ route }) => ({
            title: route.params?.name || "Details",
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// ---------- Styles ----------
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F1220",
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: "#A0A4B8",
    marginBottom: 24,
  },
  button: {
    backgroundColor: "#4E6BFF",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignSelf: "flex-start",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  card: {
    backgroundColor: "#1A1D2E",
    borderRadius: 8,
    padding: 16,
    marginBottom: 10,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 4,
  },
  element: {
    fontSize: 14,
    color: "#4E6BFF",
    marginBottom: 16,
  },
  description: {
    fontSize: 15,
    color: "#A0A4B8",
    lineHeight: 22,
    marginBottom: 24,
  },
});
