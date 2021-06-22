import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import notify from './notify';

const UpdateForm = ({list}) => {    
    const history = useHistory();
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    if(list.length === 0){
        history.push("/");
    }
    const {id} = useParams();
    let item = list.find(data => data.id === parseInt(id)) || {};
    const [formData, setFormData] = useState(item);

    function handleInput(e){
        const {name, value} = e.target;
        const newFormData = {...formData};
        newFormData[name] = value;
        setFormData(newFormData);
    }

    function handleSubmit(e){
        e.preventDefault();
        fetch("https://riaz.dev.alpha.net.bd/testing/api/submit_form.php", {
            method: "POST",
            body: JSON.stringify(formData)
        })
        .then(res => res.json())
        .then(({status, messages}) => {
            setIsSubmitting(false);
            messages.forEach(msg => notify(status, msg));
        });
    }
    
    return (
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                {
                    Object.keys(item).map(key => <div key ={key} >
                        <label>
                            {key}
                            <input readOnly={key === "id"} onChange={e => handleInput(e)} type="text" name={key} value={formData[key]} />
                        </label>
                    </div>
                    )
                }
                <button type="submit" disabled={isSubmitting} >{isSubmitting ? "Updating" : "Update"}</button>
            </form>
        </div>
    );
};

export default UpdateForm;