const ColorSelector = ({setColor}) => {
    return (
        <div className="color-selector">
            <p>Choose a Color</p>
            <input type="color" onChange={e=>setColor(e.target.value)}/>
        </div>
    )
}

export default ColorSelector