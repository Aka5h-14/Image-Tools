"use client";
import { useState, useCallback, useEffect } from "react";
import Script from "next/script";
import { useDropzone } from "react-dropzone";
import * as imageConversion from "image-conversion";
import Navbar from "../navbar";

const converter = () => {
  const [files, setFiles] = useState([]);

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
    <img id="image1" src={file.preview} className="w-1/3 mx-auto" alt="" />
  ));


  async function view(e) {
    let newImage = document.getElementById("image1");


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

    // Create a new Image element
    const image = new Image();

    // Set the data URL as the source for the image
    image.src = await getBase64FromUrl(newImage.src);

    // Wait for the image to load
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
      const DataUrl = canvas.toDataURL(e,1);
      const res = await imageConversion.urltoBlob(DataUrl)
      imageConversion.downloadFile(res);
    };

    // (async function() {
    //   let blob = await fetch(newImage.src).then(r => r.blob());
    //   let dataUrl = await new Promise(resolve => {
    //     let reader = new FileReader();
    //     reader.onload = () => resolve(reader.result);
    //     reader.readAsDataURL(blob);
    //   });
    //   console.log(dataUrl);
    //   const modifiedString = dataUrl.replace(/text\/html/i, 'image/jpeg');
    //   console.log(modifiedString);

    //   // const res= await imageConversion.dataURLtoFile(modifiedString);
    //   // console.log(res)
    //   // imageConversion.downloadFile(res);

    //   const res = await imageConversion.dataURLtoImage(modifiedString)
    // console.log(res)
    // imageConversion.downloadFile(res);
    // })();

    // let canvas = imageConversion.imagetoCanvas(newImage,[])
    // console.log(canvas)
    // var imagedata = await canvas[2].toDataURL(e ,1);
    // console.log(imagedata);
    // const res = await imageConversion.urltoBlob(imagedata)
    // console.log(res)
    // imageConversion.downloadFile(res);

    // let newImage = document.getElementById("image2").files[0];
    // console.log(newImage)

    // const url = await imageConversion.filetoDataURL(newImage)
    // console.log(url)

    // const NEWI= await imageConversion.dataURLtoImage(url)
    // console.log(NEWI)

    // let canvas = await imageConversion.imagetoCanvas(NEWI,[])
    // console.log(canvas)

    // var imagedata = canvas.toDataURL(e ,1);
    // console.log(imagedata);

    // const res = await imageConversion.urltoBlob(imagedata)
    // console.log(res)
    // imageConversion.downloadFile(res);
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
              id="image2"
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
                {" "}
                Drag 'n' drop some files here, or click to select files
              </span>
            </div>
          </div>
          <span className="text-sm text-end">only 1 image at a time</span>
        </form>

        <span className="text-center">Uploaded Image</span>
        {image}

        <div className="flex mx-auto mb-8 xs:[99%] lg:w-2/3 justify-between">
          <button
            className="mt-10 xs:mx-3 lg:mx-8 bg-gray-500"
            onClick={() => {
              view("image/jpeg");
            }}
          >
            Convert to JPEG
          </button>

          <button
            className="mt-10 xs:mx-3 lg:mx-8 bg-gray-500"
            onClick={() => {
              view("image/png");
            }}
          >
            Convert to PNG
          </button>

          <button
            className="mt-10 xs:mx-3 lg:mx-8 bg-gray-500"
            onClick={() => {
              view("image/webp");
            }}
          >
            Convert to Webp
          </button>
        </div>
      </div>
    </>
  );
};

export default converter;
