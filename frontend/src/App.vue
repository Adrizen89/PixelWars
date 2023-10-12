<template>
  <div>
    <input type="color" v-model="selectedColor" />
    <canvas @click="handleClick" ref="canvas" width="1000" height="700"></canvas>
  </div>
</template>

<script>
import io from 'socket.io-client';

export default {
  data() {
    return {
      socket: null,
      selectedColor: '#000000',
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
