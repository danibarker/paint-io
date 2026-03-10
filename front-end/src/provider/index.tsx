import { onValue, ref, set } from "firebase/database";
import React, { useCallback, useEffect } from "react";
import database from "../functions/firebase";

export const Context = React.createContext<ContextType>({
    drawing: [],
    setDrawing: () => {},
    roomId: "",
    setRoomId: () => {},
    setMouseDown: () => {},
    brushSize: 5,
    setBrushSize: () => {},
    color: "#000000",
    setColor: () => {},
    canvasRef: null,
    clearCanvas: () => {},
    mouseMove: () => {},
});

const ContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [drawing, setDrawing] = React.useState<Drawing[]>([]);
    const [previousDrawing, setPreviousDrawing] = React.useState<Drawing[]>([]);
    const [roomId, setRoomId] = React.useState<string>("");
    const [mouseDown, setMouseDown] = React.useState<boolean>(false);
    const [brushSize, setBrushSize] = React.useState<number>(5);
    const [color, setColor] = React.useState<string>("#000000");
    const canvasRef = React.useRef<HTMLCanvasElement | null>(null);

    const clearCanvas = useCallback(() => {
        const data: Drawing[] = [];
        set(ref(database, "rooms/" + roomId), { drawing: data });
    }, [roomId]);

    useEffect(() => {
        console.log(import.meta.env.MODE);
        if (!roomId) {
            clearCanvas();
            return;
        }
        const drawingRef = ref(database, "rooms/" + roomId);
        const unsub = onValue(drawingRef, (snapshot) => {
            const data = snapshot.val();
            console.log("data is", data);
            if (data) {
                setDrawing((prev) => {
                    setPreviousDrawing(prev);
                    return data.drawing;
                });
            } else {
                setDrawing((prev) => {
                    setPreviousDrawing(prev);
                    return [];
                });
            }
        });

        return () => {
            unsub();
        };
    }, [roomId, clearCanvas]);

    function mouseMove(event: React.MouseEvent<HTMLCanvasElement>) {
        if (!canvasRef.current) {
            console.error("Canvas not found");
            return;
        }
        const rect = canvasRef.current.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        if (mouseDown) {
            const data = {
                x,
                y,
                color,
                brushSize,
            };
            const newData = [...drawing, data];
            set(ref(database, "rooms/" + roomId), { drawing: newData });
        }
    }

    useEffect(() => {
        if (!canvasRef.current) {
            console.error("Canvas not found");
            return;
        }
        const ctx = canvasRef.current.getContext("2d");
        if (!ctx) {
            console.error("Context not found");
            return;
        }
        if (drawing.length === 0) {
            ctx.beginPath();
            ctx.fillStyle = "#fff7e0";
            ctx.rect(0, 0, canvasRef.current.width, canvasRef.current.height);
            ctx.fill();
        }
        const newDrawing = drawing.slice(previousDrawing.length);
        for (let i = 0; i < newDrawing.length; i++) {
            ctx.beginPath();
            ctx.arc(
                newDrawing[i].x,
                newDrawing[i].y,
                newDrawing[i].brushSize,
                0,
                2 * Math.PI
            );
            ctx.fillStyle = newDrawing[i].color;
            ctx.fill();
        }
    }, [drawing]);

    const values = {
        drawing,
        setDrawing,
        roomId,
        setRoomId,
        setMouseDown,
        brushSize,
        setBrushSize,
        color,
        setColor,
        canvasRef,
        clearCanvas,
        mouseMove,
    };
    return <Context.Provider value={values}>{children}</Context.Provider>;
};

export default ContextProvider;
