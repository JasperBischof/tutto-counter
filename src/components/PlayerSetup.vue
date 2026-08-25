<script lang="ts" setup>
import type { Player } from "../types";
const MIN_PLAYERS = 2;
const MAX_PLAYERS = 10;

defineProps<{
  players: Player[];
  addPlayer: () => void;
  removePlayer: (id: string) => void;
  renamePlayer: (id: string, newName: string) => void;
  movePlayer: (id: string, direction: "up" | "down") => void;
  onStart: () => void;
}>();
</script>

<template>
  <div class="player-setup">
    <h1>Tutto Counter</h1>
    <ul class="player-list">
      <li v-for="player in players" :key="player.id">
        <div class="order-buttons">
          <button @click="movePlayer(player.id, 'up')">U</button>
          <button @click="movePlayer(player.id, 'down')">D</button>
        </div>
        <input
          type="text"
          v-model="player.name"
          @input="renamePlayer(player.id, player.name)"
          placeholder="Enter player name"
        />
        <button
          @click="removePlayer(player.id)"
          :disabled="players.length <= MIN_PLAYERS"
        >
          Remove
        </button>
      </li>
      <button v-if="players.length < MAX_PLAYERS" @click="addPlayer">
        Add Player
      </button>
    </ul>
    <div class="actionButtons">
      <button @click="onStart" :disabled="players.length < MIN_PLAYERS">
        Start Game
      </button>
    </div>
  </div>
</template>

<style scoped>
.order-buttons {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  button {
    font-size: 0.825rem;
    flex: 1;
  }
}
.actionButtons {
  display: flex;
  gap: 0.5rem;
  padding: 1rem;
}
.player-setup {
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
}
h1 {
  padding: 1rem;
}
.player-list {
  list-style-type: none;
  padding: 0;
  margin: 0;
  gap: 0.5rem;
  flex: 1;
}
input[type="text"] {
  height: 3rem;
  font-size: 1rem;
  border: solid 1px hsl(0, 0%, 40%);
  background-color: #fff;
  border-radius: 0.5rem;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
}
button {
  height: 3rem;
  font-size: 1rem;
  border: solid 1px hsl(0, 0%, 40%);
  background-color: #fff;
  border-radius: 0.5rem;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
}
li {
  display: flex;
  flex-direction: row;
  gap: 0.25rem;
}
ul {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex: 1;
}
</style>
