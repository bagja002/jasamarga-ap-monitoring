import React, { use, useEffect, useState } from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Select from "../../src/app/component/tools/select";
import Sidebar from "../../src/app/component/sidebar";
import Chart1 from "../../src/app/component/grafik/grafikdonat";
import DoughnutChart from "../../src/app/component/grafik/grafikdonat";
import DenseTable from "../admin/dashboardres";
import Navbar from "../../src/app/component/navbar";
import { useRouter } from "next/router";

import jwt from "jsonwebtoken";
import axios from "axios";


const Kolom1 = styled("div")({
  backgroundColor: `rgba(255, 255, 255, 1)`,
  boxShadow: `0px 2px 4px rgba(0, 0, 0, 0.06), 0px 4px 6px rgba(0, 0, 0, 0.1)`,
  borderRadius: `12px`,
  padding: `40px`,
  boxSizing: `border-box`,
  width: `160px`,
  height: `99px`,
  overflow: `hidden`,
});

const Kotak2 = styled("div")({
  background: `linear-gradient(-168.19deg, rgba(211, 63, 63, 1) -3.08013949979098%, rgba(26, 115, 232, 1) 103.08012874716832%)`,
  boxShadow: `0px 7px 10px rgba(0, 187, 212, 0.4), 0px 4px 20px rgba(0, 0, 0, 0.14)`,
  borderRadius: `12px`,
  display: `flex`,
  position: `relative`,
  boxSizing: `border-box`,
  isolation: `isolate`,
  flexDirection: `row`,
  justifyContent: `center`,
  alignItems: `center`,
  padding: `0px 20px 72px 20px`,
  width: `64px`,
  height: `82px`,
  overflow: `hidden`,
  right: "30px",
  top: "-70px",
});

const TulisanBox = styled("span")({
  display: "flex",
  position: "relative",
  isolation: "isolate",
  flexDirection: "column",
  justifyContent: "flex-start",
  alignItems: "flex-end",
  padding: "4px 0px 0px 0px",
  boxSizing: "border-box",
  alignSelf: "stretch",
  margin: "0px",
  fontSize: "18px",
  left: "30px",
  top: "-120px",
});

const Nilaibox = styled("span")({
  display: "flex",
  position: "relative",
  isolation: "isolate",
  flexDirection: "column",
  justifyContent: "flex-start",
  alignItems: "flex-end",
  padding: "4px 0px 0px 0px",
  boxSizing: "border-box",
  alignSelf: "stretch",
  margin: "0px",
  fontSize: "20px",
  left: "30px",
  top: "-120px",
});

const LayerGrafik1 = styled("div")({
  display: `flex`,
  position: `relative`,
  isolation: `isolate`,
  flexDirection: `column`,
  justifyContent: `flex-start`,
  alignItems: `flex-start`,
  padding: `0px`,
  boxSizing: `border-box`,
  width: `250px`, // 378px / 1920px * 100%
  height: `250px`, // 301px / 1080px * 100%
});

const styles = {
  root: {
    display: "flex",
  },
  sidebar: {
    backgroundColor: "#333",
    color: "#fff",
    width: "220px",
    position: "fixed",
    marginTop: "120px",
    marginLeft: "50px",
    height: "70%",
  },
  content1: {
    marginTop: "120px",
    flex: 1,
    marginLeft: "320px",
    padding: "10px",
  },
};

