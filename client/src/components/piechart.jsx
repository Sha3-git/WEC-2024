import axios from "axios"
function Piechart() {
    const id = '65b550994437c2c669def797';
    const getdata = async ()=>{
        const data = {
            id: '65b550994437c2c669def797'
        }
        const wantsData = await axios.get("http://localhost:4000/want/65b550994437c2c669def797",)
    const needsData = await axios.get("http://localhost:4000/need", {id: id})
    const expenseData = await axios.get("http://localhost:4000/expense", {id: id})
    console.log(wantsData);
    }
   
    getdata();
    
  return (
    <>

    </>
  )
}

export default Piechart