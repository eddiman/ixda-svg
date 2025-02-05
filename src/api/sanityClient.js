import { createClient } from "@sanity/client";

const sanityClient = createClient({
  projectId: "6283nl7b", 
  dataset: "production",
  apiVersion: "2023-01-01", 
  useCdn: true, 
});

export const fetchPhotos = async () => {
  const query = `*[_type == "photo"]{
    name,
    "imageUrl": image.asset->url
  }`;

  try {
    const photos = await sanityClient.fetch(query);
    return photos;
  } catch (error) {
    console.error("Error fetching photos:", error);
    return [];
  }
};
export default sanityClient;

