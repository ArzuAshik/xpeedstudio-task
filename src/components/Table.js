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
            setRows(result.data.rows);
            setIsLoading(false);
            result.messages.forEach(msg => {
                notify(result.status === "false" ? "error" : "success", msg);
            })
        });
    }, []);

    return (
        <div>
            {
                isLoading ? 
                "loading" 
                :
                <DataTable value={rows}>
                    {
                        Object.keys(headers).map(key => {
                            const {hidden, searchable, sortable, title} = headers[key];
                            return (hidden ? null : <Column filter={searchable} sortable={sortable} field={key} header={title} />)

                        })
                    }
                </DataTable>
            }
        </div>
    );
}

export default Table;