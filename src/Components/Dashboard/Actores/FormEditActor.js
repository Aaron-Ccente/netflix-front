import axios from 'axios';
import { showError, showSuccess } from 'Components/ui/Toast';
import Close from 'Icons/Close';
import Plus from 'Icons/Plus';
import React, { useEffect, useState } from 'react'
import { convertImageToWebP, convertToBase64 } from 'utils/convertir64';
import { searchActorImageRoute } from 'utils/searchRoutesActor';

function FormEditActor({ viewModal, data }) {
    console.log(data)
  const [values, setValues] = useState({
    name: data.name || "",
    image_actor: data.image_actor || "",
    biography: data.biography || "",
    date_of_birth: data.date_of_birth || "2004-04-04",
  });
  // Si la imagen es base64, la mostramos tal cual; si es string, construimos la ruta
  const isBase64 = typeof data.image_actor === 'string' && data.image_actor.startsWith('data:image');
  const [base64Image, setBase64Image] = useState(isBase64 ? data.image_actor : null);
  const [nobase64Image, setnoBase64Image] = useState("");
  // Si no es base64 y existe image_actor, construimos la ruta
  const actorImageUrl = searchActorImageRoute(data.image_actor);
  const [errors, setErrors] = useState("");

  useEffect(()=>{
    setnoBase64Image(actorImageUrl)
  },[actorImageUrl])

  const handleImageUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    try {
      // Convertir la imagen a WebP
      const webpImage = await convertImageToWebP(file);
      // Convertir la imagen WebP a Base64
      const base64 = await convertToBase64(webpImage);
      setBase64Image(base64);
      
    } catch (error) {
      console.error("Error processing image:", error);
    }
  };
  const handleInput = (event) => {
    setValues((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
    setErrors("");
  };
  console.log(nobase64Image)
  const handleSubmit = (event) => {
    event.preventDefault();
    
    let imageToSend = '';
    if (base64Image) {
      imageToSend = base64Image;
    } else if (nobase64Image) {
      imageToSend = nobase64Image ? data.image_actor: '';
    } else {
      imageToSend = '';
    }
    const actorData = {
      ...values,
      image_actor: imageToSend,
    };

    axios.put(`http://localhost:8081/update-actor/${data.id}`, actorData)
      .then((res) => {
        showSuccess(res.data.message);
        setValues({
          name: "",
          image_actor: "",
          biography: "",
          date_of_birth: "2004-04-04",
        });
        viewModal(false, true);
      })
      .catch((err) => {
        const errorToast = err.response.data.error;
        showError(errorToast);
        console.error(err.response?.data?.error || "Error al crear actor");
      });
  };
  console.log(errors)
  return (
    <div className="w-full z-50 min-h-screen bg-black/40 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <form action="" onSubmit={handleSubmit} className="bg-[#0c161e] border-2 border-[#334155] py-10 px-8 rounded-lg w-fit text-[#e2e5e5] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <p className="text-2xl font-bold pb-4 px-20 text-[#2ec7bc] text-center">
          Actualizar actor
        </p>
        <div className="grid grid-cols-2 max-lg:grid-cols-1 max-lg:gap-4">
          <div className="w-full flex flex-col gap-2 m-auto items-center">
            <div className="relative border border-border dark:border-border rounded-lg h-[400px] w-[300px] bg-input flex justify-center items-center cursor-pointer overflow-hidden">
              {base64Image ? (
                <img
                  src={base64Image}
                  alt="Imagen seleccionada"
                  width={300}
                  height={400}
                  className="w-full h-full object-cover object-center"
                />
              ) : nobase64Image ? (
                <img
                  src={nobase64Image}
                  alt="Imagen actor"
                  width={300}
                  height={400}
                  className="w-full h-full object-cover object-center"
                />
              ) : (
                <div className="flex flex-col items-center ">
                  <Plus />
                  <span className="text-card-foreground dark:text-card-foreground text-sm mt-2">
                    Subir foto del actor
                  </span>
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <button
                type="button"
                className="absolute top-2 right-2  rounded-full p-1 "
                onClick={() => {
                    setnoBase64Image("")
                    setBase64Image("")}}
                aria-label="Eliminar imagen"
              >
                <Close />
              </button>
            </div>
          </div>
          <div className="flex flex-col gap-4 px-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="name">Nombre:</label>
              <input
                id="name"
                name="name"
                type="text"
                value={values.name}
                required
                onChange={handleInput}
                className="p-2 border-2 border-[#334155] bg-[#0c161e]  focus:border-[#2ec7bc] focus:outline-none rounded"
                placeholder="nombre del actor"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="date_of_birth">Año de nacimiento: </label>
              <input
                id="date_of_birth"
                onChange={handleInput}
                value={values.date_of_birth}
                name="date_of_birth"
                type="date"
                required
                min="1900-01-01"
                className="p-2 border-2 border-[#334155] bg-[#0c161e]  focus:border-[#2ec7bc] focus:outline-none rounded"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="biography">Biografía</label>
              <textarea
                id="biography"
                name="biography"
                onChange={handleInput}
                maxLength={500}
                minLength={200}
                value={values.biography}
                required
                className="rounded-xl px-2 py-1 min-h-[140px] max-h-[160px] border-2 border-[#334155] bg-[#0c161e] focus:border-[#2ec7bc] focus:outline-none"
                placeholder="Biografía del actor..."
              ></textarea>
            </div>
            <div className="flex gap-4 justify-center pt-2 font-semibold">
              <button  
                type="button"
                className="relative bg-[#f52926] text-[#e2e5e5] px-3 py-2 w-fit rounded mr-2 flex items-center gap-2 hover:scale-105 transition-transform
                after:content-[''] after:absolute after:left-1/2 after:bottom-0 after:h-[2px] after:w-0 after:bg-[#e2e5e5] after:origin-center after:transition-all after:duration-300
                hover:after:left-0 hover:after:w-full"
                onClick={() => viewModal(false, false)}
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="relative bg-[#176b81] text-[#e2e5e5] px-3 py-2 w-fit rounded mr-2 flex items-center gap-2 hover:scale-105 transition-transform
                after:content-[''] after:absolute after:left-1/2 after:bottom-0 after:h-[2px] after:w-0 after:bg-[#e2e5e5] after:origin-center after:transition-all after:duration-300
                hover:after:left-0 hover:after:w-full"
              >
                Actualizar actor
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default FormEditActor