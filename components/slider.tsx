'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

const imgs = [
  {
    id: 1,
    name: 'Pequeño Gran Hotel',
    image: './slider-01.jpg',
  },
  {
    id: 2,
    name: 'Jardín de San Marcos',
    image: './slider-02.jpg',
  },
  {
    id: 3,
    name: 'Un oasis de diversión: Isla San Marcos',
    image: './slider-03.jpg',
  },
  {
    id: 4,
    name: 'Una hermosa postal: Cerro del muerto',
    image: './slider-04.jpg',
  },
  {
    id: 5,
    name: 'Templo Majestuoso: Catedral',
    image: './slider-05.jpg',
  },
]

export default function Slider() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % imgs.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative h-[70vh] mb-10 w-full overflow-hidden rounded-3xl">
      {imgs.map((img, index) => (
        <div
          key={img.id}
          className={`
            absolute inset-0 transition-all duration-[1200ms] ease-in-out
            ${index === current
              ? 'opacity-100 scale-100 z-10'
              : 'opacity-0 scale-105 z-0'}
          `}
        >
          <Image
            src={img.image}
            alt={img.name}
            fill
            priority={index === 0}
            className="object-cover"
          />

          {/* Overlay glass */}
          <div className="
            absolute bottom-10 left-10 max-w-sm
            rounded-2xl px-8 py-6
            bg-white/15 backdrop-blur-xl
            text-white shadow-xl
          ">
            <h2 className="text-2xl font-semibold tracking-tight">
              {img.name}
            </h2>
            <a 
            className="mt-1 text-sm opacity-90" 
            href={`https://wa.me/52?text=Hola%20Ana,%20quiero%20conocer%20más%20sobre%20el%20${img.name}`}
            target="_blank"
            rel="noopener"
            aria-label="WhatsApp"
            >
              Conocer más
            </a>
          </div>
        </div>
      ))}

      {/* Dots */}
      <div className="absolute bottom-6 right-10 z-20 flex gap-3">
        {imgs.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`
              h-3 w-3 rounded-full transition-all duration-300
              ${index === current
                ? 'bg-white scale-125'
                : 'bg-white/40 hover:bg-white/70'}
            `}
          />
        ))}
      </div>
    </section>
  )
}
