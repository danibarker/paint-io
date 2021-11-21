const ColorSelector = ({setColor}) => {
    const selectFromColorCircles = (e) => {
        setColor(window.getComputedStyle(e.target, null).getPropertyValue("background-color"))
    }

    return (
        <div className="color-selector">
            <div>
                <p>Colour:</p>
            </div>
            <div className="color-choices">
                <div className="color-option color1" onClick={(e) => selectFromColorCircles(e)}></div>
                <div className="color-option color2" onClick={(e) => selectFromColorCircles(e)}></div>
                <div className="color-option color3" onClick={(e) => selectFromColorCircles(e)}></div>
                <div className="color-option color4" onClick={(e) => selectFromColorCircles(e)}></div>
                <div className="color-option color5" onClick={(e) => selectFromColorCircles(e)}></div>
                <div className="color-option color6" onClick={(e) => selectFromColorCircles(e)}></div>
                <div className="color-option color7" onClick={(e) => selectFromColorCircles(e)}></div>
                <div className="color-option color8" onClick={(e) => selectFromColorCircles(e)}></div>
                <div className="color-option color9" onClick={(e) => selectFromColorCircles(e)}></div>
                <div className="color-selector-container">
                    <input 
                        className="color-option color10" type="color" 
                        onChange={e=>setColor(e.target.value)}/>
                    <div className="color-selector-label">More</div>
                </div>
            </div>
        </div>
    )
}

export default ColorSelector