export const canvas = document.getElementById("gameCanvas");
export const ctx = canvas.getContext("2d");

//Inner glow effect
canvas.style.backgroundColor = "rgba(102,255,0,0.7)";

ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight;

