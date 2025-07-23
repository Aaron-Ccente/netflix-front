import axios from "axios";
import { showError, showSuccess } from "Components/ui/Toast";
import Close from "Icons/Close";
import CloseSmall from "Icons/CloseSmall";
import Plus from "Icons/Plus";
import React, { useEffect, useState } from "react";
import { convertImageToWebP, convertToBase64 } from "utils/convertir64";

function AddNewMovie({ open }) {
  const styleForInput = `p-2 border-2 bg-[#0c161e]  focus:border-[#2ec7bc] focus:outline-none rounded`;
  const [genres, setGenres] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [actors, setActors] = useState([]);

  const [genresSelect, setGenresSelect] = useState([]);
  const [companiesSelect, setCompaniesSelect] = useState([]);
  const [actorsSelect, setActorsSelect] = useState([]);

  const [dataMovieForRequest, setDataMovieForRequest] = useState({});

  const [base64Image, setBase64Image] = useState(null);
  const [base64ImageBackground, setBase64ImageBackground] = useState(null);

  const [pendingActor, setPendingActor] = useState(null);
  const [pendingCharacterName, setPendingCharacterName] = useState("");

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/getGenreCompanyAndActors`)
      .then((res) => {
        setGenresSelect(res.data.genres);
        setCompaniesSelect(res.data.companies);
        setActorsSelect(res.data.actors);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
      });
  }, []);

  // Agrega el género seleccionado al array de géneros
  const handleGenreChange = (event) => {
    const selectedId = event.target.value;
    const selectedGenre = genresSelect.find(
      (genre) => Number(genre.id) === Number(selectedId)
    );
    if (
      selectedGenre &&
      !genres.some((g) => Number(g.id) === Number(selectedId))
    ) {
      setGenres((prev) => [...prev, selectedGenre]);
    }
  };

  // Agrega la compañía seleccionada al array de compañías
  const handleCompanyChange = (event) => {
    const selectedId = event.target.value;
    const selectedCompany = companiesSelect.find(
      (company) => Number(company.id) === Number(selectedId)
    );
    if (
      selectedCompany &&
      !companies.some((c) => Number(c.id) === Number(selectedId))
    ) {
      setCompanies((prev) => [...prev, selectedCompany]);
    }
  };

  // Agrega el actor seleccionado al array de actores, no deben repetirse los actores
  const handleActorChange = (event) => {
    const selectedId = event.target.value;
    const selectedActor = actorsSelect.find(
      (actor) => Number(actor.id) === Number(selectedId)
    );
    if (
      selectedActor &&
      !actors.some((a) => Number(a.id) === Number(selectedId))
    ) {
      setPendingActor(selectedActor);
      setPendingCharacterName("");
    }
  };

  const handleAcceptActor = () => {
    if (pendingActor && pendingCharacterName.trim()) {
      setActors((prev) => [
        ...prev,
        { ...pendingActor, character_name: pendingCharacterName },
      ]);
      setPendingActor(null);
      setPendingCharacterName("");
    }
  };

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

  const handleImageUploadBackground = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    try {
      // Convertir la imagen a WebP
      const webpImage = await convertImageToWebP(file);
      // Convertir la imagen WebP a Base64
      const base64 = await convertToBase64(webpImage);
      setBase64ImageBackground(base64);
    } catch (error) {
      console.error("Error processing image:", error);
    }
  };
  const removeActor = (id) => {
    setActors((prev) => prev.filter((actor) => actor.id !== id));
  };

  const removeGenre = (id) => {
    setGenres((prev) => prev.filter((genre) => genre.id !== id));
  };

  const removeCompany = (id) => {
    setCompanies((prev) => prev.filter((company) => company.id !== id));
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    // Construir arrays con solo los IDs
    const movie_genre = genres.map((g) => Number(g.id));
    const movie_production_company = companies.map((c) => Number(c.id));
    // Actores: [{id_actor, character_name}]
    const movie_actors = actors.map((a) => ({
      id_actor: Number(a.id),
      character_name: a.character_name || "",
    }));
    const movieData = {
      ...dataMovieForRequest,
      photo_url: base64Image,
      background_url: base64ImageBackground,
      movie_genre,
      movie_production_company,
      movie_actors,
    };
    axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/create-movie`, movieData)
      .then((response) => {
        if(response.status === 200){
          open(false, true)
          showSuccess(response.data.message);
        }
      })
      .catch((error) => {
        console.log(error)
        showError("Error al crear pelicula");
      });
  };
  const handleInputChange = (event) => {
    setDataMovieForRequest((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };
  const handleCharacterNameChange = (actorId, characterName) => {
    setActors((prev) =>
      prev.map((actor) =>
        actor.id === actorId
          ? { ...actor, character_name: characterName }
          : actor
      )
    );
  };

  return (
    <div className="w-full z-50 min-h-screen bg-black/40 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center gap-6">
      <div className="flex gap-4">
        <form
          className="bg-[#0c161e] border-2 border-[#334155] py-10 px-8 rounded-lg w-fit text-[#e2e5e5]"
          onSubmit={handleSubmit}
        >
          <div className="text-center text-xl font-bold">
            <label htmlFor="title">Título:</label>
            <input
              type="text"
              placeholder="Título de la película"
              id="title"
              name="title"
              onChange={handleInputChange}
              className={`${styleForInput} border-[#334155] font-normal px-4 ml-4 mb-4 w-1/2 rounded-lg`}
            />
            <input
              type="date"
              id="release_year"
              name="release_year"
              required
              onChange={handleInputChange}
              className={`${styleForInput} border-[#334155] ml-2 font-light px-2 rounded-lg`}
            />
          </div>

          <div className="flex gap-4">
            {/* Imagen de poster :3 */}
            <div className="relative border-2 border-[#334155]  rounded-lg h-[400px] w-[300px] bg-input flex justify-center items-center cursor-pointer overflow-hidden">
              {base64Image ? (
                <img
                  src={base64Image}
                  alt="Imagen seleccionada"
                  width={300}
                  height={400}
                  className="w-full h-full object-cover object-center"
                />
              ) : (
                <div className="flex flex-col items-center ">
                  <Plus />
                  <span className="text-sm mt-2">Subir poster</span>
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                required
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <button
                type="button"
                className="absolute top-2 right-2  rounded-full p-1 "
                onClick={() => setBase64Image("")}
                aria-label="Eliminar imagen"
              >
                <Close size={10} />
              </button>
              {/* Imagen de fondo */}
            </div>
            <div className="relative border-2 border-[#334155] rounded-lg h-[400px] w-[700px] flex justify-center items-center cursor-pointer overflow-hidden">
              {base64ImageBackground ? (
                <img
                  src={base64ImageBackground}
                  alt="Imagen seleccionada"
                  width={300}
                  height={700}
                  className="w-full h-full object-cover object-center"
                />
              ) : (
                <div className="flex flex-col items-center ">
                  <Plus />
                  <span className="text-sm mt-2">Subir fondo</span>
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUploadBackground}
                required
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <button
                type="button"
                className="absolute top-2 right-2  rounded-full p-1 z-50"
                onClick={() => setBase64ImageBackground("")}
                aria-label="Eliminar imagen"
              >
                <Close size={10} />
              </button>
            </div>
          </div>
          <div className="pt-4 flex gap-4">
            <textarea
              id="description"
              name="description"
              maxLength={500}
              minLength={200}
              onChange={handleInputChange}
              required
              className="rounded-xl px-2 py-1 h-[300px] min-w-[500px] border-2 border-[#334155] bg-[#0c161e] focus:border-[#2ec7bc] focus:outline-none"
              placeholder="Descripción de la película..."
            ></textarea>
            <div className="w-full grid grid-rows-4 h-[320px]">
              <div className="flex flex-col">
                <label htmlFor="trailer_url">Trailer</label>
                <input
                  type="text"
                  id="trailer_url"
                  name="trailer_url"
                  onChange={handleInputChange}
                  required
                  className={`${styleForInput} border-[#334155] w-full mt-1`}
                  placeholder="URL del trailer..."
                />
              </div>
              <div className="flex justify-evenly w-full gap-4">
                <div className="w-full ">
                  <div>Categorías</div>
                  <select
                    onChange={handleGenreChange}
                    className={`${styleForInput} border-[#334155] w-full mt-1`}
                    value={genres[genres.length]}
                  >
                    <option value="" disabled>
                      Selecciona una categoría
                    </option>
                    {genresSelect.map((genre, index) => (
                      <option key={index} value={genre.id}>
                        {genre.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="w-full">
                  <div>Productores</div>
                  <select
                    onChange={handleCompanyChange}
                    className={`${styleForInput} border-[#334155] w-full mt-1`}
                    value={companies[companies.length]}
                  >
                    <option value="" disabled>
                      Selecciona un productor
                    </option>
                    {companiesSelect.map((company, index) => (
                      <option key={index} value={company.id}>
                        {company.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 overflow-auto max-h-[73px]">
                <div className="flex flex-col justify-end ">
                <div>Actores</div>
                <select
                  onChange={handleActorChange}
                  className={`${styleForInput} border-[#334155] w-full mt-1`}
                  value={pendingActor || ''}
                >
                  <option value="" disabled>
                    Selecciona un actor
                  </option>
                  {actorsSelect.map((actor, index) => (
                    <option key={index} value={actor.id}>
                      {actor.name}
                    </option>
                  ))}
                </select>
                </div>
                  <div className="flex gap-2 items-end">
                    <input
                      type="text"
                      placeholder="Nombre del personaje"
                      value={pendingCharacterName}
                      onChange={(e) => setPendingCharacterName(e.target.value)}
                      className={`${styleForInput} border-[#334155]`}
                    />
                    <button
                      type="button"
                      className="bg-[#176b81] text-[#e2e5e5] h-[40px] px-3 py-1 rounded
                      hover:bg-green-600"
                      onClick={handleAcceptActor}
                    >
                      Aceptar
                    </button>
                  </div>
              </div>
              <div className="flex gap-4 justify-center items-end py-2 font-semibold w-full mt-8">
                <button
                  onClick={() => open(false, false)}
                  type="button"
                  className="relative h-[30px] bg-[#f52926] text-[#e2e5e5] px-3 py-2 w-fit rounded mr-2 flex items-center gap-2 hover:scale-105 transition-transform
                after:content-[''] after:absolute after:left-1/2 after:bottom-0 after:h-[2px] after:w-0 after:bg-[#e2e5e5] after:origin-center after:transition-all after:duration-300
                hover:after:left-0 hover:after:w-full"
                >
                  Cerrar
                </button>
                <button
                  type="submit"
                  className="relative h-[30px] bg-[#176b81] text-[#e2e5e5] px-3 py-2 w-fit rounded mr-2 flex items-center gap-2 hover:scale-105 transition-transform
                after:content-[''] after:absolute after:left-1/2 after:bottom-0 after:h-[2px] after:w-0 after:bg-[#e2e5e5] after:origin-center after:transition-all after:duration-300
                hover:after:left-0 hover:after:w-full"
                >
                  Crear película
                </button>
              </div>
            </div>
          </div>
        </form>
        {genres.length > 0 || companies.length > 0 || actors.length > 0 ? (
          <div className="bg-[#0c161e] min-w-[300px] border-2 border-[#334155] py-10 px-8 rounded-lg w-fit text-[#e2e5e5] flex flex-col gap-10">
            <div>
              <p>Categorias</p>
              <div className="grid grid-cols-2 gap-2 max-h-[200px] overflow-auto scroll-sky pr-2 pt-2">
                {genres.length === 0 && (
                  <div
                    className={`${styleForInput} border-[#334155] text-center text-[#e2e5e5]`}
                  >
                    No hay categorias
                  </div>
                )}
                {genres.map((genre, index) => (
                  <div
                    key={index}
                    className={`${styleForInput} flex gap-2 justify-between border-2 border-[#2ec7bc]`}
                  >
                    {genre.name}{" "}
                    <button onClick={() => removeGenre(genre.id)}>
                      <CloseSmall/>
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p>Productores</p>
              <div className="grid grid-cols-2 gap-2 max-h-[200px] overflow-auto scroll-sky pr-2 pt-2">
                {companies.length === 0 && (
                  <div
                    className={`${styleForInput} border-[#334155] text-center text-[#e2e5e5]`}
                  >
                    No hay productores
                  </div>
                )}
                {companies.map((company, index) => (
                  <div
                    key={index}
                    className={`${styleForInput} flex gap-2 border-2 border-[#2ec7bc] justify-between`}
                  >
                    {company.name}{" "}
                    <button onClick={() => removeCompany(company.id)}>
                      <CloseSmall />
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p>Actores</p>
              <div className="grid grid-cols-2 gap-2 max-h-[200px] overflow-auto scroll-sky pr-2 pt-2">
                {actors.length === 0 && (
                  <div
                    className={`${styleForInput} border-[#334155] text-center text-[#e2e5e5]`}
                  >
                    No hay actores
                  </div>
                )}
                {actors.map((actor, index) => (
                  <div
                    key={index}
                    className={`${styleForInput} flex flex-col gap-2 border-2 border-[#2ec7bc] justify-between`}
                  >
                    <div className="flex items-center justify-between">
                      <span>
                        ({actor.id}) {actor.name}
                      </span>
                      <button onClick={() => removeActor(actor.id)}>
                        <CloseSmall/>
                      </button>
                    </div>
                    <input
                      type="text"
                      placeholder="Nombre del personaje"
                      value={actor.character_name || ""}
                      onChange={(e) =>
                        handleCharacterNameChange(actor.id, e.target.value)
                      }
                      className="px-2 py-1 rounded bg-[#0c161e] border-2 border-[#334155] text-[#e2e5e5] focus:outline-none focus:border-[#176b81]"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default AddNewMovie;
