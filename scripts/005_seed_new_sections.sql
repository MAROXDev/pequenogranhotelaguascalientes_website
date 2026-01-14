-- Insert hotel policies
INSERT INTO hotel_policies (category, title, content, icon, display_order) VALUES
('check-in', 'Check-in y Check-out', 'Check-in: 3:00 PM | Check-out: 12:00 PM. Check-in anticipado y check-out tardío sujeto a disponibilidad con cargo adicional.', 'Clock', 1),
('cancelacion', 'Política de Cancelación', 'Cancelación gratuita hasta 48 horas antes de la llegada. Cancelaciones posteriores tendrán un cargo del 50% de la primera noche.', 'XCircle', 2),
('mascotas', 'Mascotas', 'Aceptamos mascotas pequeñas (hasta 10kg) con cargo adicional de $500 por noche. Debe notificarse al momento de la reserva.', 'Heart', 3),
('fumadores', 'Política de No Fumadores', 'Todas nuestras habitaciones son libres de humo. Contamos con área designada para fumadores en la terraza.', 'Cigarette', 4),
('ninos', 'Niños', 'Los niños menores de 12 años se hospedan gratis usando las camas existentes. Cunas disponibles sin cargo adicional.', 'Baby', 5),
('pago', 'Formas de Pago', 'Aceptamos efectivo, tarjetas de crédito y débito (Visa, Mastercard, American Express). Se requiere tarjeta de crédito como garantía.', 'CreditCard', 6);

-- Insert offers
INSERT INTO offers (title, description, discount_percentage, image_url, valid_from, valid_until, terms, is_active, display_order) VALUES
('Oferta de Temporada', 'Disfruta de un 25% de descuento en estancias de 3 noches o más durante temporada baja', 25, '/placeholder.svg?height=400&width=600', '2024-05-01', '2024-10-31', 'Válido de lunes a jueves. No acumulable con otras promociones. Sujeto a disponibilidad.', true, 1),
('Romance Package', 'Escapada romántica con decoración especial, cena para dos y botella de vino incluida', 15, '/placeholder.svg?height=400&width=600', '2024-01-01', '2024-12-31', 'Reserva mínima de 2 noches. Incluye desayuno buffet para dos personas.', true, 2),
('Negocios Plus', 'Tarifa especial para empresas con desayuno incluido y acceso a sala de juntas', 20, '/placeholder.svg?height=400&width=600', '2024-01-01', '2024-12-31', 'Requiere identificación empresarial. Válido de domingo a jueves.', true, 3),
('Early Bird', 'Reserva con 30 días de anticipación y ahorra 30%', 30, '/placeholder.svg?height=400&width=600', '2024-01-01', '2024-12-31', 'Pago total requerido al momento de la reserva. No reembolsable.', true, 4);

-- Insert hotel services
INSERT INTO hotel_services (name, description, icon, image_url, category, is_included, additional_cost, display_order) VALUES
('Wi-Fi de Alta Velocidad', 'Internet inalámbrico gratuito en todas las áreas del hotel con velocidad de hasta 100 Mbps', 'Wifi', '/placeholder.svg?height=300&width=400', 'Incluido', true, 0, 1),
('Desayuno Buffet', 'Buffet continental con platillos mexicanos e internacionales servido de 7:00 AM a 11:00 AM', 'Coffee', '/placeholder.svg?height=300&width=400', 'Adicional', false, 250, 2),
('Estacionamiento', 'Estacionamiento privado vigilado 24/7 con capacidad para 40 vehículos', 'Car', '/placeholder.svg?height=300&width=400', 'Incluido', true, 0, 3),
('Servicio a Habitación', 'Disponible las 24 horas con menú completo de alimentos y bebidas', 'UtensilsCrossed', '/placeholder.svg?height=300&width=400', 'Adicional', false, 0, 4),
('Gimnasio', 'Gimnasio equipado abierto 24/7 con equipo cardiovascular y de fuerza', 'Dumbbell', '/placeholder.svg?height=300&width=400', 'Incluido', true, 0, 5),
('Centro de Negocios', 'Salas de juntas, computadoras, impresora y servicio de fax disponibles', 'Briefcase', '/placeholder.svg?height=300&width=400', 'Incluido', true, 0, 6),
('Lavandería', 'Servicio de lavandería y tintorería con entrega en 24 horas', 'Shirt', '/placeholder.svg?height=300&width=400', 'Adicional', false, 150, 7),
('Concierge', 'Asistencia para reservas de tours, restaurantes y transporte', 'Concierge', '/placeholder.svg?height=300&width=400', 'Incluido', true, 0, 8);

