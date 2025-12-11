import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { logger } from '../utils/logger';

// Configuration complète par pays
export interface CountryConfig {
  code: string;
  name: string;
  nameLocal: string;
  subdomain: string;
  language: string;
  flag: string;
  currency: string;
  currencySymbol: string;
  phone: string;
  email: string;
  whatsapp: string;
  paymentMethods: string[];
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string[];
  legalEntity: string;
  address: string;
  mainCities: string[];
  popularSectors: string[];
  partners: string[];
  events: string[];
}

export const countriesConfig: Record<string, CountryConfig> = {
  CM: {
    code: 'CM',
    name: 'Cameroun',
    nameLocal: 'Cameroon',
    subdomain: 'cameroun',
    language: 'fr',
    flag: '🇨🇲',
    currency: 'FCFA',
    currencySymbol: 'FCFA',
    phone: '+237 6XX XX XX XX',
    email: 'recrutement@ireliscameroun.com',
    whatsapp: '+237 6XX XX XX XX',
    paymentMethods: ['Orange Money', 'MTN Mobile Money', 'Carte bancaire', 'Express Union'],
    seoTitle: 'Irelis Cameroun - Trouvez un emploi au Cameroun | 5000+ offres',
    seoDescription: 'La plus grande plateforme d\'emploi au Cameroun. Plus de 5000 offres vérifiées à Yaoundé, Douala et partout au Cameroun. CDI, CDD, Stage.',
    seoKeywords: ['emploi cameroun', 'job cameroun', 'recrutement cameroun', 'offre emploi yaoundé', 'offre emploi douala', 'carrière cameroun'],
    legalEntity: 'Irelis Cameroun SARL',
    address: 'Yaoundé, Bastos - Immeuble Les Palmiers',
    mainCities: ['Yaoundé', 'Douala', 'Bafoussam', 'Garoua', 'Bamenda'],
    popularSectors: ['Commerce', 'Informatique', 'Santé', 'Éducation', 'BTP', 'Agriculture'],
    partners: ['Orange Cameroun', 'MTN Cameroun', 'Ecobank', 'CNPS'],
    events: ['Salon de l\'Emploi Yaoundé 2025', 'Forum Jeunesse Douala', 'Tech Career Fair'],
  },
  SN: {
    code: 'SN',
    name: 'Sénégal',
    nameLocal: 'Sénégal',
    subdomain: 'senegal',
    language: 'fr',
    flag: '🇸🇳',
    currency: 'FCFA',
    currencySymbol: 'FCFA',
    phone: '+221 77 XXX XX XX',
    email: 'recrutement@irelissenegal.com',
    whatsapp: '+221 77 XXX XX XX',
    paymentMethods: ['Orange Money', 'Free Money', 'Wave', 'Carte bancaire'],
    seoTitle: 'Irelis Sénégal - Emploi au Sénégal | Offres à Dakar et régions',
    seoDescription: 'Trouvez votre emploi au Sénégal. Des milliers d\'offres vérifiées à Dakar, Thiès, Saint-Louis. La plateforme d\'emploi n°1 au Sénégal.',
    seoKeywords: ['emploi sénégal', 'job dakar', 'recrutement sénégal', 'offre emploi dakar', 'carrière sénégal', 'travail dakar'],
    legalEntity: 'Irelis Sénégal SUARL',
    address: 'Dakar, Plateau - Rue Carnot',
    mainCities: ['Dakar', 'Thiès', 'Saint-Louis', 'Kaolack', 'Ziguinchor'],
    popularSectors: ['Services', 'Commerce', 'Tourisme', 'Informatique', 'Finance', 'Télécom'],
    partners: ['Orange Sénégal', 'Sonatel', 'CBAO', 'Banque Atlantique'],
    events: ['Dakar Career Expo', 'Salon Emploi Jeunes', 'Tech Connect Dakar'],
  },
  CI: {
    code: 'CI',
    name: 'Côte d\'Ivoire',
    nameLocal: 'Côte d\'Ivoire',
    subdomain: 'cotedivoire',
    language: 'fr',
    flag: '🇨🇮',
    currency: 'FCFA',
    currencySymbol: 'FCFA',
    phone: '+225 07 XX XX XX XX',
    email: 'recrutement@irelisci.com',
    whatsapp: '+225 07 XX XX XX XX',
    paymentMethods: ['Orange Money', 'MTN Mobile Money', 'Moov Money', 'Wave', 'Carte bancaire'],
    seoTitle: 'Irelis Côte d\'Ivoire - Emploi CI | Jobs à Abidjan et région',
    seoDescription: 'Premier site d\'emploi en Côte d\'Ivoire. Trouvez votre job à Abidjan, Bouaké, San Pedro. Des milliers d\'offres en CDI, CDD, Stage.',
    seoKeywords: ['emploi côte d\'ivoire', 'job abidjan', 'recrutement ci', 'offre emploi abidjan', 'travail côte d\'ivoire'],
    legalEntity: 'Irelis Côte d\'Ivoire SARL',
    address: 'Abidjan, Plateau - Avenue Marchand',
    mainCities: ['Abidjan', 'Bouaké', 'Yamoussoukro', 'San Pedro', 'Daloa'],
    popularSectors: ['Banque', 'Assurance', 'Industrie', 'Logistique', 'Commerce', 'Cacao'],
    partners: ['Orange CI', 'MTN CI', 'NSIA Banque', 'CGRAE'],
    events: ['Abidjan Job Fair', 'Salon RH Plateau', 'Africa Tech Summit CI'],
  },
  MA: {
    code: 'MA',
    name: 'Maroc',
    nameLocal: 'المغرب',
    subdomain: 'maroc',
    language: 'fr',
    flag: '🇲🇦',
    currency: 'MAD',
    currencySymbol: 'DH',
    phone: '+212 6XX XX XX XX',
    email: 'recrutement@irelismaroc.com',
    whatsapp: '+212 6XX XX XX XX',
    paymentMethods: ['Carte bancaire', 'Cash Plus', 'Virement bancaire', 'PayPal'],
    seoTitle: 'Irelis Maroc - Emploi au Maroc | Offres Casablanca, Rabat, Marrakech',
    seoDescription: 'Plateforme d\'emploi leader au Maroc. Milliers d\'offres à Casablanca, Rabat, Marrakech, Tanger. CDI, CDD, Freelance, Stage.',
    seoKeywords: ['emploi maroc', 'job maroc', 'recrutement maroc', 'offre emploi casablanca', 'travail rabat', 'carrière maroc'],
    legalEntity: 'Irelis Maroc SARL AU',
    address: 'Casablanca, Maarif - Boulevard Zerktouni',
    mainCities: ['Casablanca', 'Rabat', 'Marrakech', 'Tanger', 'Fès', 'Agadir'],
    popularSectors: ['Tourisme', 'Industrie', 'IT', 'Call Center', 'BTP', 'Textile'],
    partners: ['Maroc Telecom', 'BMCE Bank', 'Attijariwafa Bank', 'CNSS'],
    events: ['Casablanca Job Days', 'Forum Emploi Rabat', 'Startup Weekend Maroc'],
  },
  NG: {
    code: 'NG',
    name: 'Nigeria',
    nameLocal: 'Nigeria',
    subdomain: 'nigeria',
    language: 'en',
    flag: '🇳🇬',
    currency: 'NGN',
    currencySymbol: '₦',
    phone: '+234 XXX XXX XXXX',
    email: 'recruitment@irelisnigeria.com',
    whatsapp: '+234 XXX XXX XXXX',
    paymentMethods: ['Bank Transfer', 'Flutterwave', 'Paystack', 'OPay', 'PalmPay'],
    seoTitle: 'Irelis Nigeria - Find Jobs in Nigeria | Lagos, Abuja & More',
    seoDescription: 'Nigeria\'s leading job platform. Thousands of verified jobs in Lagos, Abuja, Port Harcourt. Full-time, Contract, Remote opportunities.',
    seoKeywords: ['jobs nigeria', 'careers nigeria', 'job vacancies lagos', 'employment nigeria', 'jobs in abuja', 'nigeria recruitment'],
    legalEntity: 'Irelis Nigeria Limited',
    address: 'Lagos, Victoria Island - Akin Adesola Street',
    mainCities: ['Lagos', 'Abuja', 'Port Harcourt', 'Kano', 'Ibadan', 'Benin City'],
    popularSectors: ['Oil & Gas', 'Banking', 'Tech', 'Telecom', 'FMCG', 'Hospitality'],
    partners: ['GTBank', 'Access Bank', 'MTN Nigeria', 'Andela'],
    events: ['Lagos Career Fair', 'Abuja Job Expo', 'Nigeria Tech Week'],
  },
  GH: {
    code: 'GH',
    name: 'Ghana',
    nameLocal: 'Ghana',
    subdomain: 'ghana',
    language: 'en',
    flag: '🇬🇭',
    currency: 'GHS',
    currencySymbol: '₵',
    phone: '+233 XXX XXX XXXX',
    email: 'recruitment@irelisghana.com',
    whatsapp: '+233 XXX XXX XXXX',
    paymentMethods: ['Mobile Money', 'Bank Transfer', 'MTN MoMo', 'Vodafone Cash', 'AirtelTigo Money'],
    seoTitle: 'Irelis Ghana - Jobs in Ghana | Accra, Kumasi Employment',
    seoDescription: 'Find your dream job in Ghana. Thousands of opportunities in Accra, Kumasi, Takoradi. Ghana\'s trusted job portal.',
    seoKeywords: ['jobs ghana', 'job vacancies accra', 'ghana recruitment', 'employment ghana', 'careers kumasi'],
    legalEntity: 'Irelis Ghana Ltd',
    address: 'Accra, East Legon - Liberation Road',
    mainCities: ['Accra', 'Kumasi', 'Takoradi', 'Tamale', 'Cape Coast'],
    popularSectors: ['Mining', 'Banking', 'Agriculture', 'Technology', 'Manufacturing', 'Education'],
    partners: ['MTN Ghana', 'Vodafone Ghana', 'Ecobank Ghana', 'GCB Bank'],
    events: ['Accra Jobs Fair', 'Ghana Career Summit', 'Tech Jobs Ghana'],
  },
  KE: {
    code: 'KE',
    name: 'Kenya',
    nameLocal: 'Kenya',
    subdomain: 'kenya',
    language: 'en',
    flag: '🇰🇪',
    currency: 'KES',
    currencySymbol: 'KSh',
    phone: '+254 XXX XXX XXX',
    email: 'recruitment@ireliskenya.com',
    whatsapp: '+254 XXX XXX XXX',
    paymentMethods: ['M-Pesa', 'Bank Transfer', 'Airtel Money', 'T-Kash', 'Equitel'],
    seoTitle: 'Irelis Kenya - Job Opportunities in Kenya | Nairobi & Beyond',
    seoDescription: 'Leading job site in Kenya. Find jobs in Nairobi, Mombasa, Kisumu. Verified employers, latest vacancies, career growth.',
    seoKeywords: ['jobs kenya', 'job vacancies nairobi', 'kenya employment', 'careers kenya', 'jobs in mombasa'],
    legalEntity: 'Irelis Kenya Limited',
    address: 'Nairobi, Westlands - Waiyaki Way',
    mainCities: ['Nairobi', 'Mombasa', 'Kisumu', 'Nakuru', 'Eldoret'],
    popularSectors: ['Tech', 'Finance', 'Agriculture', 'Tourism', 'Manufacturing', 'NGO'],
    partners: ['Safaricom', 'Equity Bank', 'KCB', 'Co-operative Bank'],
    events: ['Nairobi Career Expo', 'Kenya Job Fair', 'Tech Talent Kenya'],
  },
  EG: {
    code: 'EG',
    name: 'Égypte',
    nameLocal: 'مصر',
    subdomain: 'egypt',
    language: 'ar',
    flag: '🇪🇬',
    currency: 'EGP',
    currencySymbol: 'ج.م',
    phone: '+20 XXX XXX XXXX',
    email: 'recruitment@irelisegypt.com',
    whatsapp: '+20 XXX XXX XXXX',
    paymentMethods: ['Fawry', 'Vodafone Cash', 'Bank Transfer', 'Credit Card', 'InstaPay'],
    seoTitle: 'إيريليس مصر - وظائف في مصر | القاهرة والإسكندرية',
    seoDescription: 'أكبر منصة توظيف في مصر. آلاف الوظائف في القاهرة، الإسكندرية، الجيزة. وظائف دوام كامل، عقود، عمل عن بعد.',
    seoKeywords: ['وظائف مصر', 'وظائف القاهرة', 'توظيف مصر', 'فرص عمل مصر', 'وظائف الإسكندرية', 'عمل في مصر'],
    legalEntity: 'شركة إيريليس مصر',
    address: 'القاهرة، مدينة نصر - شارع عباس العقاد',
    mainCities: ['القاهرة', 'الإسكندرية', 'الجيزة', 'بورسعيد', 'طنطا', 'المنصورة'],
    popularSectors: ['السياحة', 'التكنولوجيا', 'البنوك', 'الصناعة', 'التعليم', 'التجارة'],
    partners: ['فودافون مصر', 'البنك الأهلي المصري', 'بنك مصر', 'وزارة القوى العاملة'],
    events: ['معرض التوظيف القاهرة', 'ملتقى الوظائف مصر', 'قمة التكنولوجيا المصرية'],
  },
};

