import abrilImage from "../assets/photos/abril.jpg";
import agostoImage from "../assets/photos/agosto.jpg";
import diciembreImage from "../assets/photos/diciembre.jpg";
import eneroImage from "../assets/photos/enero.jpg";
import febreroImage from "../assets/photos/febrero.jpg";
import julioImage from "../assets/photos/julio.jpg";
import junioImage from "../assets/photos/junio.jpg";
import marzoImage from "../assets/photos/marzo.jpg";
import mayoImage from "../assets/photos/mayo.jpg";
import noviembreImage from "../assets/photos/noviembre.jpg";
import octubreImage from "../assets/photos/octubre.jpg";
import septiembreImage from "../assets/photos/septiembre.jpg";

export type Memory = {
  id: string;
  month: string;
  image: string;
  frontText: string;
  backNote: string;
  backSignature: string;
  rotation: number;
  position: {
    x: number;
    y: number;
    zIndex: number;
  };
  entry: {
    x: number;
    y: number;
    rotate: number;
  };
};

// Cambia aquí las frases, notas, rotaciones y posiciones de cada Polaroid.
export const memories: Memory[] = [
  {
    id: "julio",
    month: "Julio",
    image: julioImage,
    frontText: "Aquí empezó nuestra historia.",
    backNote:
      "Me encanta volver a este recuerdo porque tiene esa magia de las primeras veces: nervios, ilusión y una sonrisa que todavía me acompaña.",
    backSignature: "Y sí, también pienso en conducir el Polo. Vaya carro.",
    rotation: -7,
    position: { x: 4, y: 8, zIndex: 4 },
    entry: { x: -160, y: -80, rotate: -18 },
  },
  {
    id: "agosto",
    month: "Agosto",
    image: agostoImage,
    frontText: "El verano supo a nosotros.",
    backNote:
      "Este mes nada podía ir mal: eran las fiestas del mejor pueblo de Sanabria. Y lo mejor de todo es que lo compartí contigo.",
    backSignature: "No, no era Cobreros. Seguimos fuertes.",
    rotation: 4,
    position: { x: 24, y: 5, zIndex: 6 },
    entry: { x: 40, y: -180, rotate: 20 },
  },
  {
    id: "septiembre",
    month: "Septiembre",
    image: septiembreImage,
    frontText: "Volver era más bonito contigo.",
    backNote:
      "A veces te olvidabas de mí, pero volver a Madrid contigo lo hacía todo un poco más fácil.",
    backSignature: "Las Victorias te perdonan. Yo, casi.",
    rotation: -3,
    position: { x: 45, y: 9, zIndex: 3 },
    entry: { x: 150, y: -90, rotate: -16 },
  },
  {
    id: "octubre",
    month: "Octubre",
    image: octubreImage,
    frontText: "Cada paseo tenía algo especial.",
    backNote:
      "A este mes le guardo especial cariño porque fue cuando te engañé por primera vez para hacer nuestro primer viaje, y qué bien lo pasamos.",
    backSignature: "La carretera de ida merece su propio capítulo.",
    rotation: 6,
    position: { x: 66, y: 11, zIndex: 5 },
    entry: { x: 190, y: 20, rotate: 18 },
  },
  {
    id: "noviembre",
    month: "Noviembre",
    image: noviembreImage,
    frontText: "El frío nos acercó un poquito más.",
    backNote:
      "Me quedo con los planes, con las risas y con esa sensación de que contigo incluso noviembre tenía algo especial.",
    backSignature: "Lo de Dani Martín fue nivel jefe. No te acostumbres.",
    rotation: 5,
    position: { x: 12, y: 37, zIndex: 7 },
    entry: { x: -180, y: 40, rotate: 19 },
  },
  {
    id: "diciembre",
    month: "Diciembre",
    image: diciembreImage,
    frontText: "Luces, planes y tú.",
    backNote:
      "Me hizo especial ilusión que vinieras conmigo a Salamanca y enseñarte un pedacito de una historia que también quería compartir contigo.",
    backSignature: "Salamanca aprobada. Nochevieja, pendiente.",
    rotation: -6,
    position: { x: 33, y: 34, zIndex: 9 },
    entry: { x: -80, y: 140, rotate: -22 },
  },
  {
    id: "enero",
    month: "Enero",
    image: eneroImage,
    frontText: "Empezar el año de tu mano.",
    backNote:
      "Si el año tenía que empezar de alguna manera, no se me ocurre una más chula que yendo a Londres, y encima contigo.",
    backSignature: "Construí un restaurante para sobrevivir. Normal.",
    rotation: 3,
    position: { x: 54, y: 35, zIndex: 6 },
    entry: { x: 80, y: 160, rotate: 16 },
  },
  {
    id: "febrero",
    month: "Febrero",
    image: febreroImage,
    frontText: "Nuestro mes más tierno.",
    backNote:
      "Disney fue de esos recuerdos que se quedan guardados con ruido, luces, emoción y muchísimas ganas de volver a reírnos de todo.",
    backSignature: "DIS POTA NEY queda registrado oficialmente.",
    rotation: -5,
    position: { x: 73, y: 40, zIndex: 5 },
    entry: { x: 180, y: 110, rotate: -20 },
  },
  {
    id: "marzo",
    month: "Marzo",
    image: marzoImage,
    frontText: "Pequeños días, enormes recuerdos.",
    backNote:
      "El cumpleaños que más ilusión me ha hecho de mi vida. Gracias por esforzarte tanto y por hacerlo tan bonito.",
    backSignature: "La tarta era de 6, pero el esfuerzo de 10.",
    rotation: 4,
    position: { x: 5, y: 64, zIndex: 4 },
    entry: { x: -150, y: 160, rotate: 17 },
  },
  {
    id: "abril",
    month: "Abril",
    image: abrilImage,
    frontText: "Todo florecía un poco más.",
    backNote:
      "A algunos se nos da mejor organizar cumpleaños que a otros, sí. Pero lo importante es que abril también terminó siendo muy nuestro.",
    backSignature: "El HotPot maja, pero no me liaría. Contigo sí.",
    rotation: -4,
    position: { x: 26, y: 66, zIndex: 6 },
    entry: { x: -40, y: 190, rotate: -15 },
  },
  {
    id: "mayo",
    month: "Mayo",
    image: mayoImage,
    frontText: "La calma también era aventura.",
    backNote:
      "Qué bonito fue nuestro viaje a Guimarães. Me gusta descubrir sitios contigo y que hasta perderse parezca buen plan.",
    backSignature: "Organización impecable. Qué sorpresa: fui yo.",
    rotation: 5,
    position: { x: 48, y: 63, zIndex: 5 },
    entry: { x: 80, y: 210, rotate: 18 },
  },
  {
    id: "junio",
    month: "Junio",
    image: junioImage,
    frontText: "Un año entero eligiéndonos.",
    backNote:
      "Algún que otro bache, pero yo creo que lo HE(mos) gestionado bastante bien. Han sido los mejores 12 meses de mi vida y te quiero con locura.",
    backSignature: "Lo HE(mos) hecho de cine. Admito aplausos.",
    rotation: -3,
    position: { x: 70, y: 66, zIndex: 8 },
    entry: { x: 180, y: 170, rotate: -14 },
  },
];
