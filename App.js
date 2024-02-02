import "react-native-gesture-handler";
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  DrawerItemList,
  createDrawerNavigator,
} from "@react-navigation/drawer";
import { useNavigation } from "@react-navigation/native";
import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./src/firebase";

//telas
import Home from "./src/screens/home/index";
import Welcome from "./src/screens/Welcome";
import Settings from "./src/screens/settings/Settings";
import Tarefas from "./src/screens/Tarefas/";
import Missao from "./src/screens/missoes/MissaoTwo";
import MissaoTree from "./src/screens/missoes/MissaoTree";
import MissaoFour from "./src/screens/missoes/MissaoFour";
import MissaoFive from "./src/screens/missoes/MissaoFive";
import MissaoSix from "./src/screens/missoes/MissaoSix";
import MissaoSeven from "./src/screens/missoes/MissaoSeven";
import MissaoEight from "./src/screens/missoes/MissaoEight";
import Selos from "./src/screens/Selos";
import Questionario from "./src/screens/missoes/Questionario";
import About from "./src/screens/About";
import Login from "./src/screens/Login";
import Register from "./src/screens/Register";
import Introduction from "./src/screens/Introduction";
import Terms from "./src/screens/settings/Terms";
import EditarPerfil from "./src/screens/settings/Editarperfil";
import Help from "./src/screens/settings/Help&suport";
import Problems from "./src/screens/settings/Problems";
import CameraWeb from "./src/screens/CameraWeb";
import NewPassword from "./src/screens/NewPassword";

import { AuthProvider } from "./src/hooks/useAuth";

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

//navegação Drawer
function Root() {
  const [user, setUser] = useState(null);
  const [authChecked, setAuthChecked] = useState(false);

  {
    /* verificar se usuário está logado */
  }
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      setUser(authUser);
      setAuthChecked(true);
    });

    return () => unsubscribe();
  }, []);

  const navigation = useNavigation();

  return (
    <Drawer.Navigator
      initialRouteName={user && !user.isAnonymous ? "Home" : "Introduction"}
      drawerContent={(props) => {
        if (!authChecked) {
          return null;
        }

        return (
          <SafeAreaView style={{ position: "relative", height: "100%" }}>
            {user && !user.isAnonymous ? (
              <View
                style={{
                  width: "100%",
                  alignItems: "center",
                  borderBottomColor: "#f4f4f4",
                  borderBottomWidth: 1,
                  flexDirection: "row",
                  padding: 10,
                  gap: 15,
                  marginLeft: 10
                }}
              >
                <View>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "300",
                      color: "#18241B",
                    }}
                  >
                    {user.displayName ? user.displayName : " "}
                  </Text>
                  <Text
                    style={{
                      fontSize: 14,
                      color: "#18241B",
                    }}
                  >
                    {user.email ? user.email : " "}
                  </Text>
                </View>
              </View>
            ) : (
              <View
                style={{
                  width: "100%",
                  borderBottomColor: "#f4f4f4",
                  borderBottomWidth: 1,
                  padding: 15,
                  backgroundColor: "#287D44",
                  height: 60,
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{
                    fontSize: 16,
                    color: "#fff",
                    fontWeight: "700",
                  }}
                >
                  Olá visitante!
                </Text>
              </View>
            )}

            <View style={{ paddingLeft: 10, marginLeft: 10 }}>
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  gap: 10,
                  width: "100%",
                  height: 60,
                  alignItems: "center",
                }}
                onPress={() => navigation.navigate("Sobre")}
              >
                <View
                  style={{
                    width: 32,
                    height: 32,
                    backgroundColor: "#39B061",
                    borderRadius: 5,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Image
                    source={require("./assets/imgs/icon.png")}
                    style={{ width: 25, height: 25 }}
                  />
                </View>

                <Text>Sobre nós</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  gap: 10,
                  width: "100%",
                  height: 60,
                  alignItems: "center",
                }}
                onPress={() => navigation.navigate("Selos")}
              >
                <View
                  style={{
                    width: 32,
                    height: 32,
                    backgroundColor: "#39B061",
                    borderRadius: 5,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Image
                    source={require("./assets/imgs/icons/chestbig.png")}
                    style={{
                      width: 20,
                      height: 20,
                    }}
                  />
                </View>

                <Text>Recompensas</Text>
              </TouchableOpacity>
              {user && !user.isAnonymous ? (
                <TouchableOpacity
                  style={{
                    flexDirection: "row",
                    gap: 10,
                    width: "100%",
                    height: 60,
                    alignItems: "center",
                  }}
                  onPress={() => navigation.navigate("Configuracoes")}
                >
                  <View
                    style={{
                      width: 32,
                      height: 32,
                      backgroundColor: "#39B061",
                      borderRadius: 5,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Ionicons name="ios-settings" size={20} color="#F4F4F4" />
                  </View>

                  <Text>Configurações</Text>
                </TouchableOpacity>
              ) : null}
            </View>
            <DrawerItemList {...props} />
          </SafeAreaView>
        );
      }}
    >
      <Drawer.Group
        screenOptions={{
          headerShown: false,
          drawerItemStyle: {
            display: "none",
            activeTintColor: "#fff",
          },
        }}
      >
        <Drawer.Screen name="Home" component={Home} />
        <Drawer.Screen name="Introduction" component={Introduction} />
        <Drawer.Screen
          name="Welcome"
          component={Welcome}
          options={{ title: "" }}
        />
      </Drawer.Group>
    </Drawer.Navigator>
  );
}

