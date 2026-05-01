"use client";

import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button";
import { cn, convertFileToUrl, getFileType } from "@/lib/utils";
import Image from "next/image";
import Thumbnail from "@/components/Thumbnail";
import { MAX_FILE_SIZE } from "@/constants";
import { useToast } from "@/hooks/use-toast";
import { usePathname } from "next/navigation";
import { appwriteConfig } from "@/lib/appwrite/config";
import { createFileRecord } from "@/lib/actions/file.actions";
import { createJWT } from "@/lib/actions/user.actions";

interface Props {
  ownerId: string;
  accountId: string;
  className?: string;
}

interface UploadFileState {
  id: string;
  file: File;
  progress: number;
  status: 'uploading' | 'completed' | 'error';
}

const FileUploader = ({ ownerId, accountId, className }: Props) => {
  const path = usePathname();
  const { toast } = useToast();
  const [uploadingFiles, setUploadingFiles] = useState<UploadFileState[]>([]);

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const newFiles = acceptedFiles.map(file => ({
        id: `${file.name}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        file,
        progress: 0,
        status: 'uploading' as const
      }));
      
      setUploadingFiles(prev => [...prev, ...newFiles]);

      newFiles.forEach(async (uploadState) => {
        const { file, id } = uploadState;

        if (file.size > MAX_FILE_SIZE) {
          setUploadingFiles(prev => prev.filter(f => f.id !== id));
          return toast({
            description: (
              <p className="body-2 text-white">
                <span className="font-semibold">{file.name}</span> is too large.
                Max file size is 100MB.
              </p>
            ),
            className: "error-toast",
          });
        }

        try {
          // 1. Get JWT for secure client-side upload
          const jwtResult = await createJWT();
          const jwt = jwtResult?.jwt;

          if (!jwt) throw new Error("No JWT found");

          // 2. Use XMLHttpRequest for exact progress tracking
          const xhr = new XMLHttpRequest();
          const formData = new FormData();
          formData.append('fileId', 'unique()');
          formData.append('file', file);

          xhr.upload.addEventListener('progress', (event) => {
            if (event.lengthComputable) {
              const percentComplete = Math.round((event.loaded / event.total) * 100);
              setUploadingFiles(prev => prev.map(f => 
                f.id === id 
                ? { ...f, progress: percentComplete } 
                : f
              ));
            }
          });

          xhr.onload = async () => {
            if (xhr.status >= 200 && xhr.status < 300) {
              // Mark as 100% while processing database record
              setUploadingFiles(prev => prev.map(f => 
                f.id === id ? { ...f, progress: 100 } : f
              ));

              const bucketFile = JSON.parse(xhr.response);
              
              // 3. Create database record
              await createFileRecord({
                bucketFile,
                ownerId,
                accountId,
                path,
              });

              setUploadingFiles(prev => prev.filter(f => f.id !== id));
            } else {
              throw new Error('Upload failed');
            }
          };

          xhr.onerror = () => {
            setUploadingFiles(prev => prev.map(f => 
              f.id === id ? { ...f, status: 'error' } : f
            ));
          };

          const url = `${appwriteConfig.endpointUrl}/storage/buckets/${appwriteConfig.bucketId}/files`;
          xhr.open('POST', url);
          xhr.setRequestHeader('X-Appwrite-Project', appwriteConfig.projectId);
          xhr.setRequestHeader('X-Appwrite-JWT', jwt);
          xhr.send(formData);

        } catch (error) {
          console.error("Upload failed:", error);
          setUploadingFiles(prev => prev.map(f => 
            f.id === id 
            ? { ...f, status: 'error' } 
            : f
          ));
        }
      });
    },
    [ownerId, accountId, path, toast],
  );

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const handleRemoveFile = (
    e: React.MouseEvent<HTMLImageElement, MouseEvent>,
    fileName: string,
  ) => {
    e.stopPropagation();
    setUploadingFiles((prev) => prev.filter((f) => f.file.name !== fileName));
  };

  return (
    <div {...getRootProps()} className="cursor-pointer">
      <input {...getInputProps()} />
      <Button type="button" className={cn("uploader-button", className)}>
        <Image
          src="/assets/icons/upload.svg"
          alt="upload"
          width={24}
          height={24}
        />{" "}
        <p className="text-white">Upload</p>
      </Button>

      {uploadingFiles.length > 0 && (
        <ul className="uploader-preview-list !z-[9999] bg-white border border-light-300 shadow-2xl rounded-[20px]">
          <h4 className="h4 text-light-100 p-4">Uploading</h4>

          {uploadingFiles.map(({ file, progress, status, id }) => {
            const { type, extension } = getFileType(file.name);

            return (
              <li
                key={id}
                className="uploader-preview-item"
              >
                <div className="flex items-center gap-3">
                  <Thumbnail
                    type={type}
                    extension={extension}
                    url={convertFileToUrl(file)}
                  />

                  <div className="preview-item-name">
                    <p className="text-light-100 truncate max-w-[200px]">{file.name}</p>
                    {status === 'error' ? (
                      <p className="text-red caption">Upload failed</p>
                    ) : (
                      <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-light-400">
                        <div 
                          className="h-full bg-brand transition-all duration-300" 
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    )}
                  </div>
                </div>

                <Image
                  src="/assets/icons/remove.svg"
                  width={24}
                  height={24}
                  alt="Remove"
                  className="cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    setUploadingFiles((prev) => prev.filter((f) => f.id !== id));
                  }}
                />
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default FileUploader;
