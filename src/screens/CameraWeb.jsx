import WebView from "react-native-webview";

export default function CameraWeb({ route }) {
  
  //esta tela retorna o link da camera web
  const { url } = route.params;

  return <WebView source={{ uri: url }} />;
}
