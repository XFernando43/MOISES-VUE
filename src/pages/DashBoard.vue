<template>
  <div class="flex p-4 relative">
    <NewMailModal />
    <div class="flex flex-col gap-4 w-3/4 pr-4">
      <DataTable/>
    </div>
    <div class="w-1/4">
      <Mail />
    </div>
  </div>


</template>
<script lang="ts">
import DataTable from '../components/DataTable.vue';
import Mail from '../components/Mail.vue';

import { defineComponent } from 'vue';
import { EmailService } from '../services/mail-service';
import { useMailsStore } from '../stores/mails';
import { mapActions } from 'pinia';


export default defineComponent({
  async mounted() {
    await this.search_data()
  },
  data() {
    return {
      mailService: new EmailService(),
      query: "",
      from: 0,
      size: 10,
      sort: "-@timestamp"
    }
  },
  methods: {
    ...mapActions(useMailsStore,['search_data']),
  },
  components:{
    DataTable,
    Mail
  }
})

</script>
<style>
  
</style>