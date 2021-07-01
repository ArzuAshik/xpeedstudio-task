import React from 'react';

const MakeInputElement = ({data, k: key, handleInput, formData}) => {
    const {title, type, value, required, html_attr} = data;
    const attributes = {};
    Object.entries(html_attr).forEach(([k, v]) => {
        if(k === "class") attributes.className = v;
        else{
            attributes[k] = v;
        }
    })
        if(type !== "radio" && type !== "select"){
            return (
            <div >
                <label>{title}
                    <input onChange={e => handleInput(e)} type={type} name={key} defaultValue={value} required={required} {...attributes} />
                </label>
            </div>
            );
        }
        else{
            const { default: defaultValue, options } = data;            
            if(type === "select"){
                return (
                    <div >
                        <label>{title}
                            <select onChange={e => handleInput(e)} name={key} defaultValue={defaultValue} required={required} {...attributes} >
                                {
                                    options.map( ({key: val, label}) => <option key={val} value={val}>{label}</option>)
                                }
                            </select>
                        </label>
                    </div>
                );
            }
            else{
                return (
                    <div >
                        <p>{title}</p>
                            {
                                options.map( ({key: val, label}) =>{
                                    const checked = {}
                                    if(formData[key] === val) checked.checked = "checked";
                                    return(
                                        <label key={val} >
                                        <input onChange={e => handleInput(e)} name={key} type="radio" value={val} {...attributes} {...checked} />
                                        {label}
                                        </label>
                                    )
                                })
                            }
                            <label>{title}
                        </label>
                    </div>
                );
            }
        }
};

export default MakeInputElement;