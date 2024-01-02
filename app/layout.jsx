import Nav from "@components/Nav";
import Provider from "@components/Provider";
import "@styles/globals.css";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export const metadata = {
  title: "Wallet",
  description: "Wallet",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <Provider>
          <div className="main">
            <div className="gradient"></div>
          </div>
          <main className="app">
            <Nav />
            {children}
          </main>
        </Provider>
        <ToastContainer />
      </body>
    </html>
  );
};

export default RootLayout;
