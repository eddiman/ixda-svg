import sanityClient from "./sanityClient";

export const fetchAlbums = async () => {
    const query = `*[_type == "album"]{
      name,
      "photos": photos[].asset->url
    }`;
  
    try {
      const albums = await sanityClient.fetch(query);
      
      // Optimize image URLs
      const optimizedAlbums = albums.map(album => ({
        ...album,
        photos: album.photos.map(url => `${url}?w=800&h=600&fm=webp&q=75`) // Apply compression
      }));
  
      return optimizedAlbums;
    } catch (error) {
      console.error("Error fetching albums:", error);
      return [];
    }
  };