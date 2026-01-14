"use client"

import config from "@/lib/config";
import { useState } from "react";
import Image from "next/image";
import { IKImage, IKUpload, ImageKitProvider } from "imagekitio-next";
import { useRef } from "react";
import { Toast } from "./Toaster";

const {
  env: {
    imagekit: { publicKey, urlEndpoint }
  }
} = config;

// Validate required environment variables
if (!publicKey || !urlEndpoint) {
  console.error("Missing ImageKit configuration. Please check your environment variables.");
}

// Taking authentication(token, expiry, signature) from server component of image upload
const authenticator = async () => {
  try {
    const response = await fetch(`${config.env.apiEndpoint}/api/auth/Imagekit`)
    if (!response.ok) {
      const errorText = await response.text();

      throw new Error(
        `Request failed with the status ${response.status} : ${errorText}`
      );
    }
    const data = await response.json();
    // console.log(data)
    const { signature, expire, token } = data;
    return { signature, expire, token }
  }
  catch (error: any) {
    throw new Error(`Authentication request failed : ${error.message}`)
  }
}

const ImageUpload = ({ onFileChange }: { onFileChange: (filePath: File) => void }) => {

  const ikUploadRef = useRef<HTMLInputElement>(null)

  const [file, setFile] = useState<{ filePath: string } | null>(null);

  const onError = (error: any) => {
    console.error("Image upload error:", error)
    Toast({message: "Image upload failed"})
  }
  const onSuccess = (res: any) => {
    setFile(res)
    // console.log(res)
    onFileChange(res.filePath)
    Toast({message: "Image uploaded successfully"})
  }

  return (
    <ImageKitProvider publicKey={publicKey} urlEndpoint={urlEndpoint} authenticator={authenticator}>
      <IKUpload className="hidden" ref={ikUploadRef} onError={onError} onSuccess={onSuccess} />
      <button className="upload-btn flex" onClick={(e) => {
        e.preventDefault()
        if (ikUploadRef.current) {
          // console.log(ikUploadRef.current)
          ikUploadRef.current?.click();
        }
      }}>
        <Image src="/icons/upload.svg" alt="upload-icon" width={20} height={20} className="object-contain" />
        <p className="text-base text-light-100">Upload a file</p>
        {file && <p className="upload-filename">{file.filePath}</p>}
      </button>
      {file && (
        <IKImage
          alt={file.filePath}
          path={file.filePath}
          width={500}
          height={500}
        />
      )}
    </ImageKitProvider>
  )
}

export default ImageUpload
