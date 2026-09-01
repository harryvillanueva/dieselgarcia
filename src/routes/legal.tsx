import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/legal")({
  head: () => ({
    meta: [
      { title: "Términos, privacidad y devoluciones | dieselgarcia.com" },
      {
        name: "description",
        content:
          "Política de privacidad, términos del servicio y condiciones de devolución de dieselgarcia.com.",
      },
      { property: "og:title", content: "Términos legales | dieselgarcia.com" },
      {
        property: "og:description",
        content: "Privacidad, términos del servicio y devoluciones en 30 días.",
      },
    ],
  }),
  component: Legal;
});

const SECTIONS = [
  {
    id: "privacidad",
    title: "Política de privacidad",
    paragraphs: [
      "En dieselgarcia.com tratamos los datos personales que nos facilitas con una única finalidad: gestionar tu pedido, la garantía de las piezas y la comunicación comercial que hayas autorizado expresamente.",
      "No cedemos datos a terceros salvo a las empresas de transporte necesarias para entregar el pedido. Puedes ejercer tus derechos de acceso, rectificación, supresión y portabilidad escribiendo a soporte@dieselgarcia.com.",
      "Utilizamos cookies técnicas imprescindibles para el funcionamiento del carrito y cookies analíticas anónimas que puedes rechazar sin perder funcionalidad.",
    ],
  },
  {
    id: "terminos",
    title: "Términos de servicio",
    paragraphs: [
      "El uso de esta web implica la aceptación de las presentes condiciones. Los precios se muestran en euros con el IVA incluido y pueden variar sin previo aviso hasta la confirmación del pedido.",
      "Las imágenes de producto son orientativas. Es responsabilidad del comprador verificar la referencia de la pieza con su número de bastidor; ofrecemos asesoría gratuita para ello.",
      "La garantía cubre defectos de fabricación durante el periodo indicado en cada ficha y queda anulada si la instalación no se realiza en un taller cualificado.",
    ],
  },
  {
    id: "devoluciones",
    title: "Política de devoluciones",
    paragraphs: [
      "Dispones de 30 días naturales desde la recepción para devolver cualquier pieza sin instalar, en su embalaje original y con todos los accesorios.",
      "Las piezas con intercambio (turbos, inyectores y bombas) requieren el envío del casco usado en un plazo de 15 días para el abono del depósito.",
      "Una vez recibida y verificada la devolución, el reembolso se emite en el mismo método de pago en un plazo máximo de 14 días.",
    ],
  },
];

function Legal() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 md:px-6 md:py-16">
      <h1 className="text-4xl font-bold text-foreground md:text-5xl">Información legal</h1>
      <p className="mt-3 text-muted-foreground">
        Última actualización: enero de 2026. Documento de demostración visual.
      </p>

      <nav aria-label="Índice legal" className="mt-8 flex flex-wrap gap-2">
        {SECTIONS.map((s) => (
          <a key={s.id} href={`#${s.id}`} className="btn-base btn-outline px-5 py-2 text-base">
            {s.title}
          </a>
        ))}
      </nav>

      <div className="mt-12 space-y-14">
        {SECTIONS.map((s) => (
          <section key={s.id} id={s.id} className="scroll-mt-28">
            <h2 className="text-3xl font-bold text-primary">{s.title}</h2>
            <div className="mt-4 space-y-4">
              {s.paragraphs.map((p, i) => (
                <p key={i} className="text-[1.0625rem] leading-relaxed text-muted-foreground">
                  {p}
                </p>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
