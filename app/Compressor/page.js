"use client";
import Navbar from "../navbar";
import { useState, useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import * as imageConversion from "image-conversion";

const compressor = () => {
  const [files, setFiles] = useState([]);
  const [properties, setProperties] = useState({
    size: 0,
    quality: 1,
  });

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
    <img src={file.preview} className="w-[60%] mx-auto" alt="" />
  ));

  const DisplaySize = (
    <span className="inline mt-20">
      current size of image = {properties.size}kb
    </span>
  );

  useEffect(() => {
    DisplaySize;
    const Image = document.getElementById("image").files[0];
    if (Image !== undefined) {
      const size = Math.round(Image.size / 1024);
      setProperties({
        size: size,
      });
    }
  }, [files]);

  async function view() {
    const Image = document.getElementById("image").files[0];
    var value = document.getElementById("size").value;
    if(value > properties.size){
      alert("incorrect size");
    }
    else{
    const compressedImage = await imageConversion.compressAccurately(Image, value);
    
    imageConversion.downloadFile(compressedImage);
    }

  }

  return (
    <>
      {/* <Navbar /> */}
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

        <div className="flex mx-auto w-[90%]">
          <div className="flex flex-col w-[40%]">
            {DisplaySize}
            <div className="mt-10 mb-7">
              <span className="mr-5">Enter Size</span>
              <input id="size" type="number" placeholder="kb" className="w-20 bg-gray-500 text-center" />
            </div>

            <button
              className="bg-gray-300 w-36 text-black"
              onClick={() => {
                view();
              }}
            >
              Compress
            </button>
          </div>

          <div className="w-[60%]">
            <h2 className="text-center">Uploaded Image</h2>

            <div className=" mx-auto">{image}</div>
          </div>
        </div>

        <div className="flex mx-auto mb-8 w-2/3 "></div>
      </div>
    </>
  );
};

export default compressor;
