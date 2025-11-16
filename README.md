# 🔐 Next.js Authentication App

Aplicación de autenticación completa con Next.js 16 y NextAuth.js, implementando múltiples proveedores de autenticación con características de seguridad avanzadas.

## ✨ Características

- 🔑 Autenticación con credenciales (email/password)
- 🔒 Cifrado de contraseñas con bcrypt
- 🚫 Bloqueo de cuenta después de 5 intentos fallidos (15 minutos)
- 🌐 OAuth con Google
- 🐙 OAuth con GitHub
- 📝 Formulario de registro completo
- 🛡️ Rutas protegidas con middleware
- 🎨 UI moderna con Tailwind CSS
- 📱 Diseño responsive

## 🚀 Inicio Rápido

### 1. Instalar dependencias

```bash
npm install
```

### 2. Configurar variables de entorno

Copia `.env.example` a `.env` y configura tus credenciales:

```env
GOOGLE_CLIENT_ID=tu_google_client_id
GOOGLE_CLIENT_SECRET=tu_google_client_secret

GITHUB_CLIENT_ID=tu_github_client_id
GITHUB_CLIENT_SECRET=tu_github_client_secret

NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=genera_un_secret_aleatorio
```

### 3. Iniciar servidor de desarrollo

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 📚 Documentación

- **[INSTRUCCIONES-RAPIDAS.md](INSTRUCCIONES-RAPIDAS.md)** - Guía rápida de 5 minutos
- **[README-AUTH.md](README-AUTH.md)** - Documentación completa de autenticación
- **[RESUMEN-IMPLEMENTACION.md](RESUMEN-IMPLEMENTACION.md)** - Detalles técnicos
- **[COMANDOS-UTILES.md](COMANDOS-UTILES.md)** - Comandos y troubleshooting
- **[CHECKLIST-VERIFICACION.md](CHECKLIST-VERIFICACION.md)** - Lista de verificación

## 🎯 Rutas Disponibles

- `/` - Página principal (redirige a dashboard)
- `/register` - Registro de nuevos usuarios
- `/signin` - Inicio de sesión
- `/dashboard` - Dashboard protegido
- `/profile` - Perfil de usuario protegido
- `/test-auth` - Página de pruebas automáticas

## 🔧 Configuración OAuth

### GitHub OAuth

1. Ve a [GitHub Developer Settings](https://github.com/settings/developers)
2. Crea una nueva OAuth App
3. Callback URL: `http://localhost:3000/api/auth/callback/github`
4. Copia Client ID y Client Secret a `.env`

### Google OAuth

1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Crea un proyecto y habilita Google+ API
3. Configura OAuth consent screen
4. Authorized redirect URI: `http://localhost:3000/api/auth/callback/google`
5. Copia Client ID y Client Secret a `.env`

## 🛡️ Características de Seguridad

- **Cifrado**: bcrypt con 10 salt rounds
- **Bloqueo de cuenta**: 5 intentos fallidos = 15 minutos bloqueado
- **Validación**: Email válido, contraseña mínima 6 caracteres
- **Sesión JWT**: Estrategia segura de sesiones
- **Rutas protegidas**: Middleware de NextAuth

## 🧪 Pruebas

### Pruebas Automáticas

Visita [http://localhost:3000/test-auth](http://localhost:3000/test-auth) para ejecutar pruebas automáticas.

### Pruebas Manuales

1. Registrar un usuario en `/register`
2. Iniciar sesión con credenciales
3. Probar bloqueo de cuenta (5 intentos fallidos)
4. Probar OAuth con Google y GitHub

## 📦 Tecnologías

- **Framework**: Next.js 16 (App Router)
- **Autenticación**: NextAuth.js 4
- **Cifrado**: bcrypt
- **Estilos**: Tailwind CSS 4
- **Lenguaje**: TypeScript
- **Iconos**: React Icons

## 📁 Estructura del Proyecto

```
src/
├── app/
│   ├── api/auth/          # Endpoints de autenticación
│   ├── register/          # Página de registro
│   ├── signin/            # Página de login
│   ├── dashboard/         # Dashboard protegido
│   └── profile/           # Perfil protegido
├── components/            # Componentes React
├── lib/                   # Utilidades y lógica de negocio
└── types/                 # Tipos TypeScript
```

## ⚠️ Notas Importantes

### Base de Datos en Memoria

Actualmente usa almacenamiento en memoria. Los usuarios se pierden al reiniciar el servidor. Para producción, migra a una base de datos real (MongoDB, PostgreSQL, etc.).

Ver [README-AUTH.md](README-AUTH.md) para ejemplos de migración.

## 🚀 Despliegue

### Vercel (Recomendado)

1. Push tu código a GitHub
2. Importa el proyecto en [Vercel](https://vercel.com)
3. Configura las variables de entorno
4. Actualiza las callback URLs en GitHub/Google

### Variables de Entorno en Producción

Configura todas las variables de `.env` en tu plataforma de hosting. No uses archivos `.env` en producción.

## 🤝 Contribuir

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

## 🔗 Enlaces Útiles

- [Next.js Documentation](https://nextjs.org/docs)
- [NextAuth.js Documentation](https://next-auth.js.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [bcrypt](https://www.npmjs.com/package/bcrypt)

## 💡 Mejoras Futuras

- [ ] Recuperación de contraseña por email
- [ ] Verificación de email
- [ ] Autenticación de dos factores (2FA)
- [ ] Más proveedores OAuth (Twitter, Facebook, etc.)
- [ ] Rate limiting en endpoints
- [ ] Logs de auditoría
- [ ] Tests unitarios y de integración

## 📞 Soporte

Si tienes preguntas o problemas:

1. Revisa la [documentación completa](README-AUTH.md)
2. Consulta [comandos útiles](COMANDOS-UTILES.md)
3. Verifica el [checklist](CHECKLIST-VERIFICACION.md)

---

Hecho con ❤️ usando Next.js y NextAuth.js
