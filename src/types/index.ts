// CIDADÃO$ — Super App Municipal e Bioeconomia
// Comprehensive Domain Types for all 15 modules & Multi-tenant Core

export type TenantId = 'tenant_manacapuru' | 'tenant_itacoatiara' | 'tenant_parintins';

export type ModuleKey =
  | 'citizen-identity'
  | 'public-services'
  | 'education'
  | 'health'
  | 'marketplace'
  | 'foodplace'
  | 'freight'
  | 'tickets-mobility'
  | 'professional-services'
  | 'tourism-gastronomy'
  | 'agro-bioeconomy'
  | 'wallet-rewards'
  | 'biduga'
  | 'territorial-intelligence'
  | 'advertising';

export interface Municipality {
  id: string;
  name: string;
  state: string;
  ibgeCode: string;
  active: boolean;
  theme: {
    primaryColor: string;
    secondaryColor: string;
    accentColor: string;
    bannerUrl: string;
    coatOfArmsUrl: string;
  };
  geography: {
    lat: number;
    lng: number;
    urbanDistricts: string[];
    riverineCommunities: string[];
    fluvialPorts: string[];
  };
  modulesEnabled: string[];
}

export type UserRole =
  | 'cidadao'
  | 'responsavel_familiar'
  | 'estudante'
  | 'produtor_rural'
  | 'comerciante'
  | 'restaurante'
  | 'transportador'
  | 'operador_passagens'
  | 'profissional_autonomo'
  | 'servidor_municipal'
  | 'gestor_operador';

export interface UserProfile {
  id: string;
  tenantId: TenantId;
  name: string;
  email: string;
  phone: string;
  cpfMasked: string;
  mpuid: string; // Manacapuru Unique ID
  avatarUrl: string;
  role: UserRole;
  verifiedLevel: 'bronze' | 'prata' | 'ouro';
  locationType: 'urbana' | 'rural' | 'ribeirinha';
  neighborhoodOrCommunity: string;
  address: string;
  familyMembers: Array<{
    id: string;
    name: string;
    relationship: 'filho' | 'conjuge' | 'pais' | 'dependente';
    birthDate: string;
    mpuid?: string;
  }>;
  consents: {
    lgpdGeneral: boolean;
    locationTracking: boolean;
    municipalAlerts: boolean;
    commercialOffers: boolean;
  };
}

// Module 01: citizen-identity
export interface CitizenIdentityData {
  mpuid: string;
  fullName: string;
  cpfMasked: string;
  nisOrCadUnico?: string;
  issueDate: string;
  validationQrCode: string;
  status: 'ativo' | 'em_analise' | 'bloqueado';
  tier: 'bronze' | 'prata' | 'ouro';
}

// Module 02: public-services
export interface ServiceProtocol {
  id: string;
  serviceCode: string;
  serviceTitle: string;
  category: 'infraestrutura' | 'iluminacao' | 'limpeza' | 'ouvidoria' | 'tributos' | 'social';
  citizenMpuid: string;
  citizenName: string;
  description: string;
  address: string;
  locationType: 'urbana' | 'rural' | 'ribeirinha';
  status: 'aberto' | 'em_analise' | 'em_atendimento' | 'concluido' | 'cancelado';
  createdAt: string;
  updatedAt: string;
  estimatedCompletion: string;
  feedbackRating?: number;
}

// Module 03: education
export interface School {
  id: string;
  name: string;
  type: 'urbana' | 'ribeirinha' | 'polo';
  address: string;
  gradesOffered: string[];
  totalStudents: number;
  principal: string;
  fluvialAccessOnly: boolean;
}

export interface StudentRecord {
  id: string;
  name: string;
  schoolId: string;
  schoolName: string;
  grade: string;
  shift: 'manha' | 'tarde' | 'integral';
  transportRoute?: string;
  transportType: 'terrestre' | 'fluvial_lancha' | 'fluvial_barco' | 'a_pe';
  attendanceRate: number;
  reportCard: Array<{
    subject: string;
    quarter1: number;
    quarter2: number;
    quarter3: number;
    quarter4: number;
    status: 'aprovado' | 'em_curso' | 'atencao';
  }>;
}

// Module 04: health
export interface HealthAppointment {
  id: string;
  specialty: string;
  professionalName: string;
  unitName: string;
  unitType: 'ubs_fixa' | 'ubs_fluvial';
  date: string;
  time: string;
  status: 'agendado' | 'concluido' | 'cancelado';
  protocol: string;
}

export interface VaccineDose {
  id: string;
  vaccineName: string;
  dose: string;
  batch: string;
  dateGiven: string;
  location: string;
}

