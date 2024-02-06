import React from "react";
import {
  View,
  TouchableOpacity,
  Image,
  Text,
  StyleSheet,
  Linking,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";

export default function Terms() {

  return (
    <View
      style={{
        backgroundColor: "#FFF",
        flex: 1,
      }}
    >

      <ScrollView style={{ paddingHorizontal: 20, marginBottom: 1 }}>
        <Text style={styles.title}>Termos e condições de uso:</Text>
        <Text style={styles.text}>
          Ao baixar ou usar o aplicativo, estes termos serão aplicados
          automaticamente a você. Você deve certificar-se, portanto, de que não
          tem permissão para copiar ou modificar o aplicativo, qualquer parte do
          aplicativo ou nossas marcas registradas de forma alguma. Você não tem
          permissão para tentar extrair o código-fonte do aplicativo e você
          também não deve tentar traduzir o aplicativo para outros idiomas ou
          fazer versões. O próprio aplicativo e todas as marcas registradas,
          direitos autorais, direitos de banco de dados e outros direitos de
          propriedade intelectual relacionados a ele, ainda pertencem ao geopark
          Araripe.
        </Text>
        <Text style={styles.text}>
          O geopark AR está empenhado em garantir que o aplicativo seja tão útil
          e eficiente quanto possível. Por essa razão, a nós reserva-se o
          direito de fazer alterações no aplicativo ou cobrar por seus serviços,
          a qualquer momento e por qualquer motivo, nunca iremos cobrar pelo
          aplicativo ou seus serviços sem torná-lo muito claro para você.
        </Text>
        <Text style={styles.text}>
          O aplicativo armazena e processa dados pessoais que você nos forneceu,
          para fornecer nosso serviço. É sua responsabilidade manter seu
          telefone e acesso ao aplicativo seguro. Portanto, recomendamos que
          você não faça jailbreak ou root no seu telefone, que é o processo de
          remover restrições e limitações de software impostas pelo sistema
          operacional oficial do seu dispositivo. Poderia fazer o seu telefone
          vulnerável a malware/vírus/programas maliciosos, comprometer os
          recursos de segurança do seu telefone e isso pode significar que o
          aplicativo não funcionará corretamente ou não funcionará.
        </Text>
        <Text style={styles.text}>
          O aplicativo usa serviços de terceiros que declaram seus Termos e
          Condições. Link para Termos e Condições de serviços de terceiros
          provedores usados pelo aplicativo{" "}
          <Text
            onPress={() => {
              Linking.openURL("https://policies.google.com/terms");
            }}
            style={{ textDecorationLine: "underline", color: "blue" }}
          >
            Serviços do Google Play
          </Text>
          .
        </Text>
        <Text style={styles.text}>
          Você deve estar ciente de que há certas coisas que o geopark AR não se
          responsabiliza por. Certas funções do aplicativo exigirão que o
          aplicativo tenha uma conexão com a internet. A conexão pode ser Wi-Fi
          ou fornecida pelo seu provedor de rede móvel, mas o geopark não pode
          assumir a responsabilidade pelo aplicativo não funcionar totalmente se
          você não tiver acesso a Wi-Fi ou não tiver parte da sua cota de dados.
        </Text>
        
        <Text style={styles.text}>
          Alterações a esses termos e condições de uso: Nós podemos atualizar
          nossos Termos e Condições de tempos em tempos, portanto, é
          aconselhável revisar esta página periodicamente para quaisquer
          alterações. Geopark AR irá notificá-lo sobre quaisquer alterações
          publicando os novos Termos e Condições nesta página.
        </Text>
        <Text
          style={{
            textDecorationLine: "underline",
            color: "blue",
            borderBottomColor: "#E8E8E8",
            borderBottomWidth: 1,
            marginBottom: 20
          }}
        >
          Atualização: 15/12/2023
        </Text>
        <Text style={styles.title}>Política de privacidade:</Text>
        <Text style={styles.text}>
          Prezado usuário do aplicativo Geopark AR, é com grande respeito pela
          sua privacidade que apresentamos nossa Política de Privacidade, a qual
          detalha o tratamento das suas informações pessoais no contexto do
          Geopark AR. Estamos em conformidade com as leis de privacidade,
          incluindo o Regulamento Geral de Proteção de Dados (GDPR), e buscamos
          garantir a transparência e segurança no manuseio de seus dados.
        </Text>
        <Text style={styles.title2}>Informações Coletadas:</Text>
        <Text style={styles.text}>
          Ao utilizar nosso aplicativo, coletamos informações pessoais que
          incluem, seu nome, endereço de e-mail, gênero, faixa etária e dados de
          localização. Essas informações são fundamentais para otimizar a
          logística do Geopark AR e proporcionar uma experiência personalizada
          durante sua visita.
        </Text>
        <Text style={styles.title2}>Uso das Informações:</Text>
        <Text style={styles.text}>
          Comprometemo-nos a utilizar as informações coletadas exclusivamente
          para fins logísticos do Geopark Araripe. Em situações específicas,
          dados agregados sobre a quantidade de visitantes podem ser
          compartilhados, contribuindo para atrair mais público e aprimorar os
          serviços na região.
        </Text>
        <Text style={styles.title2}>Medidas de Segurança:</Text>
        <Text style={styles.text}>
          Implementamos rigorosas medidas de segurança, incluindo tecnologias de
          criptografia, para proteger suas informações contra acesso não
          autorizado. Esta abordagem visa garantir a confidencialidade e
          integridade dos dados que você compartilha conosco.
        </Text>
        <Text style={styles.title2}>Cookies e Tecnologias de Rastreio:</Text>
        <Text style={styles.text}>
          O uso de cookies e outras tecnologias de rastreamento é essencial para
          o funcionamento do aplicativo, restrito à região do geossítio colina
          do horto. Essas tecnologias personalizam sua experiência, assegurando
          um serviço mais eficiente e alinhado às nossas necessidades.
        </Text>
        <Text style={styles.title2}>Acesso e Controle:</Text>
        <Text style={styles.text}>
          Respeitamos seu direito de acessar, corrigir ou excluir as informações
          pessoais fornecidas. Dentro do aplicativo, disponibilizamos opções
          para que você gerencie seus dados de acordo com suas preferências e
          necessidades.
        </Text>
        <Text style={styles.title2}>
          Atualizações na Política de Privacidade:
        </Text>
        <Text style={styles.text}>
          Comprometemo-nos a notificar os usuários sobre quaisquer atualizações
          na Política de Privacidade por e-mail (projetohortoar@gmail.com) e
          através de mensagens no próprio aplicativo. Essa comunicação visa
          manter você informado sobre mudanças relevantes em nossas práticas de
          privacidade.
        </Text>
        <Text style={styles.text}>
          Agradecemos sinceramente pela confiança depositada no Geopark AR. Se
          houver dúvidas ou preocupações sobre esta política, entre em contato
          conosco por meio do email projetohortoar@gmail.com
        </Text>
        <Text
          style={{
            textDecorationLine: "underline",
            color: "blue",
            borderBottomColor: "#E8E8E8",
            borderBottomWidth: 1,
            marginBottom: 30
          }}
        >
          Atualização: 15/12/2023
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 14,
    marginBottom: 8,
    textAlign: "justify",
  },
  title: {
    color: "#18241B",
    fontSize: 18,
    fontWeight: "600",
    marginVertical: 18,
  },
  title2: {
    color: "#18241B",
    fontSize: 16,
    marginVertical: 4,
    fontWeight: "600"
  },
});
