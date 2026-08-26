<script lang="ts" setup>
import type { Player } from "../../types";
import SectionTitle from "../ui_elements/SectionTitle.vue";
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
  <section class="flex flex-col flex-1">
    <SectionTitle :title="'Tutto Counter'" />
    <ul class="flex flex-col gap-2 flex-1">
      <li
        class="flex flex-row gap-1"
        v-for="player in players"
        :key="player.id"
      >
        <div class="flex flex-col gap-2">
          <button
            class="border rounded h-8 w-8"
            @click="movePlayer(player.id, 'up')"
          >
            U
          </button>
          <button
            class="border rounded h-8 w-8"
            @click="movePlayer(player.id, 'down')"
          >
            D
          </button>
        </div>
        <input
          class="flex-1 p-2 border rounded"
          type="text"
          v-model="player.name"
          @input="renamePlayer(player.id, player.name)"
          placeholder="Enter player name"
        />
        <button
          class="p-2 border rounded"
          @click="removePlayer(player.id)"
          :disabled="players.length <= MIN_PLAYERS"
        >
          Remove
        </button>
      </li>
      <button
        class="p-2 border rounded"
        v-if="players.length < MAX_PLAYERS"
        @click="addPlayer"
      >
        Add Player
      </button>
    </ul>
    <button
      class="p-2 border rounded"
      @click="onStart"
      :disabled="players.length < MIN_PLAYERS"
    >
      Start Game
    </button>
  </section>
</template>
