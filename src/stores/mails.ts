import { defineStore } from "pinia";
import { SearchRequest } from "../models/request/search-request";
import { EmailMessage } from "../models/response/mail-response";
import { Meta } from "../models/response/pagination";

export const useMailsStore = defineStore("mails", {
  state: () => ({
    mails: [] as EmailMessage[],
    selectedMail: {} as EmailMessage,
    pagination: {} as Meta,
    query: "" as string,
    sort: "-@timestamp",
    size: 10,
    from: 0,


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
    },
    updatedSelectedMail(index: number): void {
      this.selectedMail = this.mails[index];
    },
  },
});
