import Image from "next/image"

interface AboutData {
  title: string
  content: string
  image_url: string | null
}

interface AboutProps {
  data: AboutData | null
}

export function About({ data }: AboutProps) {
  if (!data) return null

  return (
    <section id="nosotros" className="py-24 md:py-40 bg-background relative overflow-hidden">
      <div className="text-xs tracking-widest uppercase transition-colors text-card " />

      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Image */}
          {data.image_url && (
            <div className="relative order-2 md:order-1">
              {/* <div className="relative h-[auto] md:h-[auto] rounded-sm overflow-hidden shadow-2xl text-background"> */}
              <div className="flex flex-col rounded-sm overflow-hidden shadow-2xl">
                <Image
                src="https://i.postimg.cc/bJrdrSd4/Sobre_nosotros.jpg"
                width={400}
                height={400}
                className="w-full h-auto object-cover"
                priority
                alt={data.title}
                  // {
                  //  data.image_url ||
                  //  "https://i.postimg.cc/bJrdrSd4/Sobre_nosotros.jpg"
                  //}
                  //alt={data.title}
                  //fill
                 // className="object-cover"
                />
                <Image
                  src="https://i.postimg.cc/8zF7T6J9/Habitacion-Triple-familiar.jpg"
                  className="w-full h-auto object-cover"
                  width={"400"}
                  height={"400"}
                  //fill
                  alt={data.title}
                  
                  // {
                  //  data.image_url ||
                  //  "https://i.postimg.cc/bJrdrSd4/Sobre_nosotros.jpg"
                  //}
                  //alt={data.title}
                  //fill
                 // className="object-cover"
                />
              </div>
              {/* Decorative border accent */}
              <div className="absolute -bottom-6 -right-6 w-full h-full border-4 border-secondary rounded-sm -z-10" />
            </div>
          )}

          {/* Content */}
          <div className="space-y-8 order-1 md:order-2">
            <div className="w-24 h-1 bg-accent" />
            <h2 className="font-serif md:text-6xl lg:text-7xl font-bold text-primary text-balance leading-tight text-4xl">
              {data.title}
            </h2>
            <div className="space-y-6">
              {data.content.split("\n\n").map((paragraph, index) => (
                <p key={index} className="text-muted-foreground leading-relaxed text-base">
                  {paragraph}
                </p>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-6 pt-8">
              <div className="space-y-2">
                <p className="text-4xl font-serif font-bold text-accent">50+</p>
                <p className="text-sm text-muted-foreground">Habitaciones de lujo</p>
              </div>
              <div className="space-y-2">
                <p className="text-4xl font-serif font-bold text-accent">25</p>
                <p className="text-sm text-muted-foreground">Años de experiencia</p>
              </div>
              <div className="space-y-2">
                <p className="text-4xl font-serif font-bold text-accent">5★</p>
                <p className="text-sm text-muted-foreground">Calificación promedio</p>
              </div>
              <div className="space-y-2">
                <p className="text-4xl font-serif font-bold text-accent">24/7</p>
                <p className="text-sm text-muted-foreground">Servicio al cliente</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
