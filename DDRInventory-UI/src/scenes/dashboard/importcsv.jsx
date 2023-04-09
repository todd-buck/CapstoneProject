import { useState } from 'react';
import UnderConstructionComponent from '../global/underConstruction.jsx'

import { target_URL } from "../../App.js"

const isFinished = false;


const ImportCSVComponent = () => {
    // eslint-disable-next-line
    const [file, setFile] = useState()

    function handleChange(event) {
        setFile(event.target.files[0])
    }

    function handleSubmit(event) {
        fetch(target_URL + "/api/uploadCSV", {
            accept: 'text/plain',
            method: 'POST',
            mode: 'cors',
            headers: { 'content-type': 'multipart/form-data' },
            body: FormData
        }).then((response) => response.status)
            .then((responseStatus) => {
                if (responseStatus === 451) {
                    console.log("Item not found. Response: " + responseStatus.toString())
                }
                else {
                    console.log("Exiting fetch post without error. Response: " + responseStatus.toString())
                    //window.location.reload()
                }
            })

    }

    if (isFinished) {
        return (
            <div className="ImportCSVComponent">
                <form onSubmit={handleSubmit}>
                    <h1>CSV File Upload</h1>
                    <input type="file" accept=".csv" onChange={handleChange} />
                    <button type="submit" onclick="handleSubmit(file)">Upload</button>
                </form>
            </div>
        );
    } else {
        return (
            <UnderConstructionComponent />
        );
    }


}
 
export default ImportCSVComponent;
