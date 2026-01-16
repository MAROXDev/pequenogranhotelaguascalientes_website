"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Check, Star, Gift, TrendingUp } from "lucide-react"
import * as Icons from "lucide-react"
import Link from "next/link"

/* interface LoyaltyTier {
  id: string
  tier_name: string
  points_required: number
  benefits: string[]
  discount_percentage: number | null
  icon: string
  color: string
} */

export function PrivacySection() {

  return (
    <section className="py-20 px-4 md:px-6 bg-cream">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="font-serif text-4xl md:text-6xl text-brown mb-6">Política de Privacidad</h1>
          <p className="text-lg text-dark-gray max-w-3xl mx-auto leading-relaxed">
            Conoce la Política de Privadidad de nuestro hotel
          </p>
        </div>

        <div className="bg-white rounded-2xl p-8 md:p-12 mb-16 border border-brown/10">
          <h3 className="font-serif text-xl text-primary mb-2">A. Identidad del Responsable</h3>
          <p className="text-dark-gray">
            Alberto Gonzalez Mendoza conocido comercialmente como “PEQUEÑO GRAN HOTEL” con domicilio en Av. Convención Pte #207, Fracc. Modelo CP 20080 en la ciudad de Aguascalientes, Ags., es el responsable del uso y protección de sus datos personales, y al respecto le informa lo siguiente:
          </p>
        </div>

        <div className="bg-white rounded-2xl p-8 md:p-12 mb-16 border border-brown/10">
          <h3 className="font-serif text-primary text-xl mb-2">B. Datos Personales</h3>
          <p className="text-dark-gray">
           Para las finalidades establecidas en este Aviso de Privacidad, Pequeño Gran Hotel obtendrá de usted los siguientes datos, son:</p>
        <p className="text-dark-gray">
          1. Datos de identificación: nombre(s), apellido(s), domicilio, número telefónico de casa, celular y/o trabajo, estado civil, firma, correo electrónico, género, edad, fecha de nacimiento, nacionalidad o ciudadanía, numero de placas de su automóvil, principal motivo de su viaje y número de viajes al año.
        </p>
        <p className="text-dark-gray">
          2. Datos Financieros: nombre del tarjetahabiente, número de tarjeta de crédito, fecha de expiración y código de seguridad (en caso de transacciones en línea).</p>
        <p className="text-dark-gray">
          3. Datos de Facturación: nombre o razón social, RFC, domicilio fiscal 
        </p>
        <p className="text-dark-gray">
          4. Datos de Preferencias: Relacionados con la habitación, servicios requeridos y/o motivo y preferencias de viaje
        </p>
        <p className="text-dark-gray">
         Pequeño Gran Hotel obtiene o puede obtener datos personales de usted a través de los siguientes medios:
         </p>
         <p className="text-dark-gray">
         Pequeño Gran Hotel obtiene o puede obtener datos personales de usted a través de los siguientes medios:
         </p>
         <p className="text-dark-gray">
          1. De forma personal cuando usted se los proporciona a alguno de nuestros empleados, llenando formularios al hacer check-in con nosotros, o en nuestra recepción. Asimismo cuando usted contesta cuestionarios de satisfacción y opinión del servicio, o cuando se suscribe a ofertas y concursos o programas de lealtad.
          </p>

        <p className="text-dark-gray">
         2. De forma directa, cuando usted nos los proporciona vía telefónica o a través de medios electrónicos, al llenar el formulario de reservación en nuestro Sitio Web, interactuar en nuestras redes sociales o por medio de cookies o web beacons, o por medio de correo electrónico. Asimismo cuando usted contesta cuestionarios de satisfacción y opinión del servicio por medios electrónicos, o cuando se suscribe a ofertas y concursos por nuestros medios electrónicos.</p>
        
        <p className="text-dark-gray">
          3. De forma indirecta, cuando usted proporciona sus datos personales a alguno de nuestros proveedores, como agencias de viajes o terceros que nos proveen bases de datos, que nos apoyan durante los procesos de reservación y mercadeo.
        </p>
        <p className="text-dark-gray">
          Una cookie es un archivo de datos que se almacena en el disco duro de su equipo de cómputo o del dispositivo de comunicaciones electrónicas que usted usa al navegar en nuestro sitio de internet, el cual permite intercambiar información de estado entre nuestro sitio y su navegador. La información de estado puede revelar medios de identificación de sesión, autenticación o preferencias del usuario, así como cualquier dato almacenado por el navegador respecto al sitio de internet. Por el contrario, una web beacon es una imagen visible u oculta insertada dentro de nuestro sitio web o correo electrónico, que puede ser utilizada para monitorear su comportamiento en estos medios. A través de éstos se puede obtener información como la dirección IP de origen, navegador utilizado, sistema operativo, momento en que se accedió a la página, y en el caso del correo electrónico, la asociación de los datos. Los datos obtenidos por estos medios nos permiten darle mejor servicio en nuestra página. La mayoría de navegadores web permiten gestionar sus preferencias de cookies. Puede ajustar su navegador para que rechace cookies o elimine determinadas cookies. Por lo general también debería ser capaz de gestionar tecnologías similares del mismo modo que gestiona las cookies -utilizando sus preferencias del navegador-. Los siguientes links muestran como ajustar la configuración del navegador de los navegadores comúnmente usados:
        </p>

        <a className="text-primary" rel="noopener" target="_blank" href="https://support.microsoft.com/es-es/windows/administrar-cookies-en-microsoft-edge-ver-permitir-bloquear-eliminar-y-usar-168dab11-0753-043d-7c16-ede5947fc64d">
         -  Internet Explorer
        </a>
        <br/>
        <a className="text-primary" rel="noopener" target="_blank" href="https://support.mozilla.org/es/kb/Protecci%C3%B3n-contra-el-rastreo-mejorada-en-Firefox-para-escritorio?redirectslug=enable-and-disable-cookies-website-preferences&redirectlocale=en-US">
         -   Firefox
        </a>
        <br/>
        <a className="text-primary" rel="noopener" target="_blank" href="https://support.apple.com/kb/index?page=search&fac=all&q=cookies%20safari">
         -   Safari
        </a>
        <br/>
        <a className="text-primary" rel="noopener" target="_blank" href="https://support.google.com/chrome/answer/95647?hl=es">
          -  Chrome
        </a>
        <p>
          Considere que si elige bloquear cookies puede afectar al o impedir el funcionamiento de nuestra página y servicio.

          Uno de los servicios de terceros que utilizamos para seguir la actividad relacionada con el servicio, p.ej.,
           poniendo cookies, es Google Analytics. 
           Si no quiere que Google Analytics obtenga y utilice información, puede instalar un sistema de rechazo (“opt-out”) en su navegador web (<a href="tools.google.com/dlpage/gaoptout?hl=None" className="text-primary" target="_blank" rel="noopener" >tools.google.com/dlpage/gaoptout?hl=None</a>).
        </p>
        </div>

        <div className="bg-white rounded-2xl p-8 md:p-12 mb-16 border border-brown/10">
          <h3 className="font-serif text-xl text-primary mb-2">C. Datos Personales Sensibles</h3>
          <p className="text-dark-gray">
            Le informamos que Pequeño Gran Hotel no obtiene datos personales que son considerados por la LFPDPPP como datos personales sensibles. Podemos obtener datos de su tarjeta de crédito con motivo de las reservaciones y de cobro en caso de que no haga efectiva la reservación.
          </p>
          
        </div>

        <div className="bg-white rounded-2xl p-8 md:p-12 mb-16 border border-brown/10">
          <h3 className="font-serif text-xl text-primary mb-2">D. Finalidad y Tratamiento de los Datos Personales</h3>

          <p className="text-dark-gray">
           La obtención y tratamiento de los datos personales señalados, se realiza con las finalidades necesarias:
           </p>

          <p className="text-dark-gray">
           Tener registro de los huéspedes y brindarles el mejor servicio y atención posible.
           </p>

          <p className="text-dark-gray">
           Contactar a los huéspedes cuando sea necesario, incluyendo completar transacciones o brindarle servicios personalizados, o en casos de emergencia.
           </p>

          <p className="text-dark-gray">
          Obtener datos de facturación en caso de que sea requerido.
           </p>
           <p className="text-dark-gray">
          Lograr una reservación conforme a sus especificaciones y necesidades.
           </p>

           <p className="text-dark-gray">
          Obtener los datos de su tarjeta de crédito, los cuales solo serán empleados como garantía de la reservación, emitiendo un cargo solo en caso de que no hacer efectiva la reservación.
           </p>

          <p className="text-dark-gray">
          Consultarle sobre la calidad de nuestro servicio y comprender las necesidades específicas de Usted, y así poderle prestar un mejor servicio.
           </p>

          <p className="text-dark-gray">
          Cumplir con todas las disposiciones legales obligatorias para Hoteles City, en el marco de su relación comercial con Usted.
           </p>

           <p className="text-dark-gray">
          Cumplir con las obligaciones contractuales que ha celebrado con Usted en virtud de la relación comercial existente.
          </p>

          <p className="text-dark-gray">
          Proteger los intereses y derechos de Hoteles City, conforme a las disposiciones legales. Adicionalmente, tenemos las siguientes finalidades:
          </p>

        <p className="text-dark-gray">
          Inscribirle en concursos, rifas y sorteos, incluidos los digitales, lo que nos permite adecuar las promociones y avisos que le son enviados, así como contactar al ganador.
          </p>

          <p className="text-dark-gray">
          Para obtener de usted encuestas en línea y cuestionarios de satisfacción y opinión del servicio o del sitio de internet
          </p>
          <p className="text-dark-gray">
          Para enviarle publicidad personalizada y para fines mercadológicos, estadísticos y de prospección comercial.
          </p>

          <p className="text-dark-gray">
          Usted puede modificar la información para las finalidades del último apartado en cualquier momento para adecuar 
          las promociones y avisos enviados conforme a las preferencias indicadas por usted mismo, modificando las opciones 
          de seguridad en nuestra página web, o actualizando sus datos personales en su perfil. 
          Asimismo, usted puede solicitar no recibir publicidad por medio del link que aparece en cada anuncio publicitario 
          que usted recibirá, para ser eliminado de la lista de envíos del servicio de mercadotecnia y publicidad. 
          Adicionalmente puede usted contactarnos al correo 
          <a className="text-primary" rel="noopener" target="_blank" href="https://mail.google.com/mail/?view=cm&fs=1&to=datospersonales@pequenogranhotelags.com&su=Solicitud%20de%20información%20de%20la%20plataforma%20de%20Pequeño%20Gran%20Hotel">
         datospersonales@pequenogranhotelags.com
          </a> 
          y solicitar que sus datos
           no se utilicen para las finalidades no necesarias.
          </p>

          <p className="text-dark-gray">
          Igualmente le informamos que usted puede registrarse en el Registro Público de Consumidores previsto en la Ley Federal de Protección al Consumidor, y en el Registro Público de Usuarios conforme a la Ley de Protección y Defensa al Usuario de Servicios Financieros, para no recibir publicidad. En caso de que usted decida inscribirse en dichos registros, nosotros respetaremos su decisión.
          </p>
        </div>

        <div className="bg-white rounded-2xl p-8 md:p-12 mb-16 border border-brown/10">
          <h3 className="font-serif text-xl text-primary mb-2">E. Transferencia de datos personales</h3>
          <p className="text-dark-gray">
            Pequeño Gran Hotel puede transferir sus datos personales a terceros para efectos de las finalidades establecidas en este Aviso de Privacidad. Lo anterior incluye:
            </p>

            <p className="text-dark-gray">
            Sus datos personales arriba mencionados podrán ser comunicados a las autoridades competentes, conforme a la legislación aplicable. Estas transferencias pueden tener carácter nacional o internacional.
            </p>

            <p className="text-dark-gray">
            Pequeño Gran Hotel puede transferir todos o parte de los datos personales mencionados a proveedores de servicios de soporte de la página web, como son Google Analytics, con la finalidad de que provean datos como su dirección IP, servicio de estadísticas y análisis de información del uso de nuestra página. Estas transferencias pueden tener carácter nacional o internacional.
            </p>
            <p className="text-dark-gray">
            Igualmente puede enviar sus datos personales a proveedores del servicio de mercadotecnia y publicidad para el hosting de información para el envío de correos electrónicos y generación de publicidad.
            </p>
        </div>

        <div className="bg-white rounded-2xl p-8 md:p-12 mb-16 border border-brown/10">
          <h3 className="font-serif text-xl text-primary mb-2">F. Derechos ARCO</h3>
          <p className="text-dark-gray">
            De conformidad con la LFPDPPP, usted goza de los derechos de Acceso, Rectificación, Cancelación y Oposición al Tratamiento, conocidos también como “Derechos ARCO”, mismos que se explican brevemente a continuación:
            </p>
            <p className="text-primary">1. Acceso:</p>
            <p className="text-dark-gray">
             Derecho a acceder a los datos personales que conservamos de usted, así como a obtener información relativa a las condiciones en que sus datos son tratados.
            </p>
            <p className="text-primary">2. Rectificación:</p>
            <p className="text-dark-gray">
             Derecho a rectificar sus datos personales en caso de que los mismos resulten inexactos o se encuentren incompletos.
             </p>

             <p className="text-primary">3. Cancelación:</p>
            <p className="text-dark-gray">
             Derecho a solicitar que cancelemos los datos personales que tengamos de usted, cuando usted considere que los mismos no están siendo tratados conforme a los principios y deberes que establece a LFPDPPP y su Reglamento.
             </p>

             <p className="text-primary">4. Oposición al tratamiento:</p>
            <p className="text-dark-gray">
             Derecho a oponerse al tratamiento de sus datos personales, cuando exista causa legítima o para que sus datos no se traten para fines específicos.
             </p>


             <p className="text-dark-gray">
             La LFPDPPP también le concede el derecho de revocar el consentimiento otorgado previamente para el tratamiento de sus datos personales, en cualquier tiempo. Para efectos de ejercer sus derechos ARCO, para solicitar o revocar su consentimiento previamente otorgado para el tratamiento y en general, para formular cualquier duda o queja con relación al tratamiento de sus datos personales o para conocer si existen otras opciones disponibles (adicionales a las aquí establecidas) para que usted pueda limitar el uso o divulgación de sus datos, por favor contacte a nuestro Departamento de Datos Personales (“DDP”).
             </p>

             <p className="text-dark-gray">
             Sus solicitudes de cancelación, revocación y oposición al tratamiento serán evaluadas en los términos establecidos en la LFPDPPP y su procedencia o improcedencia será resuelta tomando en consideración los preceptos de la LFPDPPP y otras obligaciones que son aplicables a Pequeño Gran Hotel(fiscales, comerciales, de protección al consumidor, de seguridad pública, de salubridad, etc.). En general, por favor considere que sus solicitudes pueden no ser procedentes, en aquellos casos en los que el tratamiento sea necesario para el cumplimiento de una obligación legal impuesta o adquirida por Hoteles City.
             </p>

             <p className="text-dark-gray">
             En todos esos casos, una solicitud simple deberá ser enviada como se menciona anteriormente. Nuestro Departamento De Datos Personales le comunicará (i) la información que se le solicitará para que se identifique así como los documentos que necesitará enviar junto con su solicitud; (ii) los plazos en los que recibirá una contestación sobre su solicitud; (iii) cómo debe de presentar su solicitud, incluyendo los formularios que puede usar para presentar su solicitud, si los hubiere, y; (iv) la modalidad o medio en que le entregaremos la información a usted.
             </p>

        </div>

        <div className="bg-white rounded-2xl p-8 md:p-12 mb-16 border border-brown/10">
          <h3 className="font-serif text-xl text-primary mb-2">G. Departamento de Datos Personales (“DDP”):</h3>
          <p className="text-dark-gray">
           Nuestro DDP puede ser contactado a través de los siguientes medios:
           </p>
           <p className="text-dark-gray">
           Av. Convención Pte. No. 207, Fracc. Modelo CP 20080, Aguascalientes, Ags.
           </p>
          <p className="text-dark-gray">
           Correo Electrónico: <a className="text-primary" rel="noopener" target="_blank" href="https://mail.google.com/mail/?view=cm&fs=1&to=datospersonales@pequenogranhotelags.com&su=Solicitud%20de%20información%20de%20la%20plataforma%20de%20Pequeño%20Gran%20Hotel">
            datospersonales@pequenogranhotelags.com
          </a>
           </p>
           <p className="text-dark-gray">
           En todo caso, por favor incluya su nombre y sus datos de contacto.
           </p>
        </div>

        <div className="bg-white rounded-2xl p-8 md:p-12 mb-16 border border-brown/10">
          <h3 className="font-serif text-xl text-primary mb-2">H. Seguridad de sus Datos Personales.</h3>
          <p className="text-dark-gray">
           Pequeño Gran Hotel tomará las medidas de seguridad de la información, tanto físicas, organizacionales, y técnicas necesarias para prevenir la pérdida, uso indebido, alteración o divulgación ilegal de la información y datos personales que nos llegase a proporcionar. Los terceros a los que enviemos sus datos personales estarán sujetos a políticas de privacidad semejantes a las aquí establecidas.
           </p>
        </div>

        <div className="bg-white rounded-2xl p-8 md:p-12 mb-16 border border-brown/10">
          <h3 className="font-serif text-xl text-primary mb-2">I. Modificaciones al Aviso de privacidad.</h3>
          <p className="text-dark-gray">
           Pequeño Gran Hotel se reserva el derecho de efectuar en cualquier momento modificaciones o actualizaciones al presente aviso de privacidad, para efectos de reflejar la entrada en vigor de nuevas regulaciones o políticas internas. Estas modificaciones estarán disponibles a través de los siguientes medios: anuncios visibles en nuestros establecimientos, página de Internet, o bien, por correo electrónico. En caso de que usted no estuviera de acuerdo con dichas modificaciones, deberá enviar un correo al correo electrónico antes señalado, solicitando la cancelación de sus datos personales, conforme a la LFPDPPP.
           </p>
        </div>

      </div>
    </section>
  )
}
