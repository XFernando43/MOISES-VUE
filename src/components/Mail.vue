<template>
  <div class="flex items-start
              flex-col gap-4 p-4 
              rounded-lg overflow-y-auto 
              max-h-[800px] shadow-2xl 
            
              border border-gray-700
              font-inter">

    <div class="flex flex-col gap-4">
      <h1 class="text-lg font-bold">From: {{ selectedMail.from }}</h1>
      <div>
        <span class="font-bold">To: </span>
        <span class="text-gray-700">{{ selectedMail.to }}</span>
      </div>
      <div>
        <span class="font-bold">Subject: </span>
        <span class="text-gray-700">{{ selectedMail.subject }}</span>
      </div>
      <div>
        <span class="font-bold">Date: </span>
        <span class="text-gray-700">{{ selectedMail.date }}</span>
      </div>
      <div class="bg-gray-100 p-4 rounded-lg">

        <div>
          <!-- <span class="inline-block mx-1" v-for="(word, index) in separated_word" :key="index">
            <span v-if="searched_value && word.toString().toLowerCase().includes(searched_value.toLowerCase())" class="bg-yellow-400">{{ word }}</span>
            <span v-else>{{ word }}</span>
          </span> -->
          <p>{{ selectedMail.content }}</p>
        </div>    
 

      </div>
    </div>

  </div>
</template>

<script lang="ts">
import { mapState } from 'pinia';
import { useMailsStore } from '../stores/mails';

export default {
  computed:{
    ...mapState(useMailsStore,['selectedMail','separated_Word'])
  },
  components: {},
};
</script>

<style scoped>
@keyframes bounce {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-15px);
  }
}
.animate-bounce {
  animation: bounce 2s infinite;
}

.font-inter {
  font-family: "Inter", sans-serif;
}
</style>
