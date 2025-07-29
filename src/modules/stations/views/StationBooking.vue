<script lang="ts" setup>
import { useQuery } from "@tanstack/vue-query";
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";

import { APP_ROUTES } from "@/modules/core/constants/routes";
import LoadingSpinner from "@/modules/shared/components/ui/LoadingSpinner.vue";
import { formatDate } from "@/modules/shared/utils/date";
import { getStationsBookingDetail } from "@/modules/stations/services/stations.service";

const route = useRoute();
const router = useRouter();
const stationId = computed<string>(() => route.params.stationId as string);
const bookingId = computed<string>(() => route.params.bookingId as string);
const isEnabled = computed(() => !!stationId.value && !!bookingId.value);

const query = useQuery({
  queryKey: computed(() => ["stations-booking-detail", stationId.value, bookingId.value]),
  queryFn: () => getStationsBookingDetail(stationId.value, bookingId.value),
  enabled: isEnabled,
  staleTime: 60_000,
  retry: 1,
});
</script>

<template>
  <h1 class="mb-4 text-lg font-semibold">Station Booking (#{{ bookingId }})</h1>

  <LoadingSpinner size="lg" v-if="query.isLoading.value" />
  <div class="rounded-sm border-4 border-red-200 p-5 text-red-500" v-else-if="query.isError.value || !query.data.value">
    Cannot get booking details
  </div>
  <div class="rounded-lg bg-white p-6" v-else>
    <p>
      <strong>Customer:</strong>
      {{ query.data.value.customerName }}
    </p>
    <p>
      <strong>Start:</strong>
      {{ formatDate(query.data.value.startDate) }}
    </p>
    <p>
      <strong>End:</strong>
      {{ formatDate(query.data.value.endDate) }}
    </p>
    <p>
      <strong>Station:</strong>
      {{ query.data.value.pickupReturnStationId }}
    </p>
  </div>

  <button
    @click="router.push({ name: APP_ROUTES.DASHBOARD.name })"
    class="bg-primary hover:bg-primary-dark mt-4 cursor-pointer rounded px-4 py-2 text-white">
    Back to Dashboard
  </button>
</template>
