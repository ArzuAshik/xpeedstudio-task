import React, { useEffect, useState } from 'react';
import baseURL from '../api';
import MakeInputElement from "./MakeInputElement";
import notify from './notify';

const GetForm = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formStructure, setFormStructure] = useState({});
    const [formData, setFormData] = useState({});

    useEffect(() => {
        fetch(baseURL + "get_form.php")
        .then(res => res.json())
        .then(result => {
            const data = result.data.fields[0]
            setFormStructure(data);
            const newFormData = {};
            Object.keys(data).forEach(k => {
                if(data[k].type === "select" || data[k].type === "radio"){
                    newFormData[k] = data[k].default;
                }
            });
            setFormData(newFormData);
            setIsLoading(false);
        })
    }, [])

    function handleSubmit(e){
        e.preventDefault();
        setIsSubmitting(true);


        fetch(baseURL + "submit_form.php", {
            method: "POST",
            body: JSON.stringify(formData)
        })
        .then(res => res.json())
        .then(({status, messages}) => {
            setIsSubmitting(false);
            messages.forEach(msg => notify(status, msg));
        });
    }

    const handleInput = (e) => {
        const {name, value} = e.target;
        const newFormData = {...formData};
        newFormData[name] = value;
        setFormData(newFormData);
    }

    
    return (
        isLoading ? <h2 style={{padding: "50px", textAlign: "center"}}>Loading...</h2> :
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                {
                    Object.keys(formStructure).map(key => <MakeInputElement k={key} key={key} handleInput={handleInput} formData={formData} data={formStructure[key]} />)
                }
                <button type="submit" disabled={isSubmitting} >{isSubmitting ? "Submitting" : "Submit"}</button>
            </form>
        </div>
    );
};

export default GetForm;