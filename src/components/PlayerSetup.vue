<script lang="ts" setup>
import type { Player } from "../types";
const MIN_PLAYERS = 2;
const MAX_PLAYERS = 10;

defineProps<{
  players: Player[];
  addPlayer: () => void;
  removePlayer: (id: string) => void;
  renamePlayer: (id: string, newName: string) => void;
  //onMove missing
  onStart: () => void;
}>();
</script>

<template>
  <div class="player-setup">
    <h2>Player Setup</h2>
    <ul class="player-list">
      <li v-for="player in players" :key="player.id">
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
    </ul>
    <button @click="addPlayer" :disabled="players.length >= MAX_PLAYERS">
      Add Player
    </button>
    <button @click="onStart" :disabled="players.length < MIN_PLAYERS">
      Start Game
    </button>
  </div>
</template>

<style scoped>
.player-setup {
  display: flex;
  flex: 1;
  flex-direction: column;
}
.player-list {
  list-style-type: none;
  padding: 0;
  margin: 0;
  flex: 1;
}
</style>
