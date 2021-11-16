const BrushSelector = ({ setBrush }) => {
  return (
    <div
      style={{ display: "flex", alignItems: "center" }}
    >
      <p style={{ padding: "20px" }}>Choose a brush size</p>
      <input
        type="range"
        min="1"
        max="10"
        onChange={(e) => setBrush(e.target.value)}
      />
    </div>
  );
};

export default BrushSelector;
