import React, { useEffect, useState } from "react";
import Close from "Icons/Close";
import Plus from "Icons/Plus";
import { convertImageToWebP, convertToBase64 } from "utils/convertir64";
import { searchPosterRoute } from "utils/searchRoutesPoster";
import { searchBackgroundRoute } from "utils/searchRoutesBackground";
import CloseSmall from "Icons/CloseSmall";
import axios from "axios";

function FormEditMovie({ open, data }) {
  const styleForInput = `p-2 border-2 bg-[#0c161e]  focus:border-[#2ec7bc] focus:outline-none rounded`;

  const isBase64Poster =
    typeof data.photo_url === "string" &&
    data.photo_url.startsWith("data:image");
  const [base64Image, setBase64Image] = useState(
    isBase64Poster ? data.photo_url : null
  );
  const [nobase64Image, setNobase64Image] = useState(
    isBase64Poster ? null : data.photo_url || ""
  );

  const isBase64Background =
    typeof data.background_url === "string" &&
    data.background_url.startsWith("data:image");
  const [base64ImageBackground, setBase64ImageBackground] = useState(
    isBase64Background ? data.background_url : null
  );
  const [nobase64ImageBackground, setNobase64ImageBackground] = useState(
    isBase64Background ? null : data.background_url || ""
  );
  const [genresSelectInfo, setGenresSelectInfo] = useState([]);
  const [companiesSelectInfo, setCompaniesSelectInfo] = useState([]);
  const [actorsSelectInfo, setActorsSelectInfo] = useState([]);

  const urlPosterNoBase64 = searchPosterRoute(data.photo_url);
  const urlBackgroundNoBase64 = searchBackgroundRoute(data.background_url);
  useEffect(() => {
    if (!isBase64Poster) setNobase64Image(urlPosterNoBase64);
    if (!isBase64Background) setNobase64ImageBackground(urlBackgroundNoBase64);
    axios
      .get("http://localhost:8081/getGenreCompanyAndActors")
      .then((res) => {
        setGenresSelectInfo(res.data.genres);
        setCompaniesSelectInfo(res.data.companies);
        setActorsSelectInfo(res.data.actors);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
      });
  }, [
    isBase64Poster,
    isBase64Background,
    urlPosterNoBase64,
    urlBackgroundNoBase64,
  ]);


  const [values, setValues] = useState({
    title: data.title || "",
    description: data.description || "",
    release_year: data.release_year ? data.release_year.slice(0, 10) : "",
    trailer_url: data.trailer_url || "",
  });


  const [genresSelect, setGenresSelect] = useState(data.movie_genre || []);
  const [companiesSelect, setCompaniesSelect] = useState(
    data.movie_production_company || []
  );
  const [actorsSelect, setActorsSelect] = useState(
    data.movie_actors
      ? data.movie_actors.map((a) => ({
          id_actor: a.id_actor,
          character_name: a.character_name,
        }))
      : []
  );


  const handleImageUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    try {
      const webpImage = await convertImageToWebP(file);
      const base64 = await convertToBase64(webpImage);
      setBase64Image(base64);
      setNobase64Image("");
    } catch (error) {
      console.error("Error al procesar imagen:", error);
    }
  };
  const handleImageUploadBackground = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    try {
      const webpImage = await convertImageToWebP(file);
      const base64 = await convertToBase64(webpImage);
      setBase64ImageBackground(base64);
      setNobase64ImageBackground("");
    } catch (error) {
      console.error("Error al procesar imagen de fondo:", error);
    }
  };


  const handleInputChange = (event) => {
    setValues((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleGenreChange = (event) => {
    const id = Number(event.target.value);
    if (!genresSelect.includes(id)) setGenresSelect([...genresSelect, id]);
  };
  const removeGenre = (id) => {
    setGenresSelect(genresSelect.filter((g) => g !== id));
  };
  const handleCompanyChange = (event) => {
    const id = Number(event.target.value);
    if (!companiesSelect.includes(id))
      setCompaniesSelect([...companiesSelect, id]);
  };
  const removeCompany = (id) => {
    setCompaniesSelect(companiesSelect.filter((c) => c !== id));
  };

  const [pendingActor, setPendingActor] = useState(null);
  const [pendingCharacterName, setPendingCharacterName] = useState("");
  const handleActorChange = (event) => {
    const id = Number(event.target.value);
    setPendingActor(id);
  };
  const handleCharacterNameChange = (event) => {
    setPendingCharacterName(event.target.value);
  };
  const handleAcceptActor = () => {
    if (!pendingActor || !pendingCharacterName) return;
    if (!actorsSelect.some((a) => a.id_actor === pendingActor)) {
      setActorsSelect([
        ...actorsSelect,
        { id_actor: pendingActor, character_name: pendingCharacterName },
      ]);
    }
    setPendingActor(null);
    setPendingCharacterName("");
  };
  const removeActor = (id) => {
    setActorsSelect(actorsSelect.filter((a) => a.id_actor !== id));
  };


  const handleSubmit = (event) => {
    event.preventDefault();

    const movieData = {
      title: values.title,
      description: values.description,
      release_year: values.release_year,
      photo_url: base64Image ? base64Image : nobase64Image,
      background_url: base64ImageBackground
        ? base64ImageBackground
        : nobase64ImageBackground,
      trailer_url: values.trailer_url,
      movie_actors: actorsSelect.map((a) => ({
        id_actor: a.id_actor,
        character_name: a.character_name,
      })),
      movie_genre: genresSelect,
      movie_production_company: companiesSelect,
    };
    console.log(movieData)
    axios
      .put(`http://localhost:8081/update-movie/${data.id}`, movieData)
      .then((res) => {
        if (res.data.success) {
          console.log(res.data.message);
        open(false, true);
        }
      })
      .catch((err) => {
        console.error("Error al actualizar la película:", err);
      });
  };

  return (
    <div className="w-full z-50 min-h-screen bg-black/40 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center gap-6">
      <div className="flex gap-4">
        <form
          className="bg-[#0c161e] border-2 border-[#334155] py-10 px-8 rounded-lg w-fit text-[#e2e5e5]"
          onSubmit={handleSubmit}
        >
          <div className="text-center text-xl font-bold mb-4">
            <label htmlFor="title">Título:</label>
            <input
              type="text"
              placeholder="Título de la película"
              id="title"
              name="title"
              value={values.title}
              onChange={handleInputChange}
              className={`${styleForInput} border-[#334155] font-normal px-4 ml-4 mb-4 w-1/2 rounded-lg`}
              required
            />
            <input
              type="date"
              id="release_year"
              name="release_year"
              value={values.release_year}
              onChange={handleInputChange}
              className={`${styleForInput} border-[#334155] ml-2 font-light px-2 rounded-lg`}
            />
          </div>
          <div className="flex gap-4">
            {/* Poster */}
            <div className="relative border-2 border-[#334155] rounded-lg h-[400px] w-[300px] bg-input flex justify-center items-center cursor-pointer overflow-hidden">
              {base64Image ? (
                <img
                  src={base64Image}
                  alt="Poster"
                  width={300}
                  height={400}
                  className="w-full h-full object-cover object-center"
                />
              ) : nobase64Image ? (
                <img
                  src={nobase64Image}
                  alt="Poster"
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
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <button
                type="button"
                className="absolute top-2 right-2 rounded-full p-1"
                onClick={() => {
                  setBase64Image("");
                  setNobase64Image("");
                }}
                aria-label="Eliminar imagen"
              >
                <Close/>
              </button>
            </div>
            {/* Fondo */}
            <div className="relative border-2 border-[#334155] rounded-lg h-[400px] w-[700px] flex justify-center items-center cursor-pointer overflow-hidden">
              {base64ImageBackground ? (
                <img
                  src={base64ImageBackground}
                  alt="Fondo"
                  width={700}
                  height={400}
                  className="w-full h-full object-cover object-center"
                />
              ) : nobase64ImageBackground ? (
                <img
                  src={nobase64ImageBackground}
                  alt="Fondo"
                  width={700}
                  height={400}
                  className="w-full h-full object-cover object-center"
                />
              ) : (
                <div className="flex flex-col items-center "><Plus /><span className="text-sm mt-2">Subir fondo</span></div>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUploadBackground}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <button
                type="button"
                className="absolute flex top-2 right-2 rounded-full p-1"
                onClick={e => {
                  e.stopPropagation();
                  setBase64ImageBackground("");
                  setNobase64ImageBackground("");
                }}
                aria-label="Eliminar imagen"
              >
                <Close />
              </button>
            </div>
          </div>
          <div className="pt-4 flex gap-4">
            <textarea
              id="description"
              name="description"
              maxLength={500}
              minLength={200}
              required
              value={values.description}
              onChange={handleInputChange}
              className="rounded-xl px-2 py-1 h-[300px] min-w-[500px] border-2 border-[#334155] bg-[#0c161e] focus:border-[#2ec7bc] focus:outline-none"
              placeholder="Descripción de la película..."
            ></textarea>
            <div className="w-full grid grid-rows-4 h-[320px]">
              <div className="flex flex-col mb-2">
                <label htmlFor="trailer_url">Trailer</label>
                <input
                  type="text"
                  id="trailer_url"
                  name="trailer_url"
                  value={values.trailer_url}
                  onChange={handleInputChange}
                  required
                  className={`${styleForInput} border-[#334155] w-full mt-1`}
                  placeholder="URL del trailer..."
                />
              </div>
              <div className="flex justify-evenly w-full gap-4">
                <div className="w-full">
                  <div>Categorías</div>
                  <select
                    className={`${styleForInput} border-[#334155] w-full mt-1`}
                    onChange={handleGenreChange}
                  >
                    <option value="" disabled>
                      Selecciona un género
                    </option>
                    {genresSelectInfo.map((genre, index) => (
                      <option key={index} value={genre.id}>
                        {genre.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="w-full">
                  <div>Productores</div>
                  <select
                    className={`${styleForInput} border-[#334155] w-full mt-1`}
                    onChange={handleCompanyChange}
                  >
                    <option value="" disabled>
                      Selecciona un productor
                    </option>
                    {companiesSelectInfo.map((company, index) => (
                      <option key={index} value={company.id}>
                        {company.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="w-full mt-4">
                <div>Actores</div>
                <div className="flex gap-2 items-center">
                  <select
                    className={`${styleForInput} border-[#334155]`}
                    onChange={handleActorChange}
                    value={pendingActor || ""}
                  >
                    <option value="" disabled>
                      Selecciona un actor
                    </option>
                    {actorsSelectInfo.map((actor, index) => (
                      <option key={index} value={actor.id}>
                        {actor.name}
                      </option>
                    ))}
                  </select>
                  <input
                    type="text"
                    className={`${styleForInput} border-[#334155]`}
                    placeholder="Nombre del personaje"
                    value={pendingCharacterName}
                    onChange={handleCharacterNameChange}
                  />
                  <button
                    type="button"
                    className="bg-[#176b81] text-[#e2e5e5] px-3 py-2 rounded hover:bg-green-600"
                    onClick={handleAcceptActor}
                  >
                    Aceptar
                  </button>
                </div>
              </div>
              <div className="flex gap-4 justify-center items-end py-2 font-semibold">
                <button
                  onClick={() => open(false, false)}
                  type="button"
                  className="relative h-[30px] bg-[#f52926] text-[#e2e5e5] px-3 py-2 w-fit rounded mr-2 flex items-center gap-2 hover:scale-105 transition-transform after:content-[''] after:absolute after:left-1/2 after:bottom-0 after:h-[2px] after:w-0 after:bg-[#e2e5e5] after:origin-center after:transition-all after:duration-300 hover:after:left-0 hover:after:w-full"
                >
                  Cerrar
                </button>
                <button
                  type="submit"
                  className="relative h-[30px] bg-[#176b81] text-[#e2e5e5] px-3 py-2 w-fit rounded mr-2 flex items-center gap-2 hover:scale-105 transition-transform after:content-[''] after:absolute after:left-1/2 after:bottom-0 after:h-[2px] after:w-0 after:bg-[#e2e5e5] after:origin-center after:transition-all after:duration-300 hover:after:left-0 hover:after:w-full"
                >
                  Actualizar película
                </button>
              </div>
            </div>
          </div>
        </form>
        {actorsSelect.length > 0 ||
        genresSelect.length > 0 ||
        companiesSelect.length > 0 ? (
          <div className="bg-[#0c161e] min-w-[300px] border-2 border-[#334155] py-10 px-8 rounded-lg w-fit text-[#e2e5e5] flex flex-col gap-10">

                {/* Categorías */}
                <div>
                  <p>Categorías</p>
                  <div className="grid grid-cols-2 gap-2 max-h-[200px] overflow-auto scroll-sky pr-2 pt-2">
                    {genresSelect.map((id) => {
                      const genre = genresSelectInfo.find(
                        (g) => Number(g.id) === Number(id)
                      );
                      return genre ? (
                        <div
                          key={id}
                          className={`${styleForInput} flex gap-2 justify-between border-2 border-[#2ec7bc]`}
                        >
                          {genre.name}
                          <button type="button" onClick={() => removeGenre(id)}>
                            <CloseSmall />
                          </button>
                        </div>
                      ) : null;
                    })}
                  </div>
                </div>
                {/* Productores */}
                <div>
                  <p>Productores</p>
                  <div className="grid grid-cols-2 gap-2 max-h-[200px] overflow-auto scroll-sky pr-2 pt-2">
                    {companiesSelect.map((id) => {
                      const company = companiesSelectInfo.find(
                        (c) => Number(c.id) === Number(id)
                      );
                      return company ? (
                        <div
                          key={id}
                          className={`${styleForInput} flex gap-2 justify-between border-2 border-[#2ec7bc]`}
                        >
                          {company.name}
                          <button
                            type="button"
                            onClick={() => removeCompany(id)}
                          >
                            <CloseSmall />
                          </button>
                        </div>
                      ) : null;
                    })}
                  </div>
                </div>
                {/* Actores */}
                <div>
                  <p>Actores</p>
                  <div className="grid grid-cols-2 gap-2 max-h-[200px] overflow-auto scroll-sky pr-2 pt-2">
                    {actorsSelect.map((actor) => {
                      const actorInfo = actorsSelectInfo.find(
                        (a) => Number(a.id) === Number(actor.id_actor)
                      );
                      return (
                        <div
                          key={actor.id_actor}
                          className={`${styleForInput} flex flex-col gap-2 border-2 border-[#2ec7bc] justify-between`}
                        >
                          <div className="flex items-center justify-between">
                            <span>
                              ({actor.id_actor}){" "}
                              {actorInfo ? actorInfo.name : "Actor"}
                            </span>
                            <button
                              type="button"
                              onClick={() => removeActor(actor.id_actor)}
                            >
                              <CloseSmall />
                            </button>
                          </div>
                          <input
                            type="text"
                            placeholder="Nombre del personaje"
                            value={actor.character_name || ""}
                            onChange={(e) => {
                              setActorsSelect((prev) =>
                                prev.map((a) =>
                                  a.id_actor === actor.id_actor
                                    ? { ...a, character_name: e.target.value }
                                    : a
                                )
                              );
                            }}
                            className="px-2 py-1 rounded bg-[#0c161e] border-2 border-[#334155] text-[#e2e5e5] focus:outline-none focus:border-[#176b81]"
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default FormEditMovie;
