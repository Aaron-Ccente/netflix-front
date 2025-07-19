// Recibe el nombre del poster (sin extensión) y retorna la ruta completa de la imagen si existe

const backgroundRoutes = [
  '/imagenesMovie/background/bambi.webp',

  '/imagenesMovie/background/blancaNieves.webp',

  '/imagenesMovie/background/destinoFinal.webp',

  '/imagenesMovie/background/extraterritorial.webp',

  '/imagenesMovie/background/laBalaPerdida3.webp',

  '/imagenesMovie/background/misionImposible.webp',

  '/imagenesMovie/background/thunderbolts.webp',

  '/imagenesMovie/background/tiempoDeGuerra.webp',

  '/imagenesMovie/background/tinSoldier.webp',

  '/imagenesMovie/background/unaPeliculaDeMinecraft.webp',

];

export function searchBackgroundRoute(actorName) {
  // Busca la ruta que termina con /{actorName}.webp
  return backgroundRoutes.find(route => {
    const routeName = route.split('/').pop().replace('.webp', '');
    return routeName === actorName;
  }) || null;
}