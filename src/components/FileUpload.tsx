
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { motion, AnimatePresence } from "framer-motion";
import { FileSpreadsheet, Upload, CheckCircle, AlertCircle } from "lucide-react";
import { useToast } from "../hooks/use-toast";

type FileUploadProps = {
  onFileUploaded?: (file: File) => void;
};

type UploadStatus = "idle" | "uploading" | "success" | "error";

const FileUpload: React.FC<FileUploadProps> = ({ onFileUploaded }) => {
  const [file, setFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<UploadStatus>("idle");
  const { toast } = useToast();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const acceptedFile = acceptedFiles[0];
    
    if (!acceptedFile) return;
    
    // Check if file is an Excel file
    const isExcel = 
      acceptedFile.type === "application/vnd.ms-excel" || 
      acceptedFile.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
      
    if (!isExcel) {
      toast({
        title: "Invalid file format",
        description: "Please upload only Excel files (.xls, .xlsx)",
        variant: "destructive",
      });
      return;
    }
    
    setFile(acceptedFile);
    handleUpload(acceptedFile);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/vnd.ms-excel': ['.xls'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx']
    },
    maxFiles: 1,
  });

  const handleUpload = async (uploadFile: File) => {
    if (onFileUploaded) {
      onFileUploaded(uploadFile);
    }
    
    setUploadStatus("uploading");
    
    // Simulate API call
    setTimeout(() => {
      setUploadStatus("success");
      toast({
        title: "File uploaded successfully",
        description: `${uploadFile.name} has been uploaded.`,
      });
    }, 2000);
  };

  const resetUpload = () => {
    setFile(null);
    setUploadStatus("idle");
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="p-6 rounded-lg bg-card shadow-md">
        <h2 className="text-2xl font-semibold mb-2">Excel File Upload</h2>
        <p className="text-muted-foreground mb-6">Supported formats: .xls, .xlsx</p>

        <AnimatePresence mode="wait">
          {uploadStatus === "idle" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              key="dropzone"
            >
              <div
                {...getRootProps({
                  className: `border-2 ${
                    isDragActive ? "border-primary" : "border-dashed border-muted-foreground/30"
                  } rounded-lg p-10 cursor-pointer transition-all hover:bg-muted/50 text-center`,
                })}
              >
                <input {...getInputProps()} />
                
                <div className="flex flex-col items-center justify-center gap-4">
                  <div className="p-4 bg-muted rounded-full">
                    <Upload className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="font-medium">
                      {isDragActive
                        ? "Drop the Excel file here"
                        : "Drag and drop your Excel file here"}
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      or click to browse
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {uploadStatus === "uploading" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              key="uploading"
              className="flex flex-col items-center py-8"
            >
              <div className="flex items-center gap-4 mb-4">
                <FileSpreadsheet className="h-10 w-10 text-primary" />
                <div className="text-left">
                  <p className="font-medium">{file?.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {(file?.size / 1024).toFixed(2)} KB
                  </p>
                </div>
              </div>
              
              <div className="w-full mt-4">
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-primary"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 2 }}
                  />
                </div>
                <p className="text-sm text-center text-muted-foreground mt-2">
                  Uploading...
                </p>
              </div>
            </motion.div>
          )}

          {uploadStatus === "success" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              key="success"
              className="flex flex-col items-center py-8"
            >
              <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
              <h3 className="text-xl font-medium">Upload Successful!</h3>
              <p className="text-muted-foreground mt-2 mb-6">
                Your Excel file has been uploaded successfully.
              </p>
              
              <div className="flex items-center gap-4 p-4 bg-muted/30 rounded-lg">
                <FileSpreadsheet className="h-10 w-10 text-primary" />
                <div className="text-left">
                  <p className="font-medium">{file?.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {(file?.size / 1024).toFixed(2)} KB
                  </p>
                </div>
              </div>
              
              <button
                onClick={resetUpload}
                className="mt-6 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
              >
                Upload Another File
              </button>
            </motion.div>
          )}

          {uploadStatus === "error" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              key="error"
              className="flex flex-col items-center py-8"
            >
              <AlertCircle className="h-16 w-16 text-destructive mb-4" />
              <h3 className="text-xl font-medium">Upload Failed</h3>
              <p className="text-muted-foreground mt-2 mb-6">
                There was an error uploading your file. Please try again.
              </p>
              
              <button
                onClick={resetUpload}
                className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
              >
                Try Again
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default FileUpload;
