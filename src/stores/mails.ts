import { defineStore } from "pinia";
import { SearchRequest } from "../models/request/search-request";
import { EmailMessage } from "../models/response/mail-response";
import { Meta } from "../models/response/pagination";
import { MailRequest } from "../models/request/mail-request";

export const useMailsStore = defineStore("mails", {
  state: () => ({
    mails: [] as EmailMessage[],
    selectedMail: {} as EmailMessage,
    pagination: {} as Meta,
    
    sort: "-@timestamp",
    size: 10,
    from: 0,
    searched_value: "" as string,

    separated_Word:[] as string[],

  }),
  getters: {},
  actions: {
    async search_data(query?: string) {
      const url = `${import.meta.env.VITE_API_URL_BASE}/mail/search`;
      const request: SearchRequest = {
        query: query || "",
        from: this.from || 0,
        size: this.size || 10,
        sort: this.sort || "-@timestamp",
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

      this.selectedMail = this.mails[0]; // aca validar cuando no haya resultados de la api

      console.log(query);
      console.log(this.mails);
      console.log(url);
    },

    async postEmail(from:string,to: string[], subject: string, content: string) {
      try {
        const url = `${import.meta.env.VITE_API_URL_BASE}/mail`;
        const date = new Date();
        const currentTime = date.toISOString().split("T")[1].split(".")[0];
        const newMail:MailRequest = {
          content: content,
          date: date.toISOString().split("T")[0] + "T" + currentTime + "-08:00",
          from: from,
          subject: subject,
          to: to,
        };
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newMail),
        };
        const response = await fetch(url, options);
        console.log(response);
      } catch (error) {
        console.log(error)
        throw error
      }
    },

    updatedSelectedMail(index: number): void {
      this.selectedMail = this.mails[index];
    },
    async prevPage() {
      if (!this.pagination.has_prev_page) return;
      this.from -= this.size;
      await this.search_data();
      console.log("pipipi2");
    },
    async nextPage() {
      if (!this.pagination.has_next_page) return;
      this.from += this.size;
      await this.search_data();
    },
  },
});