// Module 05: marketplace
export interface Product {
  id: string;
  storeId: string;
  storeName: string;
  name: string;
  description: string;
  category: string;
  price: number;
  originalPrice?: number;
  imageUrl: string;
  inStock: boolean;
  stockQuantity: number;
  rating: number;
  reviewCount: number;
  isRegional: boolean;
  badge?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  customerMpuid: string;
  items: CartItem[];
  totalAmount: number;
  freightCost: number;
  freightModal: 'courier' | 'lancha_rapida' | 'retirada';
  deliveryAddress: string;
  paymentMethod: 'pix_sandbox' | 'mrt_wallet' | 'cartao_sandbox';
  status: 'criado' | 'pago' | 'em_separacao' | 'em_transito' | 'entregue';
  createdAt: string;
}

// Module 06: foodplace
export interface Restaurant {
  id: string;
  name: string;
  cuisine: string;
  rating: number;
  deliveryTimeMinutes: string;
  deliveryFee: number;
  imageUrl: string;
  isFloatingRiver: boolean; // flutuante ribeirinho
  locationName: string;
  menu: Array<{
    id: string;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
    popular?: boolean;
  }>;
}

// Module 07: freight
export interface FreightQuoteRequest {
  id: string;
  origin: string;
  destination: string;
  originType: 'urbana' | 'ribeirinha' | 'comunidade';
  destinationType: 'urbana' | 'ribeirinha' | 'comunidade';
  cargoType: 'carga_geral' | 'mudanca' | 'produtos_agro' | 'encomenda_rapida';
  weightKg: number;
  modalPreferred: 'terrestre_pickup' | 'fluvial_voadeira' | 'fluvial_barco' | 'fluvial_balsa';
  estimatedCost: number;
  transporterName?: string;
  status: 'solicitado' | 'cotado' | 'aceito' | 'em_transito' | 'entregue';
  createdAt: string;
  trackingStep: number;
}

// Module 08: tickets-mobility
export interface TripTicket {
  id: string;
  operatorName: string;
  routeTitle: string;
  origin: string;
  destination: string;
  departureTime: string;
  durationEst: string;
  modal: 'fluvial_lancha_rapida' | 'fluvial_barco_recreio' | 'rodoviario_onibus';
  price: number;
  availableSeats: number;
  seatNumber?: string;
  passengerName?: string;
  ticketCode?: string;
  status: 'disponivel' | 'reservado' | 'emitido';
}

// Module 09: professional-services
export interface ProfessionalWorker {
  id: string;
  name: string;
  profession: string;
  category: 'mecanica_fluvial' | 'construcao' | 'eletrica' | 'marcenaria' | 'servicos_domesticos' | 'turismo';
  rating: number;
  reviewsCount: number;
  hourlyOrMinRate: number;
  avatarUrl: string;
  availability: 'hoje' | 'esta_semana' | 'sob_consulta';
  description: string;
  verifiedMei: boolean;
}

// Module 10: tourism-gastronomy
export interface TouristAttraction {
  id: string;
  title: string;
  type: 'fluvial' | 'ecoturismo' | 'cultural' | 'gastronomico';
  description: string;
  location: string;
  imageUrl: string;
  highlightTag: string;
  visitingHours: string;
  entryCost: string;
}

// Module 11: agro-bioeconomy
export interface AgroProductOffer {
  id: string;
  producerName: string;
  community: string;
  productName: string;
  category: 'farinha_uarini' | 'acai' | 'castanha' | 'pescado' | 'frutas' | 'artesanato';
  pricePerUnit: string;
  availableVolume: string;
  harvestPeriod: string;
  hasTraceability: boolean;
  organicCertified: boolean;
  imageUrl: string;
}

// Module 12: wallet-rewards
export interface WalletState {
  mrtPointsBalance: number; // Promotional non-monetary points
  municipalBenefitBalance: number; // Restricted social benefit funds (e.g., Auxílio Municipal)
  sandboxFiatBalance: number; // Sandbox test funds
  recentTransactions: Array<{
    id: string;
    description: string;
    amount: number;
    type: 'credito' | 'debito';
    source: 'pontos_recompensa' | 'beneficio_municipal' | 'compra_comercio' | 'recarga_sandbox';
    date: string;
  }>;
}

// Module 13: biduga
export interface PetItem {
  id: string;
  name: string;
  species: 'cao' | 'gato';
  breed: string;
  ownerName: string;
  rabiesVaccineUpToDate: boolean;
  neutered: boolean;
  status: 'cadastrado' | 'para_adocao' | 'desaparecido';
  imageUrl: string;
  notes: string;
}

// Module 14: territorial-intelligence
export interface TerritorialIndicator {
  id: string;
  title: string;
  value: string;
  change: string;
  category: 'populacao' | 'educacao' | 'saude' | 'agro' | 'logistica';
  description: string;
}

// Module 15: advertising
export interface LocalAdvertisement {
  id: string;
  advertiserName: string;
  title: string;
  tagline: string;
  category: 'comercio' | 'servico' | 'oportunidade_emprego' | 'evento';
  imageUrl: string;
  ctaText: string;
  impressionsCount: number;
  clicksCount: number;
}
