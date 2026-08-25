<script lang="ts" setup>
import type { Card, Player } from "../../types.ts";
import Scoreboard from "./Scoreboard.vue";

defineProps<{
  players: Player[];
  scores: Record<string, number>;
  pointsHistory: Record<string, number[]>;
  cardHistory: Record<string, Card[]>;
  winner: Player;
  onRestart: () => void;
}>();
</script>

<template>
  <div>
    <h1>Tutto Counter</h1>
    <p>
      Game Over! <strong>{{ winner.name }}</strong> wins!
    </p>
    <Scoreboard
      :players="players"
      :scores="scores"
      :pointsHistory="pointsHistory"
      :cardHistory="cardHistory"
    />
    <button @click="onRestart">Restart Game</button>
  </div>
</template>
