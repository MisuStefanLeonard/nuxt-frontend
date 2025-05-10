<template>
  <div>
    <div
      v-for="popUp in lambdaPopUp"
      :key="popUp.idPopUp"
    >
      <v-dialog
        v-model="dialogOpen[popUp.idPopUp]"
        persistent
        max-width="1000"
        max-height="1000"
      >
        <v-card class="pa-4">
          <v-card-title class="text-h5 font-weight-bold text-center">
            {{ locale === 'en'
               ? popUp.titluJson.nume_en
               : popUp.titluJson.nume_ro }}
          </v-card-title>

          <v-card-text class="text-body-1 text-center">
            {{ locale === 'en'
               ? popUp.descriereJson.descriere_en
               : popUp.descriereJson.descriere_ro }}
          </v-card-text>

          <v-divider class="my-2" />

          <v-card-text
            v-if="popUp.voucher"
            class="text-h6 text-center"
          >
            <strong>
              {{ locale === 'en' ? 'Voucher Code:' : 'Cod Voucher:' }}
              <span class="text-primary">
                {{ popUp.voucher.codVoucherDto }}
              </span>
            </strong>
            <br />
            <strong>
              {{ popUp.voucher.reducereDto }}%
              {{ locale === 'en' ? 'OFF' : 'REDUCERE' }}
            </strong>
          </v-card-text>

          <v-card-actions class="justify-center">
            <v-btn
              color="primary"
              @click="closePopUpById(popUp.idPopUp)"
            >
              ❌ {{ locale === 'en' ? 'Close' : 'Închide' }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onBeforeMount } from 'vue'
import userService from '~/services/User'
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()
const lambdaPopUp = ref([])
const dialogOpen = reactive({})

// key in localStorage
const STORAGE_KEY = 'closedPopUps'
// 7 days in ms
const EXPIRY_MS = 7 * 24 * 60 * 60 * 1000

// load stored record { ids: [], expiry } or return empty array
function loadClosedIds() {
  const raw = localStorage.getItem(STORAGE_KEY)
  if (!raw) return []
  try {
    const { ids, expiry } = JSON.parse(raw)
    if (Date.now() > expiry) {
      // expired — clear it
      localStorage.removeItem(STORAGE_KEY)
      return []
    }
    return Array.isArray(ids) ? ids : []
  } catch {
    localStorage.removeItem(STORAGE_KEY)
    return []
  }
}

// save new list of ids with fresh 7-day expiry
function saveClosedIds(ids) {
  const record = {
    ids,
    expiry: Date.now() + EXPIRY_MS
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(record))
}

async function getPopUpsForUser() {
  const response = await userService.getAllPopUps()
  if (!response || !response.length) return

  const closed = loadClosedIds()
  lambdaPopUp.value = response

  response.forEach(p => {
    dialogOpen[p.idPopUp] = !closed.includes(p.idPopUp)
  })
}

function closePopUpById(idPopUp) {
  dialogOpen[idPopUp] = false
  const closed = loadClosedIds()
  if (!closed.includes(idPopUp)) {
    closed.push(idPopUp)
    saveClosedIds(closed)
  }
}

onBeforeMount(getPopUpsForUser)
</script>
