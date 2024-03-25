// stores/counter.js
import { defineStore } from 'pinia'
import { VisitorView } from '~/utils/enums';

export const useVisitorsStore = defineStore('visitors', {
  state: (): { view: VisitorView, categoryData: string[], viewData: number[]} => {
    const view = VisitorView['Month to date'];
    const catagories = genDates(view);
    const views = genViews(catagories.length, 10000);
    return { 
      view: view,
      categoryData: catagories,
      viewData: views,
     }
  },
  actions: {
    getView(): keyof typeof VisitorView {
      return VisitorView[this.view] as keyof typeof VisitorView;
    },
    getNumDays(): number {
      return this.categoryData.length;
    },
    getCategoryData() {
      return this.categoryData;
    },
    getViewData() {
      return this.viewData;
    },
    setView(view: VisitorView) {
      this.view = view;
      this.categoryData = genDates(view);
      this.viewData = genViews(this.getNumDays(), 10000);
    }
  },
})