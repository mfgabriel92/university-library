"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { IKImage, IKUpload, ImageKitProvider } from "imagekitio-next";
import { IKUploadResponse } from "imagekitio-next/dist/types/components/IKUpload/props";
import config from "@/lib/config";
import { toast } from "@/hooks/use-toast";

async function authenticator() {
  try {
    const response = await fetch(`${config.env.apiEndpoint}/api/auth/imagekit`);

    if (!response.ok) {
      const error = await response.text();
      throw new Error(
        `Request failed with status: ${response.status}: ${error}`,
      );
    }

    const data = await response.json();
    const { signature, expire, token } = data;

    return {
      signature,
      expire,
      token,
    };
  } catch (e: unknown) {
    if (e instanceof Error) {
      throw new Error(e.message);
    }

    throw new Error("Error aunthenticating");
  }
}

interface UploadFileInputProps {
  onFileChange: (filePath: string) => void;
}

const UploadFileInput = ({ onFileChange }: UploadFileInputProps) => {
  const ref = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<IKUploadResponse | null>(null);

  const { publicKey, urlEndpoint } = config.env.imageKit;

  function onFileUploadClick() {
    if (ref?.current) {
      ref.current.click();
    }
  }

  function onSuccess(file: IKUploadResponse) {
    setFile(file);
    onFileChange(file.filePath);
    toast({
      title: "Image uploaded",
      description: `${file.filePath} uploaded successfully`,
    });
  }

  function onError() {
    toast({
      title: "Upload failed",
      description: `The file could not be uploaded`,
      variant: "destructive",
    });
  }

  return (
    <ImageKitProvider
      publicKey={publicKey}
      urlEndpoint={urlEndpoint}
      authenticator={authenticator}
    >
      <IKUpload
        ref={ref}
        fileName="text-upload.png"
        className="hidden"
        onSuccess={onSuccess}
        onError={onError}
      />

      <button className="upload-btn" onClick={onFileUploadClick}>
        <Image
          src="/icons/upload.svg"
          width={20}
          height={20}
          alt="upload"
          className="object-contain"
        />
        <p className="text-light-100 text-base">Upload a file</p>

        {file && (
          <>
            <p className="upload-filename">{file.name}</p>
            <IKImage src={file.url} width={500} height={300} alt={file.name} />
          </>
        )}
      </button>
    </ImageKitProvider>
  );
};

export { UploadFileInput };
