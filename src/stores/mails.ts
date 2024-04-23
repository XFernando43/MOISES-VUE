import { defineStore } from "pinia";
import { SearchRequest } from "../models/request/search-request";
import { EmailMessage } from "../models/response/mail-response";
import { Meta } from "../models/response/pagination";

export const useMailsStore = defineStore("mails", {
  state: () => ({
    mails: [] as EmailMessage[],
    selectedMail: {} as EmailMessage,
    pagination: {} as Meta,
    query: "D" as string,
    sort: "-@timestamp",
    size: 10,
    from: 0,

    searched_value:'' as string,

  }),
  getters: {},
  actions: {
    async search_data() {
      const url = "http://localhost:3000/api/v1/mail/search";
      const request: SearchRequest = {
        query: this.query,
        from: this.from,
        size: this.size,
        sort: this.sort,
      };
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(request),
      };
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error("Failed to fetch features");
      }
      const data = await response.json();
      this.mails = data.data;
      this.pagination = data.meta;

      this.selectedMail=this.mails[0];



      console.log(this.query);

    },
    updatedSelectedMail(index: number): void {
      this.selectedMail = this.mails[index];
    },
    async prevPage() {
      if (!this.pagination.has_prev_page) return;
      this.from -= this.size;
      await this.search_data();
      console.log("pipipi2")
    },
    async nextPage() {
      if (!this.pagination.has_next_page) return;
      this.from += this.size;
      await this.search_data();

      console.log("pipipi1")
    },
  },
});
