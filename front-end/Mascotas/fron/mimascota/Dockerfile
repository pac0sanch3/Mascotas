FROM node:14-alpine AS builder

WORKDIR /app

COPY package*.json ./

# Instalar dependencias
RUN npm install

COPY . .

# Construir la aplicación para producción
RUN npm run build

# Usar una imagen base de Nginx para servir la aplicación
FROM nginx:alpine

# Copiar los archivos construidos desde la imagen anterior
COPY --from=0 /app/dist/ usr/share/nginx/html

# Exponer el puerto 80
EXPOSE 80

# Comando para ejecutar Nginx
CMD ["nginx", "-g", "daemon off;"]