import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";

export default function Help() {
  const [selectedButton, setSelectedButton] = useState(null);

  const handleButtonPress = (buttonIndex) => {
    setSelectedButton((prevSelectedButton) =>
      prevSelectedButton === buttonIndex ? null : buttonIndex
    );
  };

  return (
    <View
      style={{
        backgroundColor: "#FFF",
        flex: 1,
      }}
    >
      <ScrollView style={{ paddingHorizontal: 20, marginBottom: 1 }}>
        <Text style={styles.title}>Perguntas Frequentes:</Text>
        
        <View style={{ marginBottom: 10 }}>
          <TouchableOpacity
            style={{
              backgroundColor: "#2427600D",
              width: "100%",
              paddingVertical: 10,
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
            }}
            onPress={() => {
              handleButtonPress(1);
            }}
          >
            <Text style={styles.title2}>
              Qual é a principal função do Geopark AR?
            </Text>
          </TouchableOpacity>

          {selectedButton === 1 && (
            <Text style={styles.text}>
              Incentivar o turismo e a exploração de geossítios na região do
              Cariri, através de tecnologias que incluem experiências de
              realidade aumentada (AR) e inteligência artificial (IA).
            </Text>
          )}
        </View>
        <View style={{ marginBottom: 10 }}>
          <TouchableOpacity
            style={{
              backgroundColor: "#2427600D",
              width: "100%",
              paddingVertical: 10,
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
            }}
            onPress={() => {
              handleButtonPress(2);
            }}
          >
            <Text style={styles.title2}>
              É possível visualizar informações históricas sobre os geoparques
              por meio da realidade aumentada?
            </Text>
          </TouchableOpacity>

          {selectedButton === 2 && (
            <Text style={styles.text}>
              Sim. Ao longo das missões, ao apontar a câmera para cada ponto
              indicado, surgirá na tela informações históricas sobre aquele
              determinado local.
            </Text>
          )}
        </View>
        <View style={{ marginBottom: 10 }}>
          <TouchableOpacity
            style={{
              backgroundColor: "#2427600D",
              width: "100%",
              paddingVertical: 10,
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
            }}
            onPress={() => {
              handleButtonPress(3);
            }}
          >
            <Text style={styles.title2}>
              O aplicativo oferece alguma funcionalidade de gamificação para
              tornar a experiência de turismo mais envolvente?
            </Text>
          </TouchableOpacity>

          {selectedButton === 3 && (
            <Text style={styles.text}>
              Sim, através da realização das missões sugeridas, com prêmios ao
              longo do percurso e no final, conforme finalizadas as missões.
            </Text>
          )}
        </View>
        <View style={{ marginBottom: 10 }}>
          <TouchableOpacity
            style={{
              backgroundColor: "#2427600D",
              width: "100%",
              paddingVertical: 10,
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
            }}
            onPress={() => {
              handleButtonPress(4);
            }}
          >
            <Text style={styles.title2}>
              O aplicativo está disponível em mais de um idioma?
            </Text>
          </TouchableOpacity>

          {selectedButton === 4 && (
            <Text style={styles.text}>
              Não. O aplicativo possui apenas um idioma, sendo ele o Português
              (pt-BR).
            </Text>
          )}
        </View>
        <View style={{ marginBottom: 10 }}>
          <TouchableOpacity
            style={{
              backgroundColor: "#2427600D",
              width: "100%",
              paddingVertical: 10,
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
            }}
            onPress={() => {
              handleButtonPress(5);
            }}
          >
            <Text style={styles.title2}>
              Como o aplicativo assegura a acessibilidade para usuários com
              necessidades especiais durante a exploração dos geossítios?
            </Text>
          </TouchableOpacity>

          {selectedButton === 5 && (
            <Text style={styles.text}>
              O aplicativo possui dinamicidade, pois além de um fácil manuseio,
              com instruções para cada etapa da sua utilização, também possui
              recursos auditivos e visuais sobre o local visitado.
            </Text>
          )}
        </View>
        <View style={{ marginBottom: 10 }}>
          <TouchableOpacity
            style={{
              backgroundColor: "#2427600D",
              width: "100%",
              paddingVertical: 10,
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
            }}
            onPress={() => {
              handleButtonPress(6);
            }}
          >
            <Text style={styles.title2}>
              O aplicativo permite o compartilhamento de experiências e
              recomendações entre usuários?
            </Text>
          </TouchableOpacity>

          {selectedButton === 6 && (
            <Text style={styles.text}>
              Sim. Através do compartilhamento nas redes sociais do usuário.
            </Text>
          )}
        </View>
        <View style={{ marginBottom: 10 }}>
          <TouchableOpacity
            style={{
              backgroundColor: "#2427600D",
              width: "100%",
              paddingVertical: 10,
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
            }}
            onPress={() => {
              handleButtonPress(7);
            }}
          >
            <Text style={styles.title2}>
              Como o aplicativo garante a segurança e privacidade dos usuários
              ao utilizar recursos de realidade aumentada e inteligência
              artificial?
            </Text>
          </TouchableOpacity>

          {selectedButton === 7 && (
            <Text style={styles.text}>
              A política de privacidade do aplicativo quando aceita pelo
              usuário, vincula-se com a do Google Account e com o Geopark
              Araripe, tendo o compartilhamento de dados de usuário restrito a
              ambos.
            </Text>
          )}
        </View>
        <View style={{ marginBottom: 10 }}>
          <TouchableOpacity
            style={{
              backgroundColor: "#2427600D",
              width: "100%",
              paddingVertical: 10,
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
            }}
            onPress={() => {
              handleButtonPress(8);
            }}
          >
            <Text style={styles.title2}>
              Como posso explorar locais menos conhecidos dos geossítios por
              meio do aplicativo?
            </Text>
          </TouchableOpacity>

          {selectedButton === 8 && (
            <Text style={styles.text}>
              Na aba de missões você encontrará não apenas os pontos mais
              conhecidos, mas também os menos populares.
            </Text>
          )}
        </View>
        <View style={{ marginBottom: 10 }}>
          <TouchableOpacity
            style={{
              backgroundColor: "#2427600D",
              width: "100%",
              paddingVertical: 10,
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
            }}
            onPress={() => {
              handleButtonPress(9);
            }}
          >
            <Text style={styles.title2}>
              Há algum suporte ao cliente disponível caso o mesmo encontre
              problemas?
            </Text>
          </TouchableOpacity>

          {selectedButton === 9 && (
            <Text style={styles.text}>
              Sim. Você poderá encaminhar problemas e dúvidas na caixa de
              diálogo disponível na área de suporte do aplicativo.
            </Text>
          )}
        </View>
        <View style={{ marginBottom: 10 }}>
          <TouchableOpacity
            style={{
              backgroundColor: "#2427600D",
              width: "100%",
              paddingVertical: 10,
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
            }}
            onPress={() => {
              handleButtonPress(10);
            }}
          >
            <Text style={styles.title2}>
              É possível realizar todas as missões entrando apenas como
              convidado?
            </Text>
          </TouchableOpacity>

          {selectedButton === 10 && (
            <Text style={styles.text}>
              Não. Como convidado só é possível a realização de algumas missões
              experimentais, para a conclusão das demais missões e garantia do
              selo, é necessário fazer o login.
            </Text>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontWeight: "500",
    fontSize: 14,
    textAlign: "justify",
    padding: 20,
    backgroundColor: "#DAF1E2",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  title: {
    color: "#18241B",
    fontSize: 18,
    fontWeight: "600",
    marginVertical: 18,
  },
  title2: {
    color: "#18241B",
    fontSize: 13,
    fontWeight: "600",
    marginVertical: 4,
    textAlign: "center",
    padding: 10,
  },
  titleSeta: {
    color: "#18241B",
    fontSize: 18,
    fontWeight: "600",
    marginVertical: 18,
    textAlign: "center",
  },
});