-- Insert loyalty program tiers
INSERT INTO loyalty_program (tier_name, points_required, benefits, discount_percentage, icon, color, display_order) VALUES
('Bronce', 0, ARRAY['5% descuento en todas las reservas', 'Check-out tardío hasta las 2 PM', 'Welcome drink de cortesía', 'Wi-Fi premium gratuito'], 5, 'Award', '#CD7F32', 1),
('Plata', 1000, ARRAY['10% descuento en todas las reservas', 'Check-out tardío hasta las 4 PM', 'Upgrade de habitación sujeto a disponibilidad', 'Desayuno incluido', '20% descuento en servicios del hotel'], 10, 'Medal', '#C0C0C0', 2),
('Oro', 3000, ARRAY['15% descuento en todas las reservas', 'Check-out tardío hasta las 6 PM', 'Upgrade garantizado de habitación', 'Desayuno y cena incluidos', '30% descuento en servicios del hotel', 'Acceso prioritario a ofertas exclusivas'], 15, 'Crown', '#FFD700', 3),
('Platinum', 6000, ARRAY['20% descuento en todas las reservas', 'Check-out flexible', 'Suite upgrade garantizado', 'Todas las comidas incluidas', '50% descuento en servicios del hotel', 'Acceso exclusivo a eventos VIP', 'Reserva garantizada incluso en temporada alta'], 20, 'Gem', '#E5E4E2', 4);

-- Update existing rooms and add new ones
UPDATE rooms SET room_type = 'suite', size_sqm = 45, bed_type = 'King Size', view_type = 'Ciudad', floor = 3, available_count = 2, features = ARRAY['Área de estar', 'Escritorio ejecutivo', 'Vista panorámica', 'Baño de lujo con bañera'] WHERE name = 'Suite Ejecutiva';

UPDATE rooms SET room_type = 'deluxe', size_sqm = 32, bed_type = 'Queen Size', view_type = 'Ciudad', floor = 2, available_count = 5, features = ARRAY['Balcón privado', 'Minibar', 'Cafetera Nespresso'] WHERE name = 'Habitación Deluxe';

UPDATE rooms SET room_type = 'standard', size_sqm = 25, bed_type = 'Full Size', view_type = 'Interior', floor = 1, available_count = 8, features = ARRAY['Diseño moderno', 'Baño completo'] WHERE name = 'Habitación Estándar';

-- Insert additional rooms to reach 36 total
INSERT INTO rooms (name, description, price_per_night, capacity, image_url, amenities, display_order, room_type, size_sqm, bed_type, view_type, floor, available_count, features) VALUES
-- Sencillas (6 rooms)
('Habitación Sencilla Clásica', 'Acogedora habitación individual perfecta para viajeros de negocios o turistas solos.', 950.00, 1, '/placeholder.svg?height=600&width=800', ARRAY['Wi-Fi gratuito', 'TV por cable', 'Aire acondicionado', 'Escritorio', 'Baño privado'], 4, 'sencilla', 18, 'Individual', 'Interior', 1, 6, ARRAY['Diseño funcional', 'Espacio de trabajo']),

-- Dobles (8 rooms)
('Habitación Doble Superior', 'Habitación espaciosa con dos camas matrimoniales, ideal para familias o amigos.', 1400.00, 4, '/placeholder.svg?height=600&width=800', ARRAY['Wi-Fi de alta velocidad', 'TV Smart 43"', 'Aire acondicionado', 'Minibar', 'Caja fuerte', 'Baño completo'], 5, 'doble', 30, 'Dos Matrimoniales', 'Ciudad', 2, 4, ARRAY['Espacio amplio', 'Área de estar']),

('Habitación Doble Estándar', 'Confortable habitación con dos camas individuales.', 1300.00, 2, '/placeholder.svg?height=600&width=800', ARRAY['Wi-Fi gratuito', 'TV por cable', 'Aire acondicionado', 'Baño privado'], 6, 'doble', 28, 'Dos Individuales', 'Interior', 1, 4, ARRAY['Funcional', 'Cómoda']),

