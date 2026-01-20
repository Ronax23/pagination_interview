import { useEffect, useState } from 'react'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import axios from 'axios';

import { Paginator } from 'primereact/paginator';
        
interface TypeId {
    id: number;
    title: string;
    place_of_origin: string;
    artist_display: string;
    inscriptions: string;
    date_start: number;
    date_end: number;
}
interface ApiType {
    pagination: {
        total: number;
        total_pages: number;
    };
    data: Artwork[];
}
function App() {
    const [product,setproduct]=useState<ApiType>({data:[],pagination:{}});
    const [first, setFirst] = useState(0);
    const [rows, setRows] = useState(12);
    const [check,setcheck]=useState([]);
    let page:number;
  const apidat=()=>{
    page= first/rows + 1
    axios.get(`https://api.artic.edu/api/v1/artworks?page=${page}`).then(
    (res)=>{setproduct(res.data)}).catch((error)=>{console.log(error)});}
  useEffect(()=>
  { apidat()} ,[first])


    const onPageChange = (event) => {
        setFirst(event.first);
        setRows(event.rows);
    };

  return (
<>
<p>{`Selected: ${check.length} rows`}</p>
   <DataTable value={product.data} tableStyle={{ maxWidth: '95%' }} selection={check} onSelectionChange={(e)=>{setcheck(e.value)}}>
    <Column selectionMode="multiple" headerStyle={{ width: '10px' }} />


    <Column field="title" header="title"></Column>
    <Column field="place_of_origin" header="Place Of Origin"></Column>
    <Column field="artist_display" header="Artist Display"></Column>
    <Column field="inscriptions" header="Inscriptions"></Column>
    <Column field="date_start" header="Date Start"></Column>
    <Column field="date_end" header="Date End"></Column>
</DataTable>

 <div className="card">
           <div className="sep">
            <p>{`Showing ${first+1} to  ${Math.min(first + rows, product.pagination?.total)} out of ${product.pagination?.total}`}</p>
           </div>
            <Paginator first={first} rows={rows} totalRecords={product.pagination?.total_pages} onPageChange={onPageChange} />
        </div>


</>
        
  )
}

export default App
