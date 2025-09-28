import React, { useState, useEffect } from "react";
import {
  useCreateCSRMutation,
  useUpdateCSRMutation,
} from "../../redux/api/csrApi";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { X, Upload, Image as ImageIcon, Award } from "lucide-react";
import LazyImage from "../ui/lazy-image";
import { toast } from "sonner";

const CSRModal = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  title,
  submitText,
}) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");

  const [createCSR, { isLoading: isCreating }] = useCreateCSRMutation();
  const [updateCSR, { isLoading: isUpdating }] = useUpdateCSRMutation();

  useEffect(() => {
    if (initialData) {
      setPreviewUrl(initialData.icon || "");
    } else {
      setPreviewUrl("");
    }
    setSelectedFile(null);
  }, [initialData]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedFile && !initialData) {
      alert("Please select an image file");
      return;
    }

    try {
      const formData = {
        image: selectedFile,
        imagePreview: previewUrl,
      };

      await onSubmit(formData);
      onClose();
    } catch (error) {
      console.error("Error saving CSR:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">
            {title || (initialData ? "Edit CSR Icon" : "Add CSR Icon")}
          </h3>
          <Button variant="ghost" size="sm" onClick={onClose} className="p-1">
            <X className="w-4 h-4" />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="file">CSR Icon Image</Label>
            <div className="mt-1">
              <Input
                id="file"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
              <label
                htmlFor="file"
                className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
              >
                {previewUrl ? (
                  <LazyImage
                    src={previewUrl}
                    alt="Preview"
                    className="w-full h-full rounded-lg"
                    fallbackIcon={Award}
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload className="w-8 h-8 mb-2 text-gray-400" />
                    <p className="mb-2 text-sm text-gray-500">
                      <span className="font-semibold">Click to upload</span> CSR
                      icon
                    </p>
                    <p className="text-xs text-gray-500">
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </div>
                )}
              </label>
            </div>
            {selectedFile && (
              <p className="mt-1 text-sm text-gray-500">
                Selected: {selectedFile.name}
              </p>
            )}
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isCreating || isUpdating}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isCreating || isUpdating}>
              {isCreating || isUpdating
                ? "Saving..."
                : submitText ||
                  (initialData ? "Update CSR Icon" : "Create CSR Icon")}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CSRModal;
