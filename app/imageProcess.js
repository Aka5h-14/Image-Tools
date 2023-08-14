const process = async(id) => {
    let newImage = document.getElementById(id);


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
    console.log(image);

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
      console.log(canvas);
  
      // Convert canvas to data URLs
      const DataUrl = canvas.toDataURL(e,1);
      const res = await imageConversion.urltoBlob(DataUrl)
      return(res);
    };
}

export default process;