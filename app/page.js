"use client"
import React, { useEffect, useState } from "react";
import CarouselSlideshow from '../components/carousel';
import { imgDB,txtDB } from "./firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { addDoc, collection, getDocs, doc, where, query,deleteDoc } from "firebase/firestore";

export default function Home() {

    const [data,setData] = useState([])

    const getData = async () =>{
        const valRef = collection(txtDB,'txtData')
        const dataDb = await getDocs(valRef)
        const allData = dataDb.docs.map(val=>({...val.data(),id:val.id}))
        const imagesArray = []
        allData.forEach(element => {
            imagesArray.push(element.imgUrl)
        });
        setData(imagesArray)
        console.log(imagesArray)
    }

    useEffect(()=>{
            getData()
    },[])

    const images = [
        '/image.jpg',
        '/image.jpg',
        '/image.jpg',
        // Add more image URLs here
      ];

    return (
        <div>
            <CarouselSlideshow images={data}></CarouselSlideshow>
        </div>
    );
}
