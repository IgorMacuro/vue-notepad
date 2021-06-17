<template>
  <div>
    <h1>
      List
    </h1>
    <select ref="select" v-model="filter">
      <option value="" disabled selected>Choose your option</option>
      <option value="active">Active</option>
      <option value="completed">Completed</option>
      <option value="outdated">Outdated</option>
    </select>
    <label>Status filter</label>
    <button v-if="filter" class="btn btn-small purple darken-2" @click="filter = null">
      Clear filters
    </button>
    <hr />
    <table v-if="notes.length">
      <thead>
        <tr>
          <th>#</th>
          <th>Title</th>
          <th>Date</th>
          <th>Description</th>
          <th>Status</th>
          <th>Open</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(note, idx) of displayNotes" :key="note.id">
          <td>{{ idx + 1 }}</td>
          <td>{{ note.title }}</td>
          <td>{{ note.date | formatDate }}</td>
          <td class="td">
            <div class="noteDescription">{{ note.description }}</div>
          </td>
          <td>{{ note.status }}</td>
          <td>
            <router-link
              tag="button"
              class="btn btn-small purple darken-1"
              :to="'/note/' + note.id"
            >
              Open
            </router-link>
          </td>
        </tr>
      </tbody>
    </table>
    <p v-else>No notes</p>
  </div>
</template>

<script>
export default {
  data: () => ({
    filter: null,
  }),
  mounted() {
    M.FormSelect.init(this.$refs.select);
  },
  filters: {
    formatDate: (value) => {
      return new Date(value).toLocaleDateString();
    },
  },
  computed: {
    displayNotes() {
      return this.notes.filter((n) => {
        if (!this.filter) {
          return true;
        }
        return n.status === this.filter;
      });
    },

    notes() {
      return this.$store.getters.notes;
    },
  },
};
</script>

<style scoped>
.noteDescription {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.td {
  max-width: 400px;
}
</style>
