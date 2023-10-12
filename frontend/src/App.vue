<template>
  <div>
    <input type="color" v-model="selectedColor" />
    <canvas @click="handleClick" ref="canvas" width="1000" height="700"></canvas>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedColor: '#000000',
    };
  },
  methods: {
    handleClick(event) {
      const canvas = this.$refs.canvas;
      const ctx = canvas.getContext('2d');
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const pixelSize = 10; // Vous pouvez ajuster la taille de chaque "pixel" ici
      const pixelX = Math.floor(x / pixelSize);
      const pixelY = Math.floor(y / pixelSize);

      ctx.fillStyle = this.selectedColor;
      ctx.fillRect(pixelX * pixelSize, pixelY * pixelSize, pixelSize, pixelSize);

      // Vous pouvez ici envoyer une requête au backend pour mettre à jour la base de données
      // avec les coordonnées du pixel et la couleur sélectionnée.
    },
  },
};
</script>
