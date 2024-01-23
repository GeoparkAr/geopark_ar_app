import WebView from "react-native-webview";

export default function CameraWeb({ route }) {
  const { url } = route.params;

  return <WebView source={{ uri: url }} />;
}
