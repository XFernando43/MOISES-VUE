<template>
  <div>
      <DataTable/>
  </div>
</template>
<script lang="ts">
import DataTable from '../components/DataTable.vue';
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
    reset_searchRequest() {
      this.query = "";
      this.from = 0;
      this.size = 10;
      this.sort = "-@timestamp"
    },
    update_query(value: string) {
      this.query = value;
      this.from = 0;
      this.size = 10;
    },
    update_sort(value: string) {
      this.sort = value;
      this.from = 0;
      this.size = 10;
    },
    ...mapActions(useMailsStore,['search_data']),
  },
  components:{
    DataTable
  }
})

</script>
<style>
  
</style>