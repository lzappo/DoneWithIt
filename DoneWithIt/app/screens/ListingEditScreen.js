import { Alert, StyleSheet } from "react-native";

import listingsApi from "../api/listings";
import CategoryPickerItem from "../components/CategoryPickerItem";
import Screen from "../components/Screen";
import {
  Form,
  FormField,
  FormPicker as Picker,
  SubmitButton,
} from "../components/forms";
import FormImagePicker from "../components/forms/FormImagePicker";
import useLocation from "../hooks/useLocation";
import { listEditValidationSchema } from "../validations/validation";

const categories = [
  {
    label: "Furniture",
    value: 1,
    backgroundColor: "#fc5c65",
    icon: "floor-lamp",
  },
  {
    label: "Clothing",
    value: 2,
    backgroundColor: "#2bcbba",
    icon: "shoe-heel",
  },
  { label: "Cameras", value: 3, backgroundColor: "#fed330", icon: "camera" },
  { label: "Cars", value: 4, backgroundColor: "#fd9644", icon: "car" },
  { label: "Games", value: 5, backgroundColor: "#26de81", icon: "cards" },
  { label: "Sports", value: 6, backgroundColor: "#45aaf2", icon: "basketball" },
  {
    label: "Movies & Music",
    value: 7,
    backgroundColor: "#4b7bec",
    icon: "headphones",
  },
  {
    label: "Books",
    value: 8,
    backgroundColor: "#9d00ff",
    icon: "book",
  },
  {
    label: "Other",
    value: 9,
    backgroundColor: "#708090",
    icon: "",
  },
];

function ListingEditScreen() {
  const location = useLocation();

  const handleSubmit = async (listing, { resetForm }) => {
    const result = await listingsApi.addListing({ ...listing, location });

    if (!result.ok) {
      Alert.alert("Could not save the listing.");
      return;
    }
    Alert.alert("Your listing was posted successfully");

    resetForm();
  };

  return (
    <Screen style={styles.container}>
      <Form
        initialValues={{
          title: "",
          price: "",
          description: "",
          category: null,
          images: [],
        }}
        onSubmit={handleSubmit}
        validationSchema={listEditValidationSchema}
      >
        <FormImagePicker name="images" />
        <FormField maxLength={255} name="title" placeholder="Title" />
        <FormField
          keyboardType="numeric"
          maxLength={8}
          name="price"
          placeholder="Price"
          width={120}
        />
        <Picker
          items={categories}
          name="category"
          numberOfColumns={3}
          PickerItemComponent={CategoryPickerItem}
          placeholder="Category"
          width="50%"
        />
        <FormField
          maxLength={255}
          multiline
          name="description"
          numberOfLines={3}
          placeholder="Description"
        />
        <SubmitButton title="Post" />
      </Form>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});

export default ListingEditScreen;
