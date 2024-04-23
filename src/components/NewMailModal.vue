<template>
  <div>
    <button @click="open_modal" class="bg-blue-700 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded">
      New
    </button>

    <div v-if="showModal" class="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div class="bg-white p-6 rounded shadow-md relative">
        <button @click="close_modal" class="absolute top-0 right-0 m-4">
          &times;
        </button>
        <form @submit.prevent="submitForm">
          <input v-model="from" type="text" placeholder="From:" class="block mb-4" />
          <input v-model="to" type="text" placeholder="To:" class="block mb-4" />
          <input v-model="subject" type="text" placeholder="Subject:" class="block mb-4" />
          <input v-model="date" type="date" class="block mb-4" />
          <textarea v-model="content" placeholder="Content" class="block mb-4"></textarea>
          <button type="submit" class="py-2 px-4 bg-green-500 text-white rounded">
            Submit
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "pinia";
import { useMailsStore } from "../stores/mails";

export default {
  data() {
    return {
      to: "",
      from: "",
      subject: "",
      date: new Date().toISOString().split("T")[0],
      content: "",
      showModal: false,
    };
  },
  methods: {
    open_modal() {
      this.showModal = true;
    },
    close_modal() {
      this.showModal = false;
    },
    submitForm() {
      this.close_modal();
      this.postEmail(this.from, [this.to], this.subject, this.content);
    },
    ...mapActions(useMailsStore, ["postEmail"]),
  },
};
</script>

<style></style>
