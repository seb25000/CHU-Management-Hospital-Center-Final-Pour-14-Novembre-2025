import { useState } from 'react';

export type PageType = 'home' | 'services' | 'doctors' | 'patients' | 'appointments' | 'contact' | 'login' | 'rgpd';

export function useNavigation() {
  const [currentPage, setCurrentPage] = useState<PageType>('home');
  
  const navigateTo = (page: PageType) => {
    setCurrentPage(page);
    // Scroll to top when navigating
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  return {
    currentPage,
    navigateTo
  };
}