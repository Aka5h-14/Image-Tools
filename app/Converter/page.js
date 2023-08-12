"use client";
import Navbar from "../navbar";
import { useState, useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import * as imageConversion from "image-conversion";

const converter = () => {

  const [files, setFiles] = useState([]);
  const [properties, setProperties] = useState({
     type: "" ,
     quality: 1,
    }
  )

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles?.length) {
      setFiles((previousFiles) => [
        ...acceptedFiles.map((file) =>
          Object.assign(file, { preview: URL.createObjectURL(file) })
        ),
      ]);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { "image/*": [] },
    maxFiles: 1,
    onDrop,
  });

  const image = files?.map((file) => (
    <img src={file.preview} className="w-1/3 mx-auto" alt="" />
  ));

  // useEffect(() => {
  //   view()
  // },[properties.type]);

  async function view(e) {
    const newImage = document.getElementById("image").files[0];
    const url = await imageConversion.filetoDataURL(newImage);
    const NewImage = await imageConversion.dataURLtoImage(url);
    const canvas = await imageConversion.imagetoCanvas(NewImage,[ ]);
    var imagedata = canvas.toDataURL(e ,properties.quality );
    const res = await imageConversion.urltoBlob(imagedata)
    imageConversion.downloadFile(res);
  }


  return (
    <>
      {/* <Navbar/> */}
      <div className="flex flex-col mt-28">

      <span className="text-center"> UPLOAD IMAGE </span>

      <form className="w-1/2 mx-auto mb-10" action="">
        <div {...getRootProps()}>
          <input id="image" {...getInputProps({ name: "file" })} />
          <div className="grid w-full h-56 bg-gray-600 justify-items-center place-items-center">
            <img
              width="64"
              height="64"
              src="https://img.icons8.com/wired/64/upload--v1.png"
              alt="upload--v1"
            />
            <span>
              {" "}
              Drag 'n' drop some files here, or click to select files
            </span>
          </div>
        </div>
        <span className="text-sm text-end">only 1 image at a time</span>
      </form>

      <span className="text-center">Uploaded Image</span>
      {image}

      <div className="flex mx-auto mb-8 w-2/3 justify-between">
      <button
        className="mt-10 mx-8 bg-gray-500"
        onClick={() => {
          view("image/jpeg");
          }}>
        Convert to JPEG
      </button>

      <button
        className="mt-10 mx-8 bg-gray-500"
        onClick={() => {
          view("image/png");
          }}>
        Convert to PNG
      </button>

      <button
        className="mt-10 mx-8 bg-gray-500"
        onClick={() => {
          view("image/webp");
          }}>
        Convert to Webp
      </button>

      </div>
      </div>
    </>
  );
};




export default converter;
