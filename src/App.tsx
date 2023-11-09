import Customer from "./pages/footer/Customer";
import Footer from "./pages/footer/footer-page/Footer";
import Header from "./pages/header";
import RegisterUser from "./pages/register-user";
import { StateProvider } from "./use-context";

const App = () => {
  return (
    <div className="flex justify-center flex-col">
      <StateProvider>
        <Header />
        <RegisterUser />
        <Customer />
        <Footer />
      </StateProvider>
    </div>
  );
};

export default App;
