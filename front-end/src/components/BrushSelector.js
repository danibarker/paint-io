const BrushSelector = ({ setBrushSize }) => {
  return (
    <div className="brush-selector">
      <p>Choose a Brush Size</p>
      <input
        type="range"
        min="1"
        max="10"
        onChange={(e) => setBrushSize(e.target.value)}
      />
    </div>
  );
};

export default BrushSelector;
