import { useState } from 'react';
import UnderConstructionComponent from '../global/underConstruction.jsx'

import { target_URL } from "../../App.js"

const isFinished = true;


const ImportCSVComponent = () => {
    // eslint-disable-next-line
    const [file, setFile] = useState()

    function handleChange(event) {
        setFile(event.target.files[0])
    }

    function handleSubmit(event) {
        event.preventDefault();
        const formData = new FormData();
        formData.append('file', file);
        fetch(target_URL + "/api/item/uploadCSV", {
            method: 'POST',
            mode: 'cors',
            body: formData
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
