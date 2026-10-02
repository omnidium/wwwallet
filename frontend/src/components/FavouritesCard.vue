<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useAccountsStore } from '@/stores/accounts'
import { useFavouritesStore } from '@/stores/favourites'
import FavouritesList from '@/components/FavouritesList.vue'
import FavouriteSearch from '@/components/FavouriteSearch.vue'
import AppTooltip from '@/components/AppTooltip.vue'

// The accounts screen's Favourites card: the same favourites the lock screen
// shows, managed from here — reorder, remove, and add any coin or currency
// pair. Sits among the account cards (reorderable and hideable like them,
// see AccountsView.vue), but with its edit and show/hide actions on the
// title row instead of behind a menu.
defineProps<{ reorderable?: boolean }>()

const { t } = useI18n({ useScope: 'global' })
const accounts = useAccountsStore()
const favourites = useFavouritesStore()
void favourites.load()

const editing = ref(false)

function toggleVisible() {
  editing.value = false
  void accounts.setFavouritesCardVisible(!accounts.favouritesCard.visible)
}
</script>

<template>
  <v-card class="account-card favourites-card mb-6">
    <div v-if="reorderable" class="drag-handle-row">
      <AppTooltip :text="t('accountCard.dragToReorder')">
        <template #default="{ activatorProps }">
          <img v-bind="activatorProps" src="/drag_dots.svg" :alt="t('accountCard.dragToReorder')" class="drag-handle" />
        </template>
      </AppTooltip>
    </div>
    <div class="card-header d-flex align-center pa-4 pb-2">
      <v-icon icon="mdi-star" class="favourite-star--on mr-1" />
      <p class="account-name grow-0 text-truncate">{{ t('favourites.title') }}</p>
      <p class="flex-grow-1"></p>
      <AppTooltip :text="editing ? t('favourites.doneEditing') : t('favourites.edit')">
        <template #default="{ activatorProps }">
          <v-icon v-bind="activatorProps" :icon="editing ? 'mdi-check' : 'mdi-pencil'" size="large" class="mr-4"
            role="button" tabindex="0" :aria-label="editing ? t('favourites.doneEditing') : t('favourites.edit')"
            :aria-pressed="editing" @click="editing = !editing" @keydown.enter="editing = !editing"
            @keydown.space.prevent="editing = !editing" />
        </template>
      </AppTooltip>
      <AppTooltip :text="accounts.favouritesCard.visible ? t('favourites.hideCard') : t('favourites.showCard')">
        <template #default="{ activatorProps }">
          <v-icon v-bind="activatorProps" :icon="accounts.favouritesCard.visible ? 'mdi-eye-off' : 'mdi-eye'"
            size="large" class="mr-1" role="button" tabindex="0"
            :aria-label="accounts.favouritesCard.visible ? t('favourites.hideCard') : t('favourites.showCard')"
            @click="toggleVisible" @keydown.enter="toggleVisible" @keydown.space.prevent="toggleVisible" />
        </template>
      </AppTooltip>
    </div>

    <div class="px-4 pb-3">
      <FavouritesList :editable="editing" />
      <p v-if="favourites.items.length === 0 && !editing" class="text-body-2 text-medium-emphasis py-2">
        {{ t('favourites.empty') }}
      </p>
      <FavouriteSearch v-if="editing" class="mt-3" />
    </div>
  </v-card>
</template>
