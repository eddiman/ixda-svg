import sanityClient from "./sanityClient"; // Adjust the path to your Sanity client

const fetchAboutUs = async () => {
  try {
    const query = `*[_type == "aboutUs"][0]{
      title,
      image,
      content,
      boardDescriptionTextbox,
      boardMembers[]->{
        name,
        title,
        businessName,
        "photo": photo.asset->url
      },
      programDescriptionTextbox,
      programMembers[]->{
        name,
        title,
        businessName,
        "photo": photo.asset->url
      }
    }`;

    const data = await sanityClient.fetch(query);

    // Optimize image URLs for speakers' photos
    const optimizedBoardMembers = data.boardMembers.map((member) => ({
      ...member,
      photoUrl: `${member.photoUrl}`,
    }));

    // Merge back into data
    const optimizedData = {
      ...data,
      boardMembers: optimizedBoardMembers,
    };

    return optimizedData;
  } catch (error) {
    console.error("Error fetching About Us data:", error);
    return null;
  }
};

export default fetchAboutUs;
