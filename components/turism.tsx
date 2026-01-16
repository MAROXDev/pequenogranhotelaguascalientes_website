import Image from "next/image"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Slider from "./slider"


export function Turism() {

  return (
    <section className="py-20 px-4 md:px-6 bg-cream">
      
        {/* Header */}
        <div className="text-center mb-2">
          <h1 className="font-serif text-4xl md:text-6xl text-brown mb-4 mt-6">Turismo</h1>
          <p className="text-lg text-dark-gray max-w-3xl mx-auto leading-relaxed">
            Explora los misterios de nuestros lugares turísticos
          </p>
        </div>

        <Slider />
  <div className="max-w-6xl mx-auto">
      <div className="container mx-auto px-4 relative z-10">

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            <Card
              key={"real_de_asientos"}
              className="overflow-hidden hover:shadow-2xl transition-all duration-300 group border-0 bg-white"
            >
              <div className="relative h-80 overflow-hidden">
                <Image
                  src={"./turismo01.jpg"}
                  alt={"Turismo 1"}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <CardHeader className="pb-4">
                <CardTitle className="font-serif text-3xl text-primary mb-2">Visita mágica a Real de Asientos</CardTitle>
                <CardDescription className="flex items-center gap-2 text-base">
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-muted-foreground leading-relaxed text-base">Descubre el misterio de este Pueblo Mágico que data desde 1548 visitando las edificaciones más antiguas de la religión y sus lugares con místicos artículos religiosos.</p>

                <div className="pt-6 border-t">
                  <div className="flex items-baseline gap-2">
                    <p className="text-muted-foreground leading-relaxed text-base">Recorridos a tan sólo</p>
                    <p className="text-3xl font-serif font-bold text-primary">
                      $10
                    </p>
                    <span className="text-lg font-sans text-muted-foreground">/ persona</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="pt-0">
                <Button
                  asChild
                  className="w-full bg-burgundy hover:bg-burgundy/90 text-cream hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                  size="lg"
                >
                  <a href={"#"} target="_blank" rel="noopener noreferrer">
                    Reservar Ahora
                  </a>
                </Button>
              </CardFooter>
            </Card>


            <Card
              key={"cristo_roto_de_san_josé_de_gracia"}
              className="overflow-hidden hover:shadow-2xl transition-all duration-300 group border-0 bg-white"
            >
              <div className="relative h-80 overflow-hidden">
                <Image
                  src={"./turismo02.jpg"}
                  alt={"Turismo 2"}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500  "
                />
              </div>
              <CardHeader className="pb-4">
                <CardTitle className="font-serif text-3xl text-primary mb-2">Recréate en el Cristo Roto de San José de Gracia</CardTitle>
                <CardDescription className="flex items-center gap-2 text-base">
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-muted-foreground leading-relaxed text-base">Una visita a este imponente monumento religioso es una experiencia sin igual. Además podrás disfrutar en los alrededores paseos a caballo, en lancha, cuatrimotos, trenecito y de una buena comida en sus restaurantes.</p>

                <div className="pt-6 border-t">
                </div>
              </CardContent>
              <CardFooter className="pt-0">
                <Button
                  asChild
                  className="w-full bg-burgundy hover:bg-burgundy/90 text-cream hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                  size="lg"
                >
                  <a href={"#"} target="_blank" rel="noopener noreferrer">
                    Reservar Ahora
                  </a>
                </Button>
              </CardFooter>
            </Card>

            <Card
              key={"aventura_boca_de_tunel"}
              className="overflow-hidden hover:shadow-2xl transition-all duration-300 group border-0 bg-white"
            >
              <div className="relative h-80 overflow-hidden">
                <Image
                  src={"./turismo03.jpg"}
                  alt={"Turismo 3"}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500  "
                />
              </div>
              <CardHeader className="pb-4">
                <CardTitle className="font-serif text-3xl text-primary mb-2">Vive el Parque Aventura Boca de Túnel</CardTitle>
                <CardDescription className="flex items-center gap-2 text-base">
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-muted-foreground leading-relaxed text-base">Si eres adicto a la adrenalina y a aventuras divertidas sin duda es el lugar para ti. Más de 560 metros de puentes colgantes y tirolesas. Se cuenta con todo el equipo para una aventura con seguridad.</p>

                <div className="pt-6 border-t">
                  <div className="flex flex-col items-baseline gap-2">
                    <p className="text-muted-foreground leading-relaxed text-base">Para más información: </p>
                    <div className="flex gap-2">
                      <p className="text-xl font-serif font-bold text-primary">
                        01 (465) 107 01 15
                      </p>
                      <span className="text-lg font-sans text-muted-foreground">y</span>
                      <p className="text-xl font-serif font-bold text-primary">
                        01 (465) 107 01 15
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="pt-0">
                <Button
                  asChild
                  className="w-full bg-burgundy hover:bg-burgundy/90 text-cream hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                  size="lg"
                >
                  <a href={"#"} target="_blank" rel="noopener noreferrer">
                    Reservar Ahora
                  </a>
                </Button>
              </CardFooter>
            </Card>

              <Card
              key={"tranvias"}
              className="overflow-hidden hover:shadow-2xl transition-all duration-300 group border-0 bg-white"
            >
              <div className="relative h-80 overflow-hidden">
                <Image
                  src={"./turismo04.jpg"}
                  alt={"Turismo 4"}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500  "
                />
              </div>
              <CardHeader className="pb-4">
                <CardTitle className="font-serif text-3xl text-primary mb-2">Descubre la ciudad a través de los tranvías</CardTitle>
                <CardDescription className="flex items-center gap-2 text-base">
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-muted-foreground leading-relaxed text-base">Déjate llevar por las calles y avenidas de la ciudad mientras nuestros guías te explican cada uno de los puntos del recorrido a través de los Tranvías Turísticos. Las salidas son desde las diez de la mañana hasta las siete de la tarde a sábados y el domingo hasta las cinco de la tarde.</p>

                <div className="pt-6 border-t">
                  <div className="flex flex-col items-center gap-2">
                    <p className="text-muted-foreground leading-relaxed text-base">Para más información: </p>
                    <div className="flex gap-2">
                      <p className="text-xl font-serif font-bold text-primary">
                        01 (449) 915 95 04
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="pt-0">
                <Button
                  asChild
                  className="w-full bg-burgundy hover:bg-burgundy/90 text-cream hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                  size="lg"
                >
                  <a href={"#"} target="_blank" rel="noopener noreferrer">
                    Reservar Ahora
                  </a>
                </Button>
              </CardFooter>
            </Card>

            <Card
              key={"balnearios"}
              className="overflow-hidden hover:shadow-2xl transition-all duration-300 group border-0 bg-white"
            >
              <div className="relative h-80 overflow-hidden">
                <Image
                  src={"./turismo01.jpg"}
                  alt={"Turismo 1"}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500  "
                />
              </div>
              <CardHeader className="pb-4">
                <CardTitle className="font-serif text-3xl text-primary mb-2">
                  Visita los parques acuáticos y balnearios
                </CardTitle>
                <CardDescription className="flex items-center gap-2 text-base">
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-muted-foreground leading-relaxed text-base">
                  Los baños de Ojocaliente y el Balneario de Valladolid cuentan con agua termal y son espacios muy visitados en estas fechas ya que este tipo de agua contiene propiedades curativas para personas mayores.
                </p>

                <div className="pt-6 border-t">
                </div>
              </CardContent>
              <CardFooter className="pt-0">
                <Button
                  asChild
                  className="w-full bg-burgundy hover:bg-burgundy/90 text-cream hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                  size="lg"
                >
                  <a href={"#"} target="_blank" rel="noopener noreferrer">
                    Reservar Ahora
                  </a>
                </Button>
              </CardFooter>
            </Card>

            <Card
              key={"isla_san_marcos"}
              className="overflow-hidden hover:shadow-2xl transition-all duration-300 group border-0 bg-white"
            >
              <div className="relative h-80 overflow-hidden">
                <Image
                  src={"./turismo06.jpg"}
                  alt={"Turismo 6"}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500  "
                />
              </div>
              <CardHeader className="pb-4">
                <CardTitle className="font-serif text-3xl flex flex-col text-primary mb-2">
                  <p>Isla</p>
                  <p>San Marcos</p>
                </CardTitle>
                <CardDescription className="flex items-center gap-2 text-base">
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-muted-foreground leading-relaxed text-base">Descubre la magia y los secretos de esta isla de ensueño, un espacio único que combina naturaleza, entretenimiento y tradición, lista para descubrir, un paraíso en la ciudad.</p>

                <div className="pt-6 border-t">
                </div>
              </CardContent>
              <CardFooter className="pt-0">
                <Button
                  asChild
                  className="w-full bg-burgundy hover:bg-burgundy/90 text-cream hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                  size="lg"
                >
                  <a href={"#"} target="_blank" rel="noopener noreferrer">
                    Reservar Ahora
                  </a>
                </Button>
              </CardFooter>
            </Card>

        </div>
      </div>
      </div>

    </section>
  )
}
