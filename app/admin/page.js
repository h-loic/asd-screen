"use client"

import React, { useEffect, useState } from "react";
import { imgDB,txtDB } from "../firebase";
import { v4 } from "uuid";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { addDoc, collection, getDocs, doc, where, query,deleteDoc } from "firebase/firestore";

export default function Admin() {


  const [txt,setTxt] = useState('')
  const [img,setImg] = useState('')
  const [data,setData] = useState([])

  const handleUpload = (e) =>{
      console.log(e.target.files[0])
      const imgs = ref(imgDB,`Imgs/${v4()}`)
      uploadBytes(imgs,e.target.files[0]).then(data=>{
          console.log(data,"imgs")
          getDownloadURL(data.ref).then(val=>{
              setImg(val)
          })
      })
  }

  const handleClick = async () =>{
    const valRef = collection(txtDB,'txtData')
    await addDoc(valRef,{txtVal:txt,imgUrl:img})
    alert("Data added successfully")
    getData()
  }

  const getData = async () =>{
      setData([])
      const valRef = collection(txtDB,'txtData')
      const dataDb = await getDocs(valRef)
      const allData = dataDb.docs.map(val=>({...val.data(),id:val.id}))
      setData(allData)
  }

  const deleteImg = async (imgUrl) => {
    const d = query(collection(txtDB, 'txtData'), where("imgUrl", "==", imgUrl));
    const docSnap = await getDocs(d);
    docSnap.forEach(async (docu) => {
      await deleteDoc(docu.ref);
    });
    getData()
  }

  useEffect(()=>{
    getData()
  },[])
  console.log(data,"datadata")

    return (
        <div className="p-8">   
            <h1 className='text-4xl p-4 text-center mb-5'>Administration</h1>
            <div className='m-5'>
              <input onChange={(e)=>setTxt(e.target.value)} /><br/>
              <input type="file" onChange={(e)=>handleUpload(e)} /><br/><br/>
              <button className="bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mb-5"
              onClick={handleClick}>ajouter l'image</button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {data.map((image) =>(
                    <div key={image.imgUrl}>
                      <img className="h-auto max-w-full rounded-lg" src={image.imgUrl}/>
                      <button onClick={() => deleteImg(image.imgUrl)} className="bg-red-500 hover:bg-blue-700 text-white font-bold py-2 m-3 px-4 rounded-full">
                        supprimer
                      </button>
                    </div>
                ))}
            </div>
        </div>
    )
}
