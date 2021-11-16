const ColorSelector = ({setColor}) => {
    return (
        <div style={{display:"flex" ,alignItems:"center"}}>
            <p style={{padding:"20px"}}>Choose A Color</p>
            <input type="color" onChange={e=>setColor(e.target.value)}/>
        </div>
    )
}

export default ColorSelector