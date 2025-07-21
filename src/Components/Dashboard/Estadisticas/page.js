import React, { useEffect, useMemo, useState } from 'react'
import RadarChartView from './RadarChart'
import axios from 'axios';

function Page() {
  const [dataInfo, setDataInfo] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("http://localhost:8081/stadistics-genres-count")
      .then((res) => {
        if (res.data && Array.isArray(res.data.data)) {
          setDataInfo(res.data.data);
        } else {
          setDataInfo([]);
        }
      })
      .catch((err) => {
        setDataInfo([]);
        console.log(err);
      })
      .finally(() => setLoading(false));
  }, []);

  const maxTotal = useMemo(() => {
    if (!dataInfo.length) return 10;
    return Math.max(...dataInfo.map(item => item.total)) + 2;
  }, [dataInfo]);

  const dataMemo = useMemo(() => {
    return dataInfo.map(item => ({
      subject: item.Categoria,
      A: item.total,
      fullMark: maxTotal
    }));
  }, [dataInfo, maxTotal]);

 
  return (
    <div className="w-full h-[calc(100vh-80px)] flex flex-col items-center justify-center">
      <div className="flex-1 w-full flex items-center justify-center">
        {loading ? (
          <div className="flex flex-col items-center justify-center w-full h-[250px]">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#2ec7bc] mb-4"></div>
            <span className="text-[#2ec7bc] font-semibold">Cargando gráfico...</span>
          </div>
        ) : dataMemo.length === 0 ? (
          <div className="text-red-500 font-semibold">No hay datos para mostrar el gráfico.</div>
        ) : (
          <div className='text-center'>
      <p className="mb-4 text-xl font-bold">Estadísticas por categoría</p>
          <RadarChartView data={dataMemo} maxTotal={maxTotal} />

          </div>
        )}
      </div>
    </div>
  )
}

export default Page