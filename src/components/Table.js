import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const Table = () => {
    const [headers, setHeaders] = useState({});
    const [rows, setRows] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
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

    useEffect( () => {
        fetch("https://riaz.dev.alpha.net.bd/testing/api/list.php")
        .then(res => res.json())
        .then(result => {
            setHeaders(result.data.headers[0]);
            const r = result.data.rows.map(d => {
                return {...d, update: <button onClick={() => handleUpdate(d.id)} className="update-button" >Update</button>};
            })
            setRows(r);
            setIsLoading(false);
            result.messages.forEach(msg => {
            console.log("🚀 ~ file: Table.js ~ line 30 ~ useEffect ~ result.data.headers[0]", result.data.headers[0])
            console.log("🚀 ~ file: Table.js ~ line 30 ~ useEffect ~ result.data.rows", result.data.rows)
                notify(result.status === "false" ? "error" : "success", msg);
            })
        });
    }, []);

    // const UpdateBtn = id => <button onClick={() => handleUpdate(d.id)}>Update</button>
    function handleUpdate(id){
        console.log(id);
    }

    return (
        <div>            
            <DataTable lazy value={rows} loading={isLoading}>
                {
                    Object.keys(headers).map(key => {
                        const {hidden, searchable, sortable, title} = headers[key];
                        return (hidden ? null : <Column key={key} filter={searchable} sortable={sortable} field={key} header={title} />)

                    })
                }
                <Column filter={false} sortable={false} field="update" header="Update" />
            </DataTable>
        </div>
    );
}

export default Table;