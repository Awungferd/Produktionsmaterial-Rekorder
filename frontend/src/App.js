import './App.css';
import Media from 'react-media'
import Axios from "axios"
import { useState,  useEffect } from "react"
import DesktopDisplay from './components/DesktopDisplay';
import MobileDisplay from "./components/MobileDisplay"

function App(props) {
    const [inventoryData, setInventoryData] = useState([])
    const [material, setMaterial] = useState("")
    const [chargenNr, setChargenNr] = useState("")
    const [menge, setMenge] = useState("")
    const [idBearbeiten, setBearbeiten] = useState(null)
    const [editEntryById, setEditById] = useState("")
   
    // selects an Id to edit entries associated with it

    // ================================================================


    useEffect(() => {
        Axios.get("http://localhost:3009/getEntries").then((response) => {
            setInventoryData(response.data)
        })
    }, [])

    const createNewEntry = (e) => {
        e.preventDefault()
        Axios.post("http://localhost:3009/postErschaffen", {material, chargenNr, menge}).then((response) => {
            alert("Material gespeichert!")
        }).catch((error) => {
            alert(error.message)
        })
        setMaterial("")
        setChargenNr("")
        setMenge("")
        window.location.reload(true);
    }
    // ======================
    function modifyEntry(_id) {
        Axios.patch("http://localhost:3009/bearbeiten", {material, chargenNr, menge, _id: editEntryById}).then((response) => {
            alert("Data saved!")
        }).catch((error) => {
            alert(error.message)
        })
        setEditById("")
        setMaterial("")
        setChargenNr("")
        setMenge("")
        window.location.reload(true);
    }
    // ==================
    const deleteItem = async(_id) =>{
if (_id){
    try {
        const res = await Axios.delete(`http://localhost:3009/entfernen/${_id}`)
        console.log(res.data.message) 
    } catch (error) {
        console.log(error.message)
    } 
} else {return alert("Error deleting")}
window.location.reload(true);
        
    }

    return (
        <div className="App">
            <div>
  
  <Media query="(max-width: 599px)">
  
    {matches =>
      matches ? (
          <MobileDisplay material={material}
          setMaterial={setMaterial}
          chargenNr={chargenNr}
          setChargenNr={setChargenNr}
          inventoryData={inventoryData}
          setInventoryData={setInventoryData}
          editEntryById={editEntryById}
          setEditById={setEditById}
          idBearbeiten={idBearbeiten}
          setBearbeiten={setBearbeiten}
          menge={menge}
          createNewEntry={createNewEntry}
          setMenge={setMenge}
          deleteItem={deleteItem}
          />
         
      ) : (
          <DesktopDisplay material={material}
          setMaterial={setMaterial}
          chargenNr={chargenNr}
          setChargenNr={setChargenNr}
          inventoryData={inventoryData}
          setInventoryData={setInventoryData}
          editEntryById={editEntryById}
          setEditById={setEditById}
          idBearbeiten={idBearbeiten}
          setBearbeiten={setBearbeiten}
          menge={menge}
          setMenge={setMenge}
          createNewEntry={createNewEntry}
          modifyEntry={modifyEntry}
          deleteItem={deleteItem}
          />
      )
    }
  </Media>
</div>

        </div>
    );
}

export default App;
