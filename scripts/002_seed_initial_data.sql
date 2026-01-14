-- Insert initial hero section
INSERT INTO hero_section (title, subtitle, image_url, cta_text, cta_link) VALUES
('Pequeño Gran Hotel', 'Un refugio de elegancia y confort en el corazón de Aguascalientes', '/placeholder.svg?height=800&width=1920', 'Reservar Ahora', '#contacto');

-- Insert initial about section
INSERT INTO about_section (title, content, image_url) VALUES
('Bienvenidos a Pequeño Gran Hotel', 
'Descubre un oasis de tranquilidad donde la elegancia clásica se encuentra con el confort moderno. Nuestro hotel boutique ofrece una experiencia única que combina la calidez de la hospitalidad mexicana con servicios de primera clase. 

Cada detalle ha sido cuidadosamente diseñado para crear espacios que inspiran y relajan, desde nuestras habitaciones elegantemente decoradas hasta nuestras áreas comunes llenas de carácter y distinción.',
'/placeholder.svg?height=600&width=900');

-- Insert initial rooms
INSERT INTO rooms (name, description, price_per_night, capacity, image_url, amenities, display_order) VALUES
('Suite Ejecutiva', 
'Espaciosa suite con área de estar separada, ideal para estancias de negocios o placer. Incluye escritorio ejecutivo, minibar y vistas panorámicas de la ciudad.',
2500.00,
2,
'/placeholder.svg?height=600&width=800',
ARRAY['Wi-Fi de alta velocidad', 'TV Smart 55"', 'Aire acondicionado', 'Caja fuerte', 'Minibar', 'Cafetera Nespresso', 'Baño de lujo'],
1),

('Habitación Deluxe', 
'Habitación elegante con todas las comodidades para una estancia memorable. Decoración clásica con toques modernos.',
1800.00,
2,
'/placeholder.svg?height=600&width=800',
ARRAY['Wi-Fi de alta velocidad', 'TV Smart 43"', 'Aire acondicionado', 'Caja fuerte', 'Minibar', 'Secadora de cabello'],
2),

('Habitación Estándar', 
'Acogedora habitación con todo lo necesario para una estancia confortable. Perfecta para viajeros que buscan calidad y buen precio.',
1200.00,
2,
'/placeholder.svg?height=600&width=800',
ARRAY['Wi-Fi gratuito', 'TV por cable', 'Aire acondicionado', 'Baño privado'],
3);

-- Insert initial gallery images
INSERT INTO gallery (title, image_url, category, display_order) VALUES
('Fachada Principal', '/placeholder.svg?height=600&width=800', 'exterior', 1),
('Lobby', '/placeholder.svg?height=600&width=800', 'interiores', 2),
('Suite Premium', '/placeholder.svg?height=600&width=800', 'habitaciones', 3),
('Restaurante', '/placeholder.svg?height=600&width=800', 'servicios', 4),
('Terraza', '/placeholder.svg?height=600&width=800', 'exterior', 5),
('Baño de Suite', '/placeholder.svg?height=600&width=800', 'habitaciones', 6);

-- Insert contact information
INSERT INTO contact_info (address, phone, email, whatsapp, instagram, facebook) VALUES
('Calle Principal 123, Centro Histórico, Aguascalientes, Ags. 20000',
'+52 449 123 4567',
'info@pequenogranhotel.com',
'+525491234567',
'@pequenogranhotelags',
'pequenogranhotelags');
