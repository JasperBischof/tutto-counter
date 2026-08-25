<script lang="ts" setup>
import type { Card, Player } from "../types";

const props = defineProps<{
  players: Player[];
  scores: Record<string, number>;
  pointsHistory: Record<string, number[]>;
  cardHistory: Record<string, Card[]>;
  activePlayerId?: string;
}>();

const CARD_LABELS: Record<Exclude<Card, null>, string> = {
  "swap-1000": "+-1000",
  "insta-win": "insta win",
  street: "street",
  firework: "firework",
  skip: "skip",
  "double-points": "points x2",
  "bonus-100": "bonus +100",
  "bonus-200": "bonus +200",
  "bonus-300": "bonus +300",
  "bonus-400": "bonus +400",
  "bonus-500": "bonus +500",
  "bonus-600": "bonus +600",
};

const highestScore = Math.max(
  0,
  ...props.players.map((player) => props.scores[player.id] ?? 0),
);
const turnCount = Math.max(
  0,
  ...props.players.map((player) => props.pointsHistory[player.id]?.length ?? 0),
);
const turns = Array.from({ length: turnCount }, (_, index) => index);
</script>

<template>
  <div>
    <table>
      <thead>
        <tr>
          <th>turn</th>
          <th v-for="player in props.players" :key="player.id">
            {{ player.name }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="turn in turns" :key="turn">
          <td>{{ turn + 1 }}</td>
          <td v-for="player in props.players" :key="player.id">
            {{ props.pointsHistory[player.id]?.[turn] ?? 0 }}
          </td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td>total</td>
          <td
            v-for="player in props.players"
            :key="player.id"
            :class="{ winner: props.scores[player.id] === highestScore }"
          >
            {{ props.scores[player.id] ?? 0 }}
          </td>
        </tr>
      </tfoot>
    </table>
  </div>
</template>
