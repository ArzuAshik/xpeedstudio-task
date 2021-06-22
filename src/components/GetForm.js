import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const GetForm = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formStructure, setFormStructure] = useState({});
    const [formData, setFormData] = useState({});
    const notify = (type, message) => {
        toast[type](message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        })
    };

    useEffect(() => {
        fetch("https://riaz.dev.alpha.net.bd/testing/api/get_form.php")
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
        console.log(formData);


        fetch("https://riaz.dev.alpha.net.bd/testing/api/submit_form.php", {
            method: "POST",
            body: JSON.stringify(formData)
        })
        .then(res => res.json())
        .then(({status, messages}) => {
            setIsSubmitting(false);
            messages.forEach(msg => notify(status, msg));
        })
    }

    const handleInput = (e) => {
        const {name, value} = e.target;
        const newFormData = {...formData};
        newFormData[name] = value;
        setFormData(newFormData);
        console.log(name, value);
    }

    function makeInputElement(key){
        const data = formStructure[key];
        const {title, type, value, required, html_attr} = data;
        console.log(data);
        if(type !== "radio" && type !== "select"){
            return (
            <div key={key} >
                <label>{title}
                    <input onChange={e => handleInput(e)} type={type} name={key} defaultValue={value} required={required} {...html_attr} />
                </label>
            </div>
            )
        } else{
            const { default: defaultValue, options } = data;
            if(type === "select"){
                return (
                    <div key={key} >
                        <label>{title}
                            <select onChange={e => handleInput(e)} name={key} defaultValue={defaultValue} required={required} {...html_attr} >
                                {
                                    options.map( ({key: val, label}) => <option key={val} value={val}>{label}</option>)
                                }
                            </select>
                        </label>
                    </div>
                )
            } else{
                return (
                    <div key={key} >
                        <p>{title}</p>
                            {
                                options.map( ({key: val, label}) => <label key={val} >
                                    <input onChange={e => handleInput(e)} name={key} type="radio" value={val} {...html_attr} checked={val === defaultValue} />
                                    {label}
                                    </label>)
                            }
                            <label>{title}
                        </label>
                    </div>
                )
            }
        }

    }
    return (
        isLoading ? "Loading" :
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                {
                    Object.keys(formStructure).map(key => makeInputElement(key))
                }
                <button type="submit" disabled={isSubmitting} >{isSubmitting ? "Submitting" : "Submit"}</button>
            </form>
        </div>
    );
};

export default GetForm;