//navegação Stack
export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator options={{ headerShown: false }}>
          <Stack.Screen
            name="Root"
            component={Root}
            options={{ headerShown: false, title: "" }}
          />

          <Stack.Group screenOptions={{ headerShown: false }}>
            <Stack.Screen
              name="Tarefas"
              component={Tarefas}
              options={{ title: "" }}
            />
          </Stack.Group>

          <Stack.Group
            screenOptions={{
              headerTitleAlign: "center",
              headerBackTitle: "Voltar",
            }}
          >
            <Stack.Screen
              name="Camera"
              component={CameraWeb}
              options={{
                headerTitle: "Câmera ",
              }}
            />
            <Stack.Screen
              name="NewPassword"
              component={NewPassword}
              options={{
                headerTitle: "Nova Senha ",
              }}
            />
            <Stack.Screen
              name="Terms"
              component={Terms}
              options={{
                headerTitle: "Termos e Política ",
              }}
            />
            <Stack.Screen
              name="Problems"
              component={Problems}
              options={{
                headerTitle: "Denuncie um problema",
              }}
            />
            <Stack.Screen
              name="Editar"
              component={EditarPerfil}
              options={{
                headerTitle: "Editar perfil",
              }}
            />
            <Stack.Screen
              name="Help"
              component={Help}
              options={{
                headerTitle: "Ajuda e suporte",
              }}
            />
            <Stack.Screen
              name="Sobre"
              component={About}
              options={{
                headerTitle: "Sobre nós",
              }}
            />
            <Stack.Screen
              name="Selos"
              component={Selos}
              options={{
                headerTitle: "Recompensas",
              }}
            />
            <Stack.Screen
              name="Configuracoes"
              component={Settings}
              options={{
                headerTitle: "Configurações",
              }}
            />
            <Stack.Screen
              name="Questionario"
              component={Questionario}
              options={{
                headerTitle: "Pesquisa Geopark",
              }}
            />
            <Stack.Screen
              name="Missao"
              component={Missao}
              options={{
                headerTitle: "Estátua do Padre Cícero",
              }}
            />
            <Stack.Screen
              name="MissaoTree"
              component={MissaoTree}
              options={{
                headerTitle: "Muro da Resistência",
              }}
            />
            <Stack.Screen
              name="MissaoFour"
              component={MissaoFour}
              options={{
                headerTitle: "Igreja Bom Jesus do Horto",
              }}
            />
            <Stack.Screen
              name="MissaoFive"
              component={MissaoFive}
              options={{
                headerTitle: "Vitrais",
              }}
            />
            <Stack.Screen
              name="MissaoSix"
              component={MissaoSix}
              options={{
                headerTitle: "Crucifixo",
              }}
            />
            <Stack.Screen
              name="MissaoSeven"
              component={MissaoSeven}
              options={{
                headerTitle: "Pedra do Pecado",
              }}
            />
            <Stack.Screen
              name="MissaoEight"
              component={MissaoEight}
              options={{
                headerTitle: "Marco do Padre Cícero",
              }}
            />
            <Stack.Screen
              name="Login"
              component={Login}
              options={{
                headerTitle: "Entrar",
              }}
            />
            <Stack.Screen
              name="Register"
              component={Register}
              options={{
                headerTitle: "Criar conta",
              }}
            />
          </Stack.Group>
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}
