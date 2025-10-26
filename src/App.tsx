import { HospitalHeader } from "./components/hospital/HospitalHeader";
import { HospitalFooter } from "./components/hospital/HospitalFooter";
import { useNavigation, PageType } from "./hooks/useNavigation";
import { HomePage } from "./pages/HomePage";
import { ServicesPage } from "./pages/ServicesPage";
import { DoctorsPage } from "./pages/DoctorsPage";
import { PatientsPage } from "./pages/PatientsPage";
import { AppointmentsPage } from "./pages/AppointmentsPage";
import { ContactPage } from "./pages/ContactPage";
import { LoginPage } from "./pages/LoginPage";
import { RGPDPage } from "./pages/RGPDPage";

export default function App() {
  const { currentPage, navigateTo } = useNavigation();

  const renderCurrentPage = () => {
    const onNavigate = (page: string) =>
      navigateTo(page as PageType);

    switch (currentPage) {
      case "home":
        return <HomePage onNavigate={onNavigate} />;
      case "services":
        return <ServicesPage onNavigate={onNavigate} />;
      case "doctors":
        return <DoctorsPage onNavigate={onNavigate} />;
      case "patients":
        return <PatientsPage onNavigate={onNavigate} />;
      case "appointments":
        return <AppointmentsPage onNavigate={onNavigate} />;
      case "contact":
        return <ContactPage onNavigate={onNavigate} />;
      case "login":
        return <LoginPage onNavigate={onNavigate} />;
      case "rgpd":
        return <RGPDPage onNavigate={onNavigate} />;
      default:
        return <HomePage onNavigate={onNavigate} />;
    }
  };

  const showHeaderFooter = currentPage !== 'login' && currentPage !== 'rgpd';

  return (
    <div className="min-h-screen bg-white">
      {showHeaderFooter && (
        <HospitalHeader
          currentPage={currentPage}
          onNavigate={(page: string) =>
            navigateTo(page as PageType)
          }
        />
      )}
      <main>{renderCurrentPage()}</main>
      {showHeaderFooter && (
        <HospitalFooter
          onNavigate={(page: string) =>
            navigateTo(page as PageType)
          }
        />
      )}
    </div>
  );
}