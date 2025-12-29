import React, { useState } from "react";
import type { Property, PropertyType, HouseStyle } from "../../types";
import { PROPERTY_TYPES, HOUSE_STYLES } from "../constants";
import { generatePropertyDescription } from "../../services/generatePropertyDescription";

interface PostFormProps {
  onSubmit: (property: Property) => void;
  onCancel: () => void;
  initialData?: Property | null;
}

const PostForm: React.FC<PostFormProps> = ({
  onSubmit,
  onCancel,
  initialData,
}) => {
  const [title, setTitle] = useState(initialData?.title || "");
  const [price, setPrice] = useState(initialData?.price || "");
  const [location, setLocation] = useState(initialData?.location || "");
  const [propertyType, setPropertyType] = useState<PropertyType>(
    initialData?.propertyType || PROPERTY_TYPES[0]
  );
  const [houseStyle, setHouseStyle] = useState<HouseStyle>(
    initialData?.houseStyle || HOUSE_STYLES[0]
  );
  const [description, setDescription] = useState(
    initialData?.description || ""
  );

  const handleGenerateDescription = () => {
    const text = generatePropertyDescription({
      title,
      location,
      propertyType,
      houseStyle,
      price,
    });
    setDescription(text);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const property: Property = {
      id: initialData?.id || Date.now().toString(),
      title,
      price,
      location,
      propertyType,
      houseStyle,
      description,
    };

    onSubmit(property);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 bg-white p-6 rounded-xl shadow"
    >
      <h2 className="text-xl font-semibold">
        {initialData ? "Edit Property" : "Post New Property"}
      </h2>

      <input
        className="w-full border p-2 rounded"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <input
        className="w-full border p-2 rounded"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        required
      />

      <input
        className="w-full border p-2 rounded"
        placeholder="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        required
      />

      <select
        className="w-full border p-2 rounded"
        value={propertyType}
        onChange={(e) => setPropertyType(e.target.value as PropertyType)}
      >
        {PROPERTY_TYPES.map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>

      <select
        className="w-full border p-2 rounded"
        value={houseStyle}
        onChange={(e) => setHouseStyle(e.target.value as HouseStyle)}
      >
        {HOUSE_STYLES.map((style) => (
          <option key={style} value={style}>
            {style}
          </option>
        ))}
      </select>

      <textarea
        className="w-full border p-2 rounded"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        rows={4}
      />

      <div className="flex gap-3">
        <button
          type="button"
          onClick={handleGenerateDescription}
          className="px-4 py-2 bg-gray-200 rounded"
        >
          Generate Description
        </button>

        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Save
        </button>

        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 bg-red-500 text-white rounded"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default PostForm;

