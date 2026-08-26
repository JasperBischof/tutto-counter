<script lang="ts" setup>
import { computed, ref } from "vue";
import type { Card, Player } from "../../types.ts";
import Keypad from "../ui_elements/Keypad.vue";
import Scoreboard from "./Scoreboard.vue";

const props = defineProps<{
  players: Player[];
  scores: Record<string, number>;
  pointsHistory: Record<string, number[]>;
  cardHistory: Record<string, Card[]>;
  activePlayerIndex: number;
  isFinalRound: boolean;
  onSkip: () => void;
  onComplete: (points: number, card: Card, reachedTutto: boolean) => void;
}>();

const BONUS_CARDS = [
  "bonus-100",
  "bonus-200",
  "bonus-300",
  "bonus-400",
  "bonus-500",
  "bonus-600",
] as const satisfies readonly Exclude<Card, null>[];

const tab = ref<"turn" | "scoreboard">("turn");
const digits = ref("");
const card = ref<Card>(null);
const step = ref<"entry" | "confirm">("entry");
const activePlayer = computed(() => props.players[props.activePlayerIndex]);

function setDigits(value: string) {
  digits.value = value;
}

function appendDigit(digit: string) {
  digits.value += digit;
}

function chooseCard(value: Exclude<Card, "firework" | null>) {
  card.value = value;
  step.value = "confirm";
}

function toggleTag(value: Exclude<Card, null>) {
  card.value = card.value === value ? null : value;
}

function submitEntry() {
  if (digits.value === "") return;
  props.onComplete(Number(digits.value), card.value, false);
}
</script>

<template>
  <section class="flex flex-col w-full h-full">
    <p v-if="props.isFinalRound" class="final-round">
      final round – highest score wins
    </p>

    <div class="bg-slate-200 flex gap-2 rounded-full">
      <button
        class="flex-1 cursor-pointer rounded-full"
        type="button"
        :class="{ 'bg-slate-400': tab === 'turn' }"
        @click="tab = 'turn'"
      >
        turn
      </button>
      <button
        class="flex-1 cursor-pointer rounded-full"
        type="button"
        :class="{ 'bg-slate-400': tab === 'scoreboard' }"
        @click="tab = 'scoreboard'"
      >
        scoreboard
      </button>
    </div>

    <Scoreboard
      v-if="tab === 'scoreboard'"
      :players="props.players"
      :scores="props.scores"
      :pointsHistory="props.pointsHistory"
      :cardHistory="props.cardHistory"
      :activePlayerId="activePlayer?.id"
    />

    <div v-else-if="step === 'entry'" class="flex flex-col">
      <!-- turn and score area -->
      <div class="flex flex-col items-center py-4">
        <p class="text-4xl font-bold py-4">{{ activePlayer?.name }}'s turn</p>
        <button
          type="button"
          class="border rounded w-full h-12 text-2xl"
          @click="setDigits('')"
        >
          {{ digits || "0" }}
        </button>
      </div>

      <!-- cards stack -->
      <div id="card-stack" class="py-8 flex gap-2 flex-col">
        <div class="flex flex-row gap-1">
          <button
            type="button"
            class="text-sm rounded-full px-2 py-1 bg-slate-200 flex-1"
            @click="props.onSkip"
          >
            skip
          </button>
          <button
            type="button"
            :class="{ 'bg-slate-400': card === 'firework' }"
            class="text-sm rounded-full px-2 py-1 bg-slate-200 flex-1"
            @click="toggleTag('firework')"
          >
            firework
          </button>
          <button
            type="button"
            :class="{ 'bg-slate-400': card === 'double-points' }"
            class="text-sm rounded-full px-2 py-1 bg-slate-200 flex-1"
            @click="toggleTag('double-points')"
          >
            points x2
          </button>
        </div>

        <div class="flex flex-row gap-1">
          <button
            type="button"
            class="text-sm rounded-full px-2 py-1 bg-slate-200 flex-1"
            @click="chooseCard('swap-1000')"
          >
            +-1000
          </button>
          <button
            type="button"
            class="text-sm rounded-full px-2 py-1 bg-slate-200 flex-1"
            @click="chooseCard('street')"
          >
            street
          </button>
          <button
            type="button"
            class="text-sm rounded-full px-2 py-1 bg-slate-200 flex-1"
            @click="chooseCard('insta-win')"
          >
            insta win
          </button>
        </div>

        <div class="flex flex-row gap-1">
          <button
            v-for="value in BONUS_CARDS"
            :key="value"
            type="button"
            :class="{ 'bg-slate-400': card === value }"
            class="text-sm rounded-full px-2 py-1 bg-slate-200 flex-1"
            @click="toggleTag(value)"
          >
            +{{ value.replace("bonus-", "") }}
          </button>
        </div>
      </div>

      <Keypad
        :onDigit="appendDigit"
        :onSubmit="submitEntry"
        :submitDisabled="digits === ''"
      />
    </div>

    <div v-else class="confirm-panel">
      <p class="turn-label">{{ activePlayer?.name }}'s turn</p>
      <p class="confirm-question">
        {{
          card === "insta-win"
            ? "reached tutto twice in a row?"
            : card === "street"
              ? "reached street?"
              : "reached tutto?"
        }}
      </p>

      <div class="confirm-actions">
        <button
          type="button"
          class="action-button"
          @click="props.onComplete(0, card, true)"
        >
          yes
        </button>
        <button
          type="button"
          class="action-button"
          @click="props.onComplete(0, card, false)"
        >
          no
        </button>
      </div>
    </div>
  </section>
</template>
