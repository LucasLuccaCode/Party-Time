<template>
  <div class="c-buttons" @click="handleButtons">
    <div data-controller="begin">&laquo;</div>
    <div data-controller="prev">&lsaquo;</div>
    <div class="c-buttons__numbers">
      <div
        v-for="button in currentButtons"
        :class="button == state.page ? 'active' : ''"
        :key="button"
        :data-controller="button"
      >
        {{ button }}
      </div>
    </div>
    <div data-controller="next">&rsaquo;</div>
    <div data-controller="end">&raquo;</div>
  </div>
</template>

<script>
export default {
  name: "PageButtons",
  data() {
    return {
      currentButtons: [],
    };
  },
  methods: {
    generateButtons() {
      const { leftMax, rightMax } = this.calculateMax();

      for (let i = leftMax; i <= rightMax; i++) {
        if(i) this.currentButtons.push(i);
      }
    },
    calculateMax() {
      const { page, totalPages, nButtons } = this.state;

      const calcLeft = page - Math.floor(nButtons / 2);
      let leftMax = calcLeft < 1 ? 1 : calcLeft;

      const calcRight = page + Math.floor(nButtons / 2);
      let rightMax = calcRight > totalPages ? totalPages : calcRight;

      if (page > totalPages - 2) {
        leftMax =
          leftMax - (page - (totalPages - nButtons) - Math.ceil(nButtons / 2));
      }

      if (rightMax < nButtons) {
        rightMax = rightMax + (nButtons - rightMax);
      }

      return { leftMax, rightMax };
    },
    handleButtons({ target: el }) {
      const typeButton = el.getAttribute("data-controller");
      if (!typeButton) return;

      this.runAction(typeButton);
    },
    runAction(typeButton) {
      let { page, totalPages } = this.state;
      
      const buttonActions = {
        begin: () => 1,
        prev: () => (!--page ? 1 : page),
        next: () => (++page > totalPages ? totalPages : page),
        end: () => totalPages,
        goTo: (number) => this.$parent.setPage(number),
      };

      const isNumber = Number(typeButton);
      if (isNumber) return buttonActions.goTo(isNumber);

      const fn = buttonActions[typeButton];
      this.$parent.setPage(fn());
    },
  },
  props: ["state"],
  mounted() {
    this.generateButtons();
  },
};
</script>

<style scoped>
.c-buttons {
  display: flex;
  justify-content: center;
  align-items: center;
  border-top: 2px solid rgba(255, 255, 255, 0.1);
  gap: 0.5rem;
  padding: 0.5rem 0;
}

.c-buttons__numbers {
  display: flex;
  gap: 0.5rem;
}

.c-buttons__numbers div {
  font-weight: bold;
  font-size: 0.7rem;
}

[data-controller] {
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 3px;
  font-size: 0.8rem;
  width: 1.1rem;
  height: 1.1rem;
  background: rgba(255, 255, 255, 0.1);
  color: cyan;
  box-shadow: 0 1px 1px 1px rgba(0, 0, 0, 0.05);
}

[data-controller]:hover {
  box-shadow: 0 0px 1px 1.5px cyan;
}

[data-controller]:active {
  transform: scale(0.95);
}

[data-controller].active {
  background: cyan;
  color: var(--secondary-color);
}

[data-controller].hidden {
  display: none;
}
</style>