function DashboardNew() {
  const navigate = useRouter();
  const [id_admin, setId_admin] = useState(0)
  const [token, setToken] = useState("")
  const [data, setData]= useState("")
  const route = useRouter()
  const [dataAp, setDataAp]=useState([])
  const {id_user} = route.query
  const [selectedValue, setSelectedValue] = useState("");


  
 useEffect(() => {
  const tokenjwt = localStorage.getItem("tokenJwt");

  if (!tokenjwt) {
    alert("Anda harus login terlebih dahulu");
    navigate.push("login");
    return; // Keluar dari useEffect jika tidak ada token
  }

  setToken(tokenjwt);

  const decodedToken = jwt.decode(tokenjwt);
  setId_admin(decodedToken.id_admin);

  const fetchData = async () => {
    try {
      const axiosInstance = axios.create({
        baseURL: "http://127.0.0.1:4000",
        headers: {
          Authorization: `Bearer ${tokenjwt}`,
        },
      });

      const id_userss = selectedValue;

      const response = await (id_userss
        ? axiosInstance.get(`/admin/getDashboard?id_users=${id_userss}`)
        : axiosInstance.get(`/admin/getDashboard`)
      );

      const responseData = response.data.data;
      setData(responseData);
    } catch (error) {
      console.error("Terjadi kesalahan:", error);
      // Tangani kesalahan di sini
    }
  };

  fetchData();
}, [navigate, selectedValue]);

  console.log(data);
  

   //mengambil data Semua AP
   useEffect(()=>{
    
    const GetDataAp = async ()=>{

      try{
        const axiosInstance = axios.create({
          baseURL: "http://127.0.0.1:4000",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const response = await axiosInstance.get('admin/all_user')

        setDataAp(response.data.data.map((item) => ({
          id: item.IdUser,
          name: item.NamaAP,
        })))

      }catch(error){
        console.error("Terjadi kesalahan:", error);
      }

    }
    GetDataAp()
  },[token])

  const handleValueChange = (value) => {
    setSelectedValue(value);
  };

  const belum_realisasi = data.Persentase_Belum_Realisasi
  const realisasi = data.Persentase_Realisasi

  return (
    <div style={styles.root}>
      {token ? (
        <>
        <Navbar />
        <Sidebar />
        <div style={styles.content1}>
          <Container maxWidth="xl">
            <Grid container spacing={5}>
              <Grid item xs={12} sm={12} md={2}>
                <Kolom1>
                  <Kotak2 />
                  <TulisanBox>Komitmen</TulisanBox>
                  <Nilaibox>{data.Komitmen}</Nilaibox>
                </Kolom1>
              </Grid>
              <Grid item xs={12} sm={12} md={2}>
                <Kolom1>
                  <Kotak2></Kotak2>
                  <TulisanBox>Realisasi</TulisanBox>
                  <Nilaibox>{data.Realisasi}</Nilaibox>
                </Kolom1>
              </Grid>
              <Grid item xs={12} sm={12} md={2}>
                <Kolom1>
                  <Kotak2></Kotak2>
                  <TulisanBox>Belum Realisasi</TulisanBox>
                  <Nilaibox>{data.Belum_realisasi}</Nilaibox>
                </Kolom1>
              </Grid>
              <Grid item xs={12} sm={12} md={2}>
                <Kolom1>
                  <Kotak2></Kotak2>
                  <TulisanBox>TKDN</TulisanBox>
                  <Nilaibox>{data.TKDN}</Nilaibox>
                </Kolom1>
              </Grid>
              <Grid item xs={12} sm={12} md={2}>
                <Kolom1>
                  <Kotak2></Kotak2>
                  <TulisanBox>PDN</TulisanBox>
                  <Nilaibox>{data.PDN}</Nilaibox>
                </Kolom1>
              </Grid>
              <Grid item xs={12} sm={12} md={2}>
                <Kolom1>
                  <Kotak2></Kotak2>
                  <TulisanBox>Import</TulisanBox>
                  <Nilaibox>{data.Import}</Nilaibox>
                </Kolom1>
              </Grid>
              <Grid item xs={4} sm={4} md={4}>
                <Select dataAP={dataAp}onValueChange={handleValueChange}/>
              </Grid>

              <Grid container spacing={60}>
                {/* Grafik Pertama */}
                <Grid item xs={12} sm={12} md={2}>
                  <LayerGrafik1>
                  Perbandingan Persentase Realisasi Anggaran Belanja Keseluruhan terhadap Komitmen Periode 2023

                    <Chart1 data1={realisasi} data2={belum_realisasi}/>
                  </LayerGrafik1>
                </Grid>

                {/* Grafik Kedua */}
                <Grid item xs={12} sm={12} md={2}>
                  <LayerGrafik1>
                  Perbandingan Persentase Realisasi Anggaran PDN+TKDN terhadap Komitmen Periode 2023

                    <DoughnutChart />
                  </LayerGrafik1>
                </Grid>

                {/* Grafik Ketiga */}
                <Grid item xs={12} sm={12} md={2}>
                  <LayerGrafik1>
                  Perbandingan Persentase Realisasi Anggaran Belanja Impor terhadap Komitmen Periode 2023

                    <DoughnutChart />
                  </LayerGrafik1>
                </Grid>
              </Grid>
              <Grid container style={{ marginTop: "80px" }}>
                <Grid item xs={12} sm={12} md={50}>
                  <DenseTable />
                </Grid>
              </Grid>
            </Grid>
          </Container>
        </div>
        </>
      ) : (
        <div
          style={{ backgroundColor: "radial-gradient(#d2f1df, #d3d7fa, #bad8f4)", width: "100%", height: "100vh" }}
        ></div>
      )}
      
    </div>
  );
}

export default DashboardNew;
