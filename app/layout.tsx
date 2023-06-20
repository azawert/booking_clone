import { ClientOnly } from "./components/ClientOnly";
import { RegisterModal } from "./components/modals/RegisterModal";
import { Navbar } from "./components/nav/Navbar";
import "./globals.css";
import { Nunito } from "next/font/google";
import { ToasterProvider } from "./providers/ToasterProvider";
import { LoginModal } from "./components/modals/LoginModal";
import { getCurrentUser } from "./actions/getCurrentUser";
import { RentModal } from "./components/modals/RentModal";

const font = Nunito({ subsets: ["latin"] });

export const metadata = {
  title: "Airbnb",
  description: "App for booking apartments",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();
  return (
    <html lang='en'>
      <body className={font.className}>
        <ClientOnly>
          <ToasterProvider />
          <Navbar currentUser={currentUser} />
          <LoginModal />
          <RentModal />
          <RegisterModal />
          <div className='pb-20 pt-28'>{children}</div>
        </ClientOnly>
      </body>
    </html>
  );
}
