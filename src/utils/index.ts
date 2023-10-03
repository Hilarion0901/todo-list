export function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

export function hexToRgba(hex: any, alpha: any) {
    // Remove the "#" symbol from the hex color code
    hex = hex.replace(/^#/, '');

    // Convert the hex values to decimal
    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);

    // Create the rgba color string
    return `rgba(${r},${g},${b},${alpha})`;
}



