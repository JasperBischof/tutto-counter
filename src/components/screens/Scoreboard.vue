<script lang="ts" setup>
import type { Card, Player } from "../../types";

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
  <table class="flex flex-col p-2">
    <thead class="border-b">
      <tr class="flex">
        <th class="flex-1 text-left max-w-16 text-sm">turn#</th>
        <th
          class="flex-1 text-right text-sm"
          v-for="player in props.players"
          :key="player.id"
        >
          {{ player.name }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr class="flex" v-for="turn in turns" :key="turn">
        <td
          class="flex-1 max-w-16 text-sm"
          :class="{ 'bg-slate-200': (turn + 1) % 2 === 0 }"
        >
          {{ turn + 1 }}
        </td>
        <td
          class="flex-1 flex flex-col text-right text-sm"
          v-for="player in props.players"
          :key="player.id"
          :class="{ 'bg-slate-200': (turn + 1) % 2 === 0 }"
        >
          <span>
            {{ props.pointsHistory[player.id]?.[turn] ?? 0 }}
          </span>
          <span class="text-xs text-slate-500">
            {{ CARD_LABELS[props.cardHistory[player.id]?.[turn]!] }}
          </span>
        </td>
      </tr>
    </tbody>
    <tfoot class="border-t">
      <tr class="flex">
        <td class="flex-1 font-bold text-left max-w-16 text-sm">total</td>
        <td
          class="flex-1 font-bold text-right text-sm"
          v-for="player in props.players"
          :key="player.id"
          :class="{ winner: props.scores[player.id] === highestScore }"
        >
          {{ props.scores[player.id] ?? 0 }}
        </td>
      </tr>
    </tfoot>
  </table>
</template>
