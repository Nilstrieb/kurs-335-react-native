import { AuthContextProvider } from "./components/auth-context";
import Root from "./components/Root";

export default function App() {
  return (
    <AuthContextProvider>
      <Root />
    </AuthContextProvider>
  );
}
