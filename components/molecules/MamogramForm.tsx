import React, { useState } from "react";

const MamogramForm: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);

  //handling ipfs
  const [ipfsUrl, setIpfsUrl] = useState<string | null>(null);
  const [issubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFilePreview(URL.createObjectURL(selectedFile));
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!file) {
      alert("Please select Mammogram");
      return;
    }

    //   setIsSubmitting(true);
    //   try {
    //     const url = await uploadFileToIPFS(file);
    //     setIpfsUrl(url);
    //     console.log("File uploaded to IPFS:", url);
    //   } catch (error) {
    //     console.error("Error uploading file to IPFS:", error);
    //   } finally {
    //     setIsSubmitting(false);
    //   }
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-md w-[100vw]">
      <h2 className="text-2xl font-semibold w-fit mb-4 mx-auto">
        Upload Mammogram
      </h2>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center space-y-4 w-fit m-auto"
      >
        <input
          type="file"
          accept=".png, .jpg, .jpeg"
          onChange={handleFileChange}
          className="p-2 border border-gray-300 rounded-md"
        />
        {/* {filePreview && (
          <img
            src={filePreview}
            alt="Preview"
            className="w-32 h-32 object-cover rounded-md"
          />
        )} */}
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400"
          disabled={!file || issubmitting}
        >
          {issubmitting ? "Uploaded Successfully" : "Upload and Mint NFT"}
        </button>
      </form>
      {ipfsUrl && (
        <p>
          you can view file in{" "}
          <a href={ipfsUrl} className="underline text-blue-100">
            here
          </a>
        </p>
      )}
    </div>
  );
};

export default MamogramForm;
