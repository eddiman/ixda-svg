import sanityClient  from './sanityClient';

export async function fetchSiteConfig() {
  try {
    const query = `*[_type == "siteConfig"][0]`;
    const siteConfig = await sanityClient.fetch(query);
    return siteConfig;
  } catch (error) {
    console.error('Error fetching site config:', error);
    return null;
  }
}

export async function fetchSponsors() {
  try {
    const query = `*[_type == "siteConfig"]{sponsors[]{..., "url": asset->url, link}}[0]`;
    const sponsors = await sanityClient.fetch(query);
    return sponsors;
  } catch (error) {
    console.error('Error fetching sponsors from site config:', error);
    return null;
  }
}
