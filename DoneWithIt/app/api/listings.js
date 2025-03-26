import client from "./client";

const endpoint = "/listings";

const getListings = () => client.get(endpoint);

const addListing = async (listing, handleUploadProgress) => {
  console.log("🟡 Description Before Sending:", listing.description);

  const data = new FormData();

  console.log("📋 [addListing] Listing Data Before Conversion:", listing);

  data.append("title", listing.title);
  data.append("price", listing.price);
  data.append("categoryId", listing.category.value);
  data.append("description", listing.description || "");

  console.log(
    "🟠 [addListing] Description After Appending:",
    listing.description
  );

  listing.images.forEach((image, index) =>
    data.append("images", {
      uri: image,
      name: `image${index}.jpg`,
      type: "image/jpeg",
    })
  );

  if (listing.location)
    data.append("location", JSON.stringify(listing.location));

  console.log("📤 [addListing] FormData Sent to API:", data);

  try {
    const response = await client.post(endpoint, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    console.log("📥 [addListing] API Response:", response);
    return response;
  } catch (error) {
    console.error("❌ [addListing] Error in API Call:", error);
    return { ok: false, error };
  }
};

export default {
  addListing,
  getListings,
};
