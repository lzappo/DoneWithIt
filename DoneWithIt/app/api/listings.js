import client from "./client";
import * as FileSystem from 'expo-file-system'

const endpoint = "/listings";

const getListings = () => client.get(endpoint);

const addListing = async (listingData, formDataWithoutImg, setUploadProgress) => {
  const imageFields = listingData.getAll('images')
  const chunkSize = 512 * 512

  try {
      for (let i = 0; i < imageFields.length; i++) {
          const fileUri = imageFields[i].uri
          const fileSize = (await FileSystem.getInfoAsync(fileUri)).size

          let offset = 0
          let totalProgress = 0

          while (offset < fileSize) {

              const chunk = await FileSystem.readAsStringAsync(fileUri, {
                  encoding: FileSystem.EncodingType.Base64,
                  position: offset,
                  length: chunkSize
              })

              const chunkData = new FormData()

              Object.entries(formDataWithoutImg).forEach(([key, value]) => {
                  chunkData.append(key, value)
              })

              chunkData.append('images', {
                  uri: `data:image/jpegbase64,${chunk}`,
                  name: `image${i}.jpg`,
                  type: 'image/jpeg'
              })

              await fetch('http://127.0.0.1:9000/api/listings', {
                  method: 'POST',
                  headers: { 'Content-Type': 'multipart/form-data' },
                  body: chunkData
              })

              offset = offset + chunkSize < fileSize ? offset + chunkSize : fileSize
              totalProgress = offset / fileSize
              setUploadProgress(totalProgress)
              console.log(`Upload Progress for image ${i + 1}: ${totalProgress}`)
          }
      }
  } catch (error) {
      console.error('Error during upload:', error)
  }
};

export default {
  addListing,
  getListings,
};
