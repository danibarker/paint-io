const BrushSelector = ({ setBrushSize ,brushSize}) => {
  return (
    <div className="brush-selector">
      <p>Brush Size:</p>
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
          width: (brushSize*2)+"px"}}>
        </div>
      </div>
    </div>
  );
};

export default BrushSelector;
