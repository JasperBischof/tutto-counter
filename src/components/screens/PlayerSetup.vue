<script lang="ts" setup>
import type { Player } from "../../types";
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
  <main>
    <h1>Tutto Counter</h1>
    <ul class="player-list">
      <li class="player-item" v-for="player in players" :key="player.id">
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
    <button
      class="start-button"
      @click="onStart"
      :disabled="players.length < MIN_PLAYERS"
    >
      Start Game
    </button>
  </main>
</template>
