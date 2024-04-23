import { defineStore } from "pinia";
import { SearchRequest } from "../models/request/search-request";
import { EmailMessage } from "../models/response/mail-response";
import { Meta } from "../models/response/pagination";

export const useMailsStore = defineStore("mails", {
  state: () => ({
    query: "" as string,
    mails: [] as EmailMessage[],
    selectedMail: {} as EmailMessage,
    pagination: {} as Meta,
    size: 10,
    from: 0,
    sort: "-@timestamp",
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
      }
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
    },
    updatedSelectedMail(index: number): void {
      this.selectedMail = this.mails[index];
    },
  },
});
