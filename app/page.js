import Navbar from "./navbar";
import Head from "next/head";
import Script from "next/script";



export default function Home() {
  return (
    <>
    <Navbar/>
    <main className="flex min-h-screen flex-col items-center p-24">
      

      <h1 className="text-3xl font-bold mb-5">Welcome to Image Conversion</h1>
      <h3 className="text-lg mb-2">Effortlessly Convert and Compress Your Images</h3>
      <p className="mb-3">Our Image Conversion tool provides a simple and efficient way to convert and compress your images between various formats. Whether you need to optimize your images for web use, reduce file sizes for easier sharing, or simply change the image format, our tool makes it easy and quick.</p>
      <h5 className=" text-lg self-start font-semibold">Features:</h5>
      <ul className="self-start list-disc">
        <li>Image Conversion: Convert your images to and from popular formats such as JPEG, PNG, GIF, and more.</li>
        <li>Image Conversion: Convert your images to and from popular formats such as JPEG, PNG, GIF, and more.</li>
        <li>User-Friendly Interface: Enjoy a clean, intuitive interface that allows you to upload, convert, and download images with just a few clicks.</li>
        <li>Fast and Secure: Experience fast processing times and secure handling of your images throughout the conversion process.</li>
        </ul>     

        <h5 className=" text-lg self-start font-semibold mt-3">Get Started:</h5> 
        <ul className="self-start list-decimal">
          <li>Upload: Select the image you want to convert or compress.</li>
          <li>Choose Options: Select your desired output format and compression level.</li>
          <li>Download: Download the converted or compressed image instantly.</li>
        </ul>

        <h5 className=" text-lg self-start font-semibold mt-3">Why Use Our Tool?</h5> 
        <ul className="self-start list-decimal">
          <li>No Installation Needed: Use our online tool directly in your browser without any need for software installation.</li>
          <li>Cross-Platform: Access and use our tool on any device, whether it's a desktop, tablet, or mobile phone.</li>
          <li>Privacy: Your images are processed securely, and we do not store any uploaded files.</li>
         
        </ul>
        <p>Start converting and compressing your images today with our efficient and easy-to-use tool!</p>
      {/* 




No Installation Needed: Use our online tool directly in your browser without any need for software installation.
Cross-Platform: Access and use our tool on any device, whether it's a desktop, tablet, or mobile phone.
Privacy: Your images are processed securely, and we do not store any uploaded files.
Start converting and compressing your images today with our efficient and easy-to-use tool! */}

      <div>
        <div>
          
        </div>
      </div>
    </main>
    </>
  );
}
