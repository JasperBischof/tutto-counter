<script setup lang="ts">
import { ref } from "vue";
import { nanoid } from "nanoid";
import type { GameState, Player } from "./types";
import { applyTurn, createGame } from "./gameLogic";
import PlayerSetup from "./components/screens/PlayerSetup.vue";
import GameOver from "./components/screens/GameOver.vue";
import TurnScreen from "./components/screens/TurnScreen.vue";

const players = ref<Player[]>([
  { id: nanoid(), name: "Franzi" },
  { id: nanoid(), name: "Jasper" },
]);
const game = ref<GameState | null>(null);

function createPlayer(): Player {
  return { id: nanoid(), name: "" };
}

function addPlayer() {
  if (players.value.length >= 10) {
    return;
  }
  players.value = [...players.value, createPlayer()];
}

function removePlayer(id: string) {
  if (players.value.length <= 2) {
    return;
  }
  players.value = players.value.filter((player) => player.id !== id);
}

function renamePlayer(id: string, newName: string) {
  players.value = players.value.map((player) =>
    player.id === id ? { ...player, name: newName } : player,
  );
}

function movePlayer(id: string, direction: "up" | "down") {
  const index = players.value.findIndex((player) => player.id === id);
  if (index === -1) return;
  const newIndex = direction === "up" ? index - 1 : index + 1;
  if (newIndex < 0 || newIndex >= players.value.length) return;
  const newPlayers = [...players.value];
  const currentPlayer = newPlayers[index];
  const targetPlayer = newPlayers[newIndex];

  if (!currentPlayer || !targetPlayer) return;

  newPlayers[index] = targetPlayer;
  newPlayers[newIndex] = currentPlayer;
  players.value = newPlayers;
}

function startRound() {
  const namedPlayers = players.value.map((player, index) => ({
    ...player,
    name: player.name.trim() || `Player ${index + 1}`,
  }));
  game.value = createGame(namedPlayers);
}

function restart() {
  game.value = null;
}
</script>

<template>
  <main class="w-dvw h-dvh flex p-2">
    <PlayerSetup
      v-if="!game"
      :players="players"
      :addPlayer="addPlayer"
      :removePlayer="removePlayer"
      :renamePlayer="renamePlayer"
      :onStart="startRound"
      :movePlayer="movePlayer"
    />
    <GameOver
      v-else-if="game.winner"
      :players="game.players"
      :scores="game.scores"
      :pointsHistory="game.pointsHistory"
      :cardHistory="game.cardHistory"
      :winner="game.winner"
      :onRestart="restart"
    />
    <TurnScreen
      v-else
      :key="game.turnNumber"
      :players="game.players"
      :scores="game.scores"
      :pointsHistory="game.pointsHistory"
      :cardHistory="game.cardHistory"
      :activePlayerIndex="game.activePlayerIndex"
      :isFinalRound="game.finalRoundTriggeredBy !== null"
      :onSkip="
        () => {
          game = applyTurn(game!, 0, null, true);
        }
      "
      :onComplete="
        (points, card, isSkip) => {
          game = applyTurn(game!, points, card, isSkip);
        }
      "
    />
  </main>
</template>
