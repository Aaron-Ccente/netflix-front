// Recibe el nombre del poster (sin extensión) y retorna la ruta completa de la imagen si existe

const posterRoutes = [
  '/imagenesMovie/background/poster/bambi.webp',

  '/imagenesMovie/background/poster/blancaNieves.webp',

  '/imagenesMovie/background/poster/destinoFinal.webp',

  '/imagenesMovie/background/poster/extraterritorial.webp',

  '/imagenesMovie/background/poster/laBalaPerdida3.webp',

  '/imagenesMovie/background/poster/misionImposible.webp',

  '/imagenesMovie/background/poster/thunderbolts.webp',

  '/imagenesMovie/background/poster/tiempoDeGuerra.webp',

  '/imagenesMovie/background/poster/tinSoldier.webp',

  '/imagenesMovie/background/poster/unaPeliculaDeMinecraft.webp',

];

export function searchPosterRoute(actorName) {
  // Busca la ruta que termina con /{actorName}.webp
  return posterRoutes.find(route => {
    const routeName = route.split('/').pop().replace('.webp', '');
    return routeName === actorName;
  }) || null;
}
