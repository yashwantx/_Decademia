import React from 'react'
import { useState } from 'react';
import Link from 'next/link';
import ResearchData from "../components/researchData"
import { Web3Storage } from 'web3.storage'
import Nftmint from "../components/Nftmint"
import { useRef } from 'react';

var projecDetailsValues = {}

var imageData = {}

function CreateProject() {

    const inputRef = useRef(null);
    const [userName, setUserName] = useState("");
    const [description, setDescription] = useState("");
    const [imgUrl, setimgUrl] = useState("");

    const handleInputChange = (e) => {
        const val = e.target.value;
        setUserName(val);
    };
    const handleValueChange = (e) => {
        const val = e.target.value;
        setDescription(val);
    };

    const onSubmit = async (params) => {
        const form = new FormData();
        console.log(inputRef);
        form.append("file", inputRef.current.files[0]);

        const options = {
            method: "POST",
            body: form,
            headers: {
                Authorization: "3da114a9-4a03-4698-a3d8-cbda2cc42e54",
            },
        };

        await fetch("https://api.nftport.xyz/v0/files", options)
            .then((response) => {
                return response.json();
            })
            .then((responseJson) => {
                // Handle the response
                console.log(responseJson);
                console.log(responseJson.ipfs_url);

                setimgUrl(responseJson.ipfs_url);

                // const { ipfs_url } = responseJson;
                // document.getElementById('image').textContent = image;
            });

        await fetch(
            "https://api.nftport.xyz/v0/mints/easy/files?" +
            new URLSearchParams({
                chain: "polygon",
                name: userName,
                description: description,
                mint_to_address: "0x723F3343a867eFfE37F77538C33E4Fb03b325208",
            }),
            options
        )
            .then(function (response) {
                return response.json();
            })
            .then(function (responseJson) {
                // Handle the response
                console.log(responseJson);
            });
    };



    const [projectDetails, setprojectDetails] = useState({
        name: " ", summary: " ", clinicalStage: " ", therapeuticArea: " ", patientStatus: " ",
        country: " ", image: " "
    });
    let name, value;

    const handleInputs = async (e) => {
        e.preventDefault();
        name = e.target.name;
        value = e.target.value;
        setprojectDetails({ ...projectDetails, [name]: value })
        projecDetailsValues = { ...projectDetails, [name]: value };

    }

    const fileselectedhandler = e => {
        image = (e.target.files[0]);
        console.log(image);
        // console.log(imageData); 
    }


    async function callbackFunction(event) {
        event.preventDefault();
        ResearchData(projectDetails)
        var contents = JSON.stringify(projectDetails);
        var blob = new Blob([contents], { type: 'text/plain' });
        var file = new File([blob], "foo.txt", { type: "text/plain" });


        const token = process.env.NEXT_PUBLIC_TOKEN;
        const storage = new Web3Storage({ token });

        var cid = await storage.put([file]);
        console.log(cid);
        alert(`Project Details stored in IPFS CID: ${cid}`)

    }


    return (
        <div>
            <div className='grid grid-flow-col-1 '>

                <div className=' absolute left-10 mt-20 right-5 m-auto pl-20 flex flex-col w-2/3  rounded-md decoration'>
                    <di className="absolute right-10 mb-2 ">
                        <Link href='/ProjectsubFaq'>
                            <button className='bg-purple-800 p-2 top-2 m-2'> Go to Submission FAQ's</button>
                        </Link>
                    </di>
                    <h2 className='relative mb-3 hover:underline'>Create a new Project </h2>

                    <div className='mt-5 col-span-2 w-full h-auto shadow-xl shadow-gray-400 rounded-xl lg:p-4'>
                        <div className='relative flex flex-col'>
                            <h2 className='text-2xl text-slate-400 text-center font-thin'> <span className=' relative top-2 text-centre justify-center'> **</span>  This information is used to give investiors the brief overview of your project <span className='relative top-2 text-centre justify-center'> **</span> </h2>
                        </div>
                        <h2 className='mb-4 mt-10'> Basic Information </h2>
                        <div className='p-4'>
                            <form id='researchData'>

                                <div className='flex flex-col'>
                                    <label className='uppercase text-md text-slate-400 py-2'> Project Name * </label>
                                    <input
                                        className='border-2 rounded-lg p-3  text-slate-400 flex border-gray-300'
                                        type='text'
                                        name='name'
                                        id='name'
                                        value={projectDetails.name}
                                        placeholder='Discovering Novel Autophagy Activation'
                                        onChange={handleInputs}
                                        autoComplete="off"
                                    />
                                </div>

                                <div className='flex flex-col py-2'>
                                    <label className='uppercase  text-slate-400 text-md py-2'> Summary * </label>
                                    <p className=' text-slate-400 text-sm py-2' >Brief summary for your project. URLs are hyperlinked.</p>
                                    <textarea
                                        className='border-2 rounded-lg p-3 border-gray-300'
                                        rows='6'
                                        id='summary'
                                        name='summary'
                                        value={projectDetails.summary}
                                        onChange={handleInputs}
                                        autoComplete="off"
                                    ></textarea>
                                </div>

                                <div className='flex flex-col py-2'>
                                    <label className='uppercase  text-slate-400 text-md py-2'>Clinical Stage *</label>
                                    <input
                                        className='border-2 rounded-lg p-3 flex border-gray-300'
                                        type='text'
                                        id='clinicalStage'
                                        name='clinicalStage'
                                        value={projectDetails.clinicalStage}
                                        placeholder='Please Select One'
                                        onChange={handleInputs}
                                        autoComplete="off"
                                    />
                                </div>
                                <div className='flex flex-col py-2'>
                                    <label className='uppercase  text-slate-400 text-md py-2'>Therapeutic Area *</label>
                                    <input
                                        className='border-2 rounded-lg p-3  text-slate-400 flex border-gray-300'
                                        type='text'
                                        name='therapeuticArea'
                                        id='therapeuticArea'
                                        value={projectDetails.therapeuticArea}
                                        placeholder='Select or search for areas...'
                                        onChange={handleInputs}
                                        autoComplete="off"
                                    />
                                </div>

                                <div className='flex flex-col py-2'>
                                    <label className='uppercase  text-slate-400 text-md py-2'>Patent Status *</label>
                                    <input
                                        className='border-2 rounded-lg p-3  text-slate-400 flex border-gray-300'
                                        type='text'
                                        name='patientStatus'
                                        id='patientStatus'
                                        value={projectDetails.patientStatus}
                                        placeholder='Please select one'
                                        onChange={handleInputs}
                                        autoComplete="off"
                                    />
                                </div>

                                <div className='flex flex-col py-2'>
                                    <label className='uppercase  text-slate-400 text-md py-2'>Country *</label>
                                    <input
                                        className='border-2 rounded-lg p-3  text-slate-400 flex border-gray-300'
                                        type='text'
                                        name='country'
                                        id='country'
                                        value={projectDetails.country}
                                        placeholder='Please select one'
                                        onChange={handleInputs}
                                        autoComplete="off"
                                    />
                                </div>
                                <div className='flex flex-col py-2'>
                                    <label htmlFor='image' className='uppercase  text-slate-400 text-md py-2'>Choose a file </label>
                                    <input
                                        className='border-2 rounded-lg p-3  text-slate-400 flex border-gray-300'
                                        type='file'
                                        name='image'
                                        id='image'                 
                                        autoComplete="off"
                                        ref={inputRef}
                                    />

                                    <button className='mt-2 bg-gradient-to-r from-[#a200d6] to-[#709dff]'> Mint it as NFT</button>
                                </div>



                                <button className='bg-gradient-to-r from-[#a200d6] to-[#709dff]  rounded-full p-4 text-gray-900 mt-4' type="submit" onClick={callbackFunction}>
                                    save & continue
                                </button>
                            </form>


                        </div>
                        <Link href="/">
                            <p className="relative left-3 rounded-full mt-4 cursor-pointer text-xl text-center justify-center bg-purple-200 w-24">Back</p>
                        </Link>
                    </div>
                </div>

            </div>


        </div>
    )
}


export default CreateProject