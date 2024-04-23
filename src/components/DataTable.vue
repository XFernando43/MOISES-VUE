<template>
  <table class="text-sm text-left shadow-2xl">
    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border border-blue-950">
      <tr>
        <th class="px-2 py-2 hover:bg-gray-300">From</th>
        <th class="px-2 py-2 hover:bg-gray-300">To</th>
        <th class="px-2 py-2 hover:bg-gray-300">Subject</th>
      </tr>
    </thead>
    <tbody>
        <tr v-for="mail in mails" :key="mail.message_id">
            <td class="px-6 border-r-4 py-4">{{ mail.from }}</td>
            <td class="px-6 border-r-4 py-4">{{ mail.to }}</td>
            <td class="px-6 border-r-4 py-4">{{ mail.subject }}</td>
        </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import { mapState } from 'pinia';
import { useMailsStore } from '../stores/mails';



export default {
  computed: {
    ...mapState(useMailsStore,['mails'])
  },
  mounted() {
  },
};
</script>