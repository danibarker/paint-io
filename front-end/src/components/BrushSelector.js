const BrushSelector = ({ setBrushSize ,brushSize}) => {
  return (
    <div className="brush-selector">
      <p>Choose a Brush Size</p>
      <input
        type="range"
        min="2"
        max="30"
        onChange={(e) => setBrushSize(e.target.value)}
        value={brushSize}
      />
    </div>
  );
};

export default BrushSelector;
