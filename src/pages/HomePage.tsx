import { HospitalHero } from "../components/hospital/HospitalHero";
import { MedicalServices } from "../components/hospital/MedicalServices";
import { MedicalTeam } from "../components/hospital/MedicalTeam";
import { PatientInfo } from "../components/hospital/PatientInfo";

interface HomePageProps {
  onNavigate: (page: string) => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  return (
    <div>
      <HospitalHero onNavigate={onNavigate} />
      <MedicalServices onNavigate={onNavigate} />
      <MedicalTeam onNavigate={onNavigate} />
      <PatientInfo onNavigate={onNavigate} />
    </div>
  );
}