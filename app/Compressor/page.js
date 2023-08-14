"use client";
import { useState, useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import * as imageConversion from "image-conversion";
import Navbar from "../navbar";

const compressor = () => {
  const [files, setFiles] = useState([]);
  const [properties, setProperties] = useState({
    size: 0,
    type: "",
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
    <img id="image" src={file.preview} className="w-[60%] mx-auto" alt="" />
  ));

  const DisplaySize = (
    <span className="inline mt-20">
      current size of image = {properties.size} kb
    </span>
  );

  const imageProcess = async () => {
    let newImage = document.getElementById("image");

    const getBase64FromUrl = async (url) => {
      const data = await fetch(url);
      const blob = await data.blob();
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = () => {
          const base64data = reader.result;
          resolve(base64data);
        };
      });
    };

    const resPromise = new Promise(async (resolve) => {
      // Create a new Image element
      const image = new Image();

      // Set the data URL as the source for the image
      image.src = await getBase64FromUrl(newImage.src);
      var stringLength = image.src.length - "data:image/png;base64,".length;

      var sizeInKb = Math.round(
        (4 * Math.ceil(stringLength / 3) * 0.5624896334383812) / 1024
      );

      const mimeTypeMatch = image.src.match(/^data:([^;]+)/);
      var mimeType;

      if (mimeTypeMatch && mimeTypeMatch[1]) {
        mimeType = mimeTypeMatch[1];
      } else {
        console.log("MIME Type not found.");
      }

      setProperties({
        size: sizeInKb,
        type: mimeType,
      });

      var res;
      var DataUrl;

      image.onload = async () => {
        // Create a canvas to work with
        const canvas = document.createElement("canvas");
        canvas.width = image.width;
        canvas.height = image.height;

        // Get the canvas context
        const context = canvas.getContext("2d");

        // Draw the image onto the canvas
        context.drawImage(image, 0, 0);

        // Convert canvas to data URLs
        DataUrl = canvas.toDataURL(mimeType, 1);
        res = await imageConversion.urltoBlob(DataUrl);

        resolve(res); // Resolve the Promise with the res value
      };
    });

    return resPromise; // Return the Promise containing the res value
  };

  useEffect(() => {
    if(document.getElementById("image") !== null){
    imageProcess();
    DisplaySize;}
  }, [files]);

  async function view() {
    var value = document.getElementById("size").value;
    if (value > properties.size) {
      alert("incorrect size");
    } else {
      imageProcess().then(async (res) => {
        const compressedImage = await imageConversion.compressAccurately(res, {
          size: value,
          accuracy: 0.99,
          type: properties.type,
        });
        imageConversion.downloadFile(compressedImage);
      });
    }
  }

  return (
    <>
      <Navbar />
      <div className="flex flex-col mt-28">
        <span className="text-center"> UPLOAD IMAGE </span>

        <form className="w-1/2 mx-auto mb-10" action="">
          <div {...getRootProps()}>
            <input
              type="file"
              accept="image"
              {...getInputProps({ name: "file" })}
            />
            <div className="grid w-full h-56 bg-gray-600 justify-items-center place-items-center">
              <img
                width="64"
                height="64"
                src="https://img.icons8.com/wired/64/upload--v1.png"
                alt="upload--v1"
              />
              <span>
                Drag 'n' drop some files here, or click to select files
              </span>
            </div>
          </div>
          <h6 className="text-sm text-left">only 1 image at a time</h6>
          <h6 className="text-sm text-left">Can only compress Jpeg and Png types</h6>
          
        </form>

        <div className="flex mx-auto w-[90%]">
          <div className="flex flex-col w-[40%]">
            {DisplaySize}
            <div className="mt-10 mb-7">
              <span className="mr-5">Enter Size</span>
              <input
                id="size"
                type="number"
                placeholder="kb"
                className="w-20 bg-gray-500 text-center"
              />
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
