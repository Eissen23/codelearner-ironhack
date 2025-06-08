import React, { useState, useEffect, useRef } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { UpdateImgCred } from "../../types/feature-data/image.type";
import { toast } from "react-toastify";

interface ImageSelectorProps {
  defaultImage?: string;
  name?: string;
  owner_id?: string;
  token: string;
  updateFunc?: (cred: UpdateImgCred) => Promise<any>;
}

const ImageSelector: React.FC<ImageSelectorProps> = ({
  defaultImage,
  name = "image",
  owner_id,
  token,
  updateFunc,
}) => {
  const updated = useRef(0);
  const [preview, setPreview] = useState<string | null>(null);
  const [upImg, setUpImg] = useState<File | undefined>();

  useEffect(() => {
    // Set default image if provided
    if (defaultImage) {
      setPreview(`${defaultImage}`);
    }

    // Cleanup function
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [defaultImage, updated]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      // Create preview URL
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);
      setUpImg(file);
    } else {
      setPreview(null);
    }
  };

  const handleCancel = () => {
    if (!defaultImage || preview === defaultImage) {
      return;
    }

    setPreview(defaultImage);
  };

  const handleAccept = async () => {
    if (preview === defaultImage || !upImg) {
      return;
    }

    if (!updateFunc) {
      return;
    }

    try {
      const response = updateFunc({
        owner_id: owner_id!,
        asset_img: upImg,
        user_token: token,
      });

      toast.promise(response, {
        pending: "Updating",
        success: "Update success",
        error: "Error updating image",
      });
      // setTimeout(() => window.location.reload(), 5000);
    } catch (error) {
      throw error;
    }
  };

  return (
    <div className="image-selector">
      {preview ? (
        <div
          className="bg-white p-1 rounded-2 mb-2 shadow-sm"
          style={{ height: "6rem", width: "6rem" }}
        >
          <div className="ratio ratio-1x1">
            <img
              src={preview}
              alt="Preview"
              className="img-fluid rounded"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
              }}
            />
          </div>
        </div>
      ) : (
        <div
          className="bg-white p-1 rounded-2 mb-2 shadow-sm"
          style={{ height: "6rem", width: "6rem" }}
        >
          <div className="ratio ratio-1x1">
            <img
              src={"https://placehold.co/150x150?text=Default\nImage"}
              alt="Default"
              className="img-fluid rounded"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
              }}
            />
          </div>
        </div>
      )}
      <InputGroup>
        <Form.Control
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          name={name}
          style={{ width: "50%" }}
        />
        <Button
          variant="light"
          className="mx-3"
          disabled={preview === defaultImage}
          onClick={handleAccept}
        >
          <i className="bi bi-check-square-fill text-success"></i>
        </Button>
        <Button
          variant="light"
          disabled={preview === defaultImage}
          onClick={handleCancel}
        >
          <i className="bi bi-x-square-fill text-danger"></i>
        </Button>
      </InputGroup>
    </div>
  );
};

export default ImageSelector;