interface CountryContextType {
  currentCountry: CountryConfig | null;
  setCurrentCountry: (countryCode: string | null) => void;
  isOnContinentalPage: boolean;
  goToContinentalPage: () => void;
  availableCountries: CountryConfig[];
}

const CountryContext = createContext<CountryContextType | undefined>(undefined);

interface CountryProviderProps {
  children: ReactNode;
}

export function CountryProvider({ children }: CountryProviderProps) {
  const [currentCountry, setCurrentCountryState] = useState<CountryConfig | null>(null);
  const [isOnContinentalPage, setIsOnContinentalPage] = useState(false);

  useEffect(() => {
    // Charger le pays sauvegardé au démarrage
    const savedCountry = localStorage.getItem('irelis_selected_country');
    if (savedCountry && countriesConfig[savedCountry]) {
      setCurrentCountryState(countriesConfig[savedCountry]);
      setIsOnContinentalPage(false);
    }
  }, []);

  const setCurrentCountry = (countryCode: string | null) => {
    if (countryCode && countriesConfig[countryCode]) {
      const country = countriesConfig[countryCode];
      setCurrentCountryState(country);
      setIsOnContinentalPage(false);
      localStorage.setItem('irelis_selected_country', countryCode);
      localStorage.setItem('irelis_language', country.language);
      
      // Simuler la redirection vers sous-domaine
      // En production: window.location.href = `https://${country.subdomain}.irelis.com`;
      logger.info(`🌍 Redirection simulée vers: ${country.subdomain}.irelis.com`);
    } else {
      setCurrentCountryState(null);
      setIsOnContinentalPage(true);
      localStorage.removeItem('irelis_selected_country');
    }
  };

  const goToContinentalPage = () => {
    setIsOnContinentalPage(true);
    setCurrentCountryState(null);
    localStorage.removeItem('irelis_selected_country');
  };

  const availableCountries = Object.values(countriesConfig);

  return (
    <CountryContext.Provider
      value={{
        currentCountry,
        setCurrentCountry,
        isOnContinentalPage,
        goToContinentalPage,
        availableCountries,
      }}
    >
      {children}
    </CountryContext.Provider>
  );
}

export function useCountry() {
  const context = useContext(CountryContext);
  if (context === undefined) {
    throw new Error('useCountry must be used within a CountryProvider');
  }
  return context;
}