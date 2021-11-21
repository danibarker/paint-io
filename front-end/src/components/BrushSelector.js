const BrushSelector = ({ setBrushSize ,brushSize, color}) => {
  return (
    <div className="brush-selector">
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
  );
};

export default BrushSelector;