-- Triples (4 rooms)
('Habitación Triple Familiar', 'Amplia habitación con una cama king y una individual, perfecta para familias.', 1900.00, 3, '/placeholder.svg?height=600&width=800', ARRAY['Wi-Fi de alta velocidad', 'TV Smart 50"', 'Aire acondicionado', 'Minibar', 'Caja fuerte', 'Baño amplio', 'Área de estar'], 7, 'triple', 35, 'King + Individual', 'Ciudad', 2, 4, ARRAY['Ideal familias', 'Espacio generoso', 'Sofá cama disponible']),

-- Junior Suites (5 rooms)
('Junior Suite', 'Suite junior con sala de estar integrada y acabados de lujo.', 2200.00, 2, '/placeholder.svg?height=600&width=800', ARRAY['Wi-Fi premium', 'TV Smart 55"', 'Aire acondicionado', 'Caja fuerte', 'Minibar premium', 'Cafetera Nespresso', 'Baño de lujo', 'Balcón'], 8, 'junior_suite', 40, 'King Size', 'Ciudad', 3, 3, ARRAY['Sala de estar', 'Balcón privado', 'Baño con bañera', 'Amenidades de lujo']),

('Junior Suite Deluxe', 'Junior suite con vistas privilegiadas y decoración elegante.', 2400.00, 2, '/placeholder.svg?height=600&width=800', ARRAY['Wi-Fi premium', 'TV Smart 55"', 'Aire acondicionado', 'Caja fuerte', 'Minibar premium', 'Cafetera Nespresso', 'Baño de lujo con bañera', 'Balcón amplio'], 9, 'junior_suite', 42, 'King Size', 'Panorámica', 4, 2, ARRAY['Vista espectacular', 'Sala de estar', 'Barra de café', 'Terraza privada']),

-- Suites (6 rooms)
('Suite Premium', 'Suite de lujo con dormitorio separado y sala de estar espaciosa.', 2800.00, 2, '/placeholder.svg?height=600&width=800', ARRAY['Wi-Fi premium', 'TV Smart 65" en sala + 55" en recámara', 'Aire acondicionado', 'Caja fuerte', 'Minibar premium', 'Cafetera Nespresso', 'Baño de lujo con jacuzzi', 'Balcón'], 10, 'suite', 50, 'King Size', 'Ciudad', 4, 3, ARRAY['Dormitorio separado', 'Sala de estar amplia', 'Baño con jacuzzi', 'Escritorio ejecutivo', 'Comedor para 4']),

('Suite Royal', 'Nuestra suite más lujosa con las mejores vistas y acabados premium.', 3500.00, 2, '/placeholder.svg?height=600&width=800', ARRAY['Wi-Fi premium', 'TV Smart 75" en sala + 55" en recámara', 'Aire acondicionado inteligente', 'Caja fuerte', 'Minibar premium', 'Cafetera Nespresso', 'Baño de mármol con jacuzzi', 'Terraza privada'], 11, 'suite', 60, 'King Size California', 'Panorámica 360°', 5, 1, ARRAY['Penthouse', 'Dormitorio principal', 'Sala de estar de lujo', 'Baño de mármol', 'Terraza amplia', 'Comedor para 6', 'Bar privado']),

('Suite Nupcial', 'Suite romántica especialmente diseñada para lunas de miel y ocasiones especiales.', 3200.00, 2, '/placeholder.svg?height=600&width=800', ARRAY['Wi-Fi premium', 'TV Smart 65"', 'Aire acondicionado', 'Caja fuerte', 'Minibar premium con champagne', 'Cafetera Nespresso', 'Baño de lujo con bañera de hidromasaje', 'Terraza romántica'], 12, 'suite', 55, 'King Size Premium', 'Ciudad', 4, 2, ARRAY['Decoración romántica', 'Jacuzzi privado', 'Champagne de bienvenida', 'Pétalos de rosa', 'Chocolates gourmet']);

-- Add more room variations to reach 36 total
-- Additional Standard rooms
INSERT INTO rooms (name, description, price_per_night, capacity, image_url, amenities, display_order, room_type, size_sqm, bed_type, view_type, floor, available_count, features) VALUES
('Habitación Estándar Plus', 'Habitación estándar con vistas mejoradas y comodidades adicionales.', 1350.00, 2, '/placeholder.svg?height=600&width=800', ARRAY['Wi-Fi gratuito', 'TV Smart 43"', 'Aire acondicionado', 'Minibar', 'Baño privado'], 13, 'standard', 27, 'Queen Size', 'Ciudad', 2, 3, ARRAY['Vista mejorada', 'Espacio cómodo']);
