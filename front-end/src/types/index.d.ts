type Drawing = {
    x: number;
    y: number;
    color: string;
    brushSize: number;
};
type ContextType = {
    drawing: Drawing[];
    setDrawing: React.Dispatch<React.SetStateAction<Drawing[]>>;
    roomId: string;
    setRoomId: React.Dispatch<React.SetStateAction<string>>;
    setMouseDown: React.Dispatch<React.SetStateAction<boolean>>;
    brushSize: number;
    setBrushSize: React.Dispatch<React.SetStateAction<number>>;
    color: string;
    setColor: React.Dispatch<React.SetStateAction<string>>;
    canvasRef: React.RefObject<HTMLCanvasElement> | null;
    mouseMove: (event: React.MouseEvent<HTMLCanvasElement>) => void;
    clearCanvas: () => void;
};
