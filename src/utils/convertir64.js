export const convertImageToWebP = (file) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      img.onload = () => {
        // Calcular el tamaño máximo permitido
        let { width, height } = img;
        const MAX_WIDTH = 1200;
        const MAX_HEIGHT = 800;
        
        if (width > MAX_WIDTH || height > MAX_HEIGHT) {
          const ratio = Math.min(MAX_WIDTH / width, MAX_HEIGHT / height);
          width = Math.round(width * ratio);
          height = Math.round(height * ratio);
        }
        
        canvas.width = width;
        canvas.height = height;
        ctx?.drawImage(img, 0, 0, width, height);

       
        canvas.toBlob(
          (blob) => {
            if (blob) {
              resolve(blob);
            } else {
              reject(new Error("Error al convertir la imagen a WebP"));
            }
          },
          "image/webp",
          0.8
        );
      };

      img.onerror = () => {
        reject(new Error("Error al cargar la imagen"));
      };

      img.src = URL.createObjectURL(file);
    });
  };

  export const convertToBase64 = (blob) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === "string") {
          resolve(reader.result);
        } else {
          reject(new Error("Error al convertir a Base64"));
        }
      };
      reader.onerror = () => {
        reject(new Error("Error al leer el archivo"));
      };
      reader.readAsDataURL(blob);
    });
  };
