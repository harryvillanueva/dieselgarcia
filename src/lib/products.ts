import inyector from "@/assets/p-inyector.jpg";
import turbo from "@/assets/p-turbo.jpg";
import filtro from "@/assets/p-filtro.jpg";
import bomba from "@/assets/p-bomba.jpg";
import bujias from "@/assets/p-bujias.jpg";
import aceite from "@/assets/p-aceite.jpg";
import egr from "@/assets/p-egr.jpg";
import intercooler from "@/assets/p-intercooler.jpg";

export type Category =
  | "Inyección"
  | "Turbos"
  | "Filtros"
  | "Encendido"
  | "Lubricantes"
  | "Refrigeración";

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: Category;
  price: number;
  oldPrice?: number;
  rating: number;
  images: string[];
  short: string;
  description: string;
  specs: { label: string; value: string }[];
  featured?: boolean;
}

export const CATEGORIES: Category[] = [
  "Inyección",
  "Turbos",
  "Filtros",
  "Encendido",
  "Lubricantes",
  "Refrigeración",
];

export const PRODUCTS: Product[] = [
  {
    id: "inyector-crdi-2000",
    name: "Inyector Common Rail CRDi 2000",
    brand: "GarciaTech",
    category: "Inyección",
    price: 189.9,
    oldPrice: 239.9,
    rating: 4.8,
    images: [inyector, bomba, filtro],
    short: "Pulverización de precisión para motores common rail modernos.",
    description:
      "Inyector remanufacturado con tolerancias de fábrica y calibración en banco. Ofrece una pulverización uniforme que reduce el consumo, suaviza el ralentí y elimina los humos negros típicos del desgaste de la tobera.",
    specs: [
      { label: "Presión máxima", value: "1.800 bar" },
      { label: "Compatibilidad", value: "2.0 / 2.2 CRDi" },
      { label: "Garantía", value: "24 meses" },
    ],
    featured: true,
  },
  {
    id: "turbo-vgt-xl",
    name: "Turbocompresor VGT XL de geometría variable",
    brand: "Garcia Performance",
    category: "Turbos",
    price: 549.0,
    rating: 4.9,
    images: [turbo, intercooler, egr],
    short: "Respuesta inmediata a bajas vueltas y empuje constante.",
    description:
      "Turbo de geometría variable equilibrado electrónicamente con eje flotante en cojinete reforzado. Incluye junta metálica, tornillería y aceite de primer arranque para una instalación segura.",
    specs: [
      { label: "Tipo", value: "Geometría variable" },
      { label: "Actuador", value: "Electrónico calibrado" },
      { label: "Garantía", value: "24 meses" },
    ],
    featured: true,
  },
  {
    id: "filtro-combustible-pro",
    name: "Filtro de combustible Pro Diesel",
    brand: "GarciaFilter",
    category: "Filtros",
    price: 24.5,
    oldPrice: 32.0,
    rating: 4.6,
    images: [filtro, aceite, inyector],
    short: "Separación de agua del 96% y retención de 4 micras.",
    description:
      "Medio filtrante multicapa con coalescente de agua que protege la bomba de alta presión y los inyectores. Carcasa reforzada resistente al biodiésel B7.",
    specs: [
      { label: "Retención", value: "4 µm" },
      { label: "Separación de agua", value: "96%" },
      { label: "Vida útil", value: "30.000 km" },
    ],
    featured: true,
  },
  {
    id: "bomba-alta-presion-hp3",
    name: "Bomba de alta presión HP3",
    brand: "GarciaTech",
    category: "Inyección",
    price: 679.0,
    rating: 4.7,
    images: [bomba, inyector, filtro],
    short: "Caudal estable en todo el rango de revoluciones.",
    description:
      "Bomba de alta presión probada en banco electrónico con informe de caudal incluido. Sellos de nueva generación y émbolos rectificados para máxima durabilidad.",
    specs: [
      { label: "Presión", value: "1.950 bar" },
      { label: "Prueba", value: "Banco con informe" },
      { label: "Garantía", value: "18 meses" },
    ],
    featured: true,
  },
  {
    id: "bujias-precalentamiento-x5",
    name: "Kit 5 bujías de precalentamiento cerámicas",
    brand: "Garcia Ignition",
    category: "Encendido",
    price: 79.9,
    rating: 4.5,
    images: [bujias, inyector, aceite],
    short: "Arranque en frío en menos de 3 segundos.",
    description:
      "Bujías de precalentamiento con punta cerámica de alta densidad: calentamiento ultrarrápido, menor consumo eléctrico y resistencia a ciclos térmicos extremos.",
    specs: [
      { label: "Tiempo de calentamiento", value: "2,8 s" },
      { label: "Tensión", value: "11 V" },
      { label: "Unidades", value: "5 piezas" },
    ],
  },
  {
    id: "aceite-sintetico-5w30",
    name: "Aceite sintético Diesel Max 5W-30",
    brand: "GarciaLub",
    category: "Lubricantes",
    price: 42.0,
    oldPrice: 54.0,
    rating: 4.8,
    images: [aceite, filtro, bomba],
    short: "Protección DPF y baja formación de cenizas.",
    description:
      "Lubricante 100% sintético low-SAPS formulado para motores diésel con filtro de partículas. Mantiene la presión de aceite a alta temperatura y alarga los intervalos de servicio.",
    specs: [
      { label: "Viscosidad", value: "5W-30" },
      { label: "Norma", value: "ACEA C3" },
      { label: "Formato", value: "5 litros" },
    ],
  },
  {
    id: "valvula-egr-flow",
    name: "Válvula EGR Flow Control",
    brand: "GarciaTech",
    category: "Refrigeración",
    price: 158.0,
    rating: 4.4,
    images: [egr, intercooler, turbo],
    short: "Elimina tirones y testigos de gestión de gases.",
    description:
      "Válvula EGR con motor paso a paso y cuerpo mecanizado antiadherente que evita la carbonilla. Plug and play, sin necesidad de reprogramar la centralita.",
    specs: [
      { label: "Accionamiento", value: "Motor paso a paso" },
      { label: "Instalación", value: "Plug and play" },
      { label: "Garantía", value: "24 meses" },
    ],
  },
  {
    id: "intercooler-alu-sport",
    name: "Intercooler aluminio Alu Sport",
    brand: "Garcia Performance",
    category: "Refrigeración",
    price: 319.0,
    rating: 4.7,
    images: [intercooler, turbo, egr],
    short: "Hasta 18 °C menos en la admisión.",
    description:
      "Radiador de aire de admisión con núcleo bar-and-plate soldado en TIG. Mayor volumen interno con la misma pérdida de carga: más densidad de aire y menos derrateo térmico.",
    specs: [
      { label: "Núcleo", value: "Bar & plate" },
      { label: "Material", value: "Aluminio 6061" },
      { label: "Bocas", value: "63 mm" },
    ],
  },
];

export const formatPrice = (value: number) =>
  new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR" }).format(value);

export const getProduct = (id: string) => PRODUCTS.find((p) => p.id === id);
