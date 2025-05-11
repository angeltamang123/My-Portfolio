"use client"; // Keep this if you're in a Next.js App Router client component
import React, { useEffect, useRef } from "react";

const FuzzyText = ({
  children,
  fontSize = "clamp(2rem, 10vw, 10rem)",
  fontWeight = 900,
  fontFamily = "inherit",
  color = "#fff",
  enableHover = true,
  baseIntensity = 0.18,
  hoverIntensity = 0.5,
}) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    let animationFrameId;
    let isCancelled = false;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const init = async () => {
      if (document.fonts?.ready) {
        await document.fonts.ready;
      }
      if (isCancelled) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const computedFontFamily =
        fontFamily === "inherit"
          ? window.getComputedStyle(canvas).fontFamily || "sans-serif"
          : fontFamily;
      // Log the font family being used
      console.log("[FuzzyText] Using font family:", computedFontFamily);

      const fontSizeStr =
        typeof fontSize === "number" ? `${fontSize}px` : fontSize;
      let numericFontSize;
      if (typeof fontSize === "number") {
        numericFontSize = fontSize;
      } else {
        const temp = document.createElement("span");
        temp.style.fontSize = fontSize;
        document.body.appendChild(temp);
        const computedSize = window.getComputedStyle(temp).fontSize;
        numericFontSize = parseFloat(computedSize);
        document.body.removeChild(temp);
      }
      // Log the calculated numeric font size
      console.log(
        "[FuzzyText] numericFontSize for '" + fontSize + "':",
        numericFontSize
      );

      const text = React.Children.toArray(children).join("");

      const offscreen = document.createElement("canvas");
      const offCtx = offscreen.getContext("2d");
      if (!offCtx) return;

      offCtx.font = `${fontWeight} ${fontSizeStr} ${computedFontFamily}`;
      offCtx.textBaseline = "alphabetic";
      const metrics = offCtx.measureText(text);
      console.log(
        "[FuzzyText] TextMetrics:",
        JSON.parse(JSON.stringify(metrics))
      );

      const actualLeft = metrics.actualBoundingBoxLeft ?? 0;
      const actualRight = metrics.actualBoundingBoxRight ?? metrics.width;

      // Original ascent/descent calculation from metrics or fallbacks
      const metricAscent = metrics.actualBoundingBoxAscent;
      const metricDescent = metrics.actualBoundingBoxDescent;
      console.log(
        "[FuzzyText] metricAscent:",
        metricAscent,
        "metricDescent:",
        metricDescent
      );

      const ascentForDrawing = metricAscent ?? numericFontSize;
      const descentForDrawing = metricDescent ?? numericFontSize * 0.2;

      const heightFromMetrics = Math.ceil(ascentForDrawing + descentForDrawing);
      console.log(
        "[FuzzyText] heightFromMetrics (ascentForDrawing + descentForDrawing):",
        heightFromMetrics
      );

      // --- MODIFICATION START ---
      // Ensure the canvas height is at least a certain factor of the nominal font size.
      // This provides some breathing room if actual font metrics are too "tight".
      // A factor of 1.2 means the canvas height will be at least 120% of the font size.
      const minHeightFactor = 1.2;
      const enforcedMinCanvasHeight = Math.ceil(
        numericFontSize * minHeightFactor
      );

      const tightHeight = Math.max(heightFromMetrics, enforcedMinCanvasHeight);
      console.log(
        "[FuzzyText] enforcedMinCanvasHeight:",
        enforcedMinCanvasHeight,
        "Final tightHeight:",
        tightHeight
      );
      // --- MODIFICATION END ---

      const textBoundingWidth = Math.ceil(actualLeft + actualRight);

      const extraWidthBuffer = 10;
      const offscreenWidth = textBoundingWidth + extraWidthBuffer;

      offscreen.width = offscreenWidth;
      offscreen.height = tightHeight; // Use the (potentially increased) tightHeight

      const xOffset = extraWidthBuffer / 2;
      offCtx.font = `${fontWeight} ${fontSizeStr} ${computedFontFamily}`;
      offCtx.textBaseline = "alphabetic";
      offCtx.fillStyle = color;
      // Use ascentForDrawing for the y-position of fillText. This is the baseline.
      // If tightHeight was increased, it just means more canvas space around the text.
      offCtx.fillText(text, xOffset - actualLeft, ascentForDrawing);

      const horizontalMargin = 50;
      const verticalMargin = 0; // Keeping this 0 as per original
      canvas.width = offscreenWidth + horizontalMargin * 2;
      canvas.height = tightHeight + verticalMargin * 2; // Canvas height is now based on the new tightHeight
      ctx.translate(horizontalMargin, verticalMargin);

      const interactiveLeft = horizontalMargin + xOffset;
      const interactiveTop = verticalMargin;
      const interactiveRight = interactiveLeft + textBoundingWidth;
      const interactiveBottom = interactiveTop + tightHeight;

      let isHovering = false;
      const fuzzRange = 30;

      const run = () => {
        // ... (rest of the run function is unchanged)
        if (isCancelled) return;
        ctx.clearRect(
          -fuzzRange,
          -fuzzRange,
          offscreenWidth + 2 * fuzzRange,
          tightHeight + 2 * fuzzRange
        );
        const intensity = isHovering ? hoverIntensity : baseIntensity;
        for (let j = 0; j < tightHeight; j++) {
          const dx = Math.floor(intensity * (Math.random() - 0.5) * fuzzRange);
          ctx.drawImage(
            offscreen,
            0,
            j,
            offscreenWidth,
            1,
            dx,
            j,
            offscreenWidth,
            1
          );
        }
        animationFrameId = window.requestAnimationFrame(run);
      };

      run();

      // ... (event listeners and cleanup are unchanged)
      const isInsideTextArea = (x, y) => {
        /* ... */
      };
      const handleMouseMove = (e) => {
        /* ... */
      };
      const handleMouseLeave = () => {
        /* ... */
      };
      const handleTouchMove = (e) => {
        /* ... */
      };
      const handleTouchEnd = () => {
        /* ... */
      };

      if (enableHover) {
        canvas.addEventListener("mousemove", handleMouseMove);
        canvas.addEventListener("mouseleave", handleMouseLeave);
        canvas.addEventListener("touchmove", handleTouchMove, {
          passive: false,
        });
        canvas.addEventListener("touchend", handleTouchEnd);
      }

      const cleanup = () => {
        window.cancelAnimationFrame(animationFrameId);
        if (enableHover) {
          canvas.removeEventListener("mousemove", handleMouseMove);
          canvas.removeEventListener("mouseleave", handleMouseLeave);
          canvas.removeEventListener("touchmove", handleTouchMove);
          canvas.removeEventListener("touchend", handleTouchEnd);
        }
      };
      canvas.cleanupFuzzyText = cleanup;
    };

    init();

    return () => {
      isCancelled = true;
      window.cancelAnimationFrame(animationFrameId);
      if (canvas && canvas.cleanupFuzzyText) {
        canvas.cleanupFuzzyText();
      }
    };
  }, [
    children,
    fontSize,
    fontWeight,
    fontFamily,
    color,
    enableHover,
    baseIntensity,
    hoverIntensity,
  ]);

  return <canvas ref={canvasRef} />;
};

export default FuzzyText;
