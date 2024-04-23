<template>
    <div class="flex justify-center items-center mt-8 gap-8">
      <button
      :disabled="!pagination.has_prev_page"
      class="py-2 px-4 bg-green-500 text-white rounded disabled:opacity-50"
      @click="prevPage()"
      >Prev</button>
      <span class="text-sm">
        Página
        <input type="number" v-model="pagination.current_page" min="1" :max="pagination.total_pages" class="text-center" >
        de {{ pagination.total_pages }}
      </span> 
      <button
        @click="nextPage()"
        :disabled="!pagination.has_next_page"
        class="py-2 px-4 bg-green-500 text-white rounded disabled:opacity-50"
        >Next</button>
    </div>
  </template>
  
  <script lang="ts">
import { mapActions, mapState } from 'pinia';
import { useMailsStore } from '../stores/mails';

  export default {
    
    computed:{
        ...mapState(useMailsStore,['pagination'])
    },
    methods:{
        ...mapActions(useMailsStore,['nextPage','prevPage'])
    }
  };
  </script>
  <style scoped></style>
  