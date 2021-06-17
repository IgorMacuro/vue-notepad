import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    notes: JSON.parse(localStorage.getItem("notes") || "[]").map(note => {
      if(new Date(note.date) < new Date()){
        note.status = 'outdated'
      }
      return note
    }),
  },
  mutations: {
    createNote(state, note) {
      state.notes.push(note);
      localStorage.setItem("notes", JSON.stringify(state.notes));
    },
    updateNote(state, { id, description, date }) {
      const notes = state.notes.concat();
      const idx = notes.findIndex((n) => n.id === id);
      const note = notes[idx];
      const status = new Date(date) > new Date() ? "active" : "outdated";
      notes[idx] = { ...note, date, description };
      state.notes = notes;
      localStorage.setItem("notes", JSON.stringify(state.notes));
    },
    done(state, id) {
      const idx = state.notes.findIndex((n) => n.id === id);
      state.notes[idx].status = "completed";
      localStorage.setItem("notes", JSON.stringify(state.notes));
    },
  },
  actions: {
    done({ commit }, id) {
      commit("done", id);
    },
    createNote({ commit }, note) {
      commit("createNote", note);
    },
    updateNote({ commit }, note) {
      commit("updateNote", note);
    },
  },
  getters: {
    notes: (s) => s.notes,
    noteById: (s) => (id) => s.notes.find((n) => n.id === id),
  },
});
