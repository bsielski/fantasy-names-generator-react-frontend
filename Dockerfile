# --- Etap 1: Budowanie Aplikacji React (Builder) ---
# Używamy nowszej, stabilnej wersji Node.js i Alpine
FROM node:18-alpine AS builder


# DODAJ TE DWIE LINIE NA SAMEJ GÓRZE ETAPU
ARG REACT_APP_API_HOST
ENV REACT_APP_API_HOST=$REACT_APP_API_HOST

# Ustawiamy katalog roboczy
WORKDIR /app

# Kopiujemy pliki manifestu i instalujemy zależności
# To jest optymalizacja cache'owania - zależności instalują się tylko, gdy package.json się zmieni
COPY package.json package-lock.json ./
RUN npm install

# Kopiujemy resztę kodu źródłowego aplikacji
COPY src ./src
COPY public ./public

# Budujemy aplikację produkcyjną
RUN export NODE_OPTIONS=--openssl-legacy-provider && npm run build

# --- Etap 2: Serwowanie Plików Statycznych (Runner) ---
# Zaczynamy od nowa, z leciutkiego obrazu Nginx
FROM nginx:1.25-alpine

# Usuwamy domyślną, powitalną stronę Nginx
RUN rm -rf /usr/share/nginx/html/*

# Kopiujemy gotowe, zoptymalizowane pliki z etapu 'builder'
# Wynik `npm run build` znajduje się w katalogu /app/build
COPY --from=builder /app/build /usr/share/nginx/html

# Kopiujemy własną, prostą konfigurację Nginx
# Ten plik będzie w tym samym katalogu co Dockerfile
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Wystawiamy port 80, na którym Nginx nasłuchuje
EXPOSE 80

# Domyślne polecenie startowe Nginx
CMD ["nginx", "-g", "daemon off;"]
