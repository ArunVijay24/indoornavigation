import React, { useRef, useEffect } from 'react';

const Canvas = (props) => {
	const canvasRef = useRef(null);
	console.log('path', props.path);
	const draw = (ctx, frameCount) => {
		ctx.moveTo(50, 50);
		ctx.lineTo(100, 100);
		ctx.stroke();
	};

	useEffect(
		() => {
			const canvas = canvasRef.current;
			const context = canvas.getContext('2d');
			let frameCount = 0;
			let animationFrameId;

			//Our draw came here
			const render = () => {
				frameCount++;
				draw(context, frameCount);
				animationFrameId = window.requestAnimationFrame(render);
			};
			render();

			return () => {
				window.cancelAnimationFrame(animationFrameId);
			};
		},
		[ draw ]
	);

	return <canvas ref={canvasRef} {...props} />;
};

export default Canvas;
