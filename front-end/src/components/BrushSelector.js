const BrushSelector = ({ setBrushSize, brushSize, setColor, color}) => {
  return (
    <div className="brush-selector">
      <div className="brush-size-container">
        <div>
          <p>Brush Size:</p>
        </div>
        <input
          type="range"
          min="2"
          max="30"
          onChange={(e) => setBrushSize(e.target.value)}
          value={brushSize}
        />
        <div className="brush-preview">
          <div style={{
            height: (brushSize*2)+"px", 
            width: (brushSize*2)+"px", background:color}}>
          </div>
        </div>
      </div>
      <div className="eraser-container">
        <div 
          className="eraser"
          onClick={() => setColor("#fff7e0")}
        >
          <p>Eraser</p>
        </div>
      </div>
    </div>
  );
};

export default BrushSelector;
