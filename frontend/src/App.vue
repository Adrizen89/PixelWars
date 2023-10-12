<template>
  <div id="app">
    <h1>PIXEL WARS</h1>
    <div id="canvas-container">
      <canvas @click="handleClick" ref="canvas" width="1000" height="700"></canvas>
    </div>
    <div id="color-picker">
      <p>Choisissez votre couleur ici :</p>
      <input type="color" v-model="selectedColor" />
    </div>
  </div>
</template>

<script>
import io from 'socket.io-client';

export default {
  data() {
    return {
      socket: null,
      selectedColor: '#000000',
      lastClicked: 0,
    };
  },
  mounted() {
    this.socket = io('http://localhost:3000');

    this.socket.on('pixel_placed', (pixelData) => {
      this.drawPixel(pixelData);
    });

    this.loadInitialPixels();
  },
  methods: {
    async loadInitialPixels() {
      try {
        const response = await fetch('http://localhost:3000/pixels');
        const pixels = await response.json();
        this.drawPixels(pixels);
      } catch (error) {
        console.error('Error loading pixels:', error);
      }
    },
    drawPixels(pixels) {
      const canvas = this.$refs.canvas;
      // eslint-disable-next-line no-unused-vars
      const ctx = canvas.getContext('2d');
      pixels.forEach(this.drawPixel);
    },
    drawPixel(pixelData) {
      const canvas = this.$refs.canvas;
      // eslint-disable-next-line no-unused-vars
      const ctx = canvas.getContext('2d');
      const { x, y, color } = pixelData;
      const pixelSize = 10;
      ctx.fillStyle = color;
      ctx.fillRect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
    },
    handleClick(event) {
      const now = Date.now();
      if (now - this.lastClicked < 180000) {
        alert('Vous devez attendre 3 minutes entre chaque clic.');
        return;
      }
      this.lastClicked = now;
      const canvas = this.$refs.canvas;
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const pixelSize = 10;
      const pixelX = Math.floor(x / pixelSize);
      const pixelY = Math.floor(y / pixelSize);

      const pixelData = {
        x: pixelX,
        y: pixelY,
        color: this.selectedColor,
      };

      this.drawPixel(pixelData);
      this.socket.emit('place_pixel', pixelData);
    },
  },
};
</script>

<style>

#app {
  text-align: center;
}

h1 {
  margin-bottom: 20px;
  font-size: 3.5em;
  color: #333;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
}

#canvas-container {
  display: inline-block;
  border: 3px solid black;
  margin-bottom: 20px;
}
p  {
  font-family: Verdana, Geneva, Tahoma, sans-serif;
}

#color-picker {
  margin-top: 20px;
}
</style>
