<template>
  <div class="row">
    <div v-if="note" class="col s6 offset-s3">
      <h1>{{ note.title }}</h1>
      <form @submit.prevent="submitHandler">
        <div class="chips" ref="chips"></div>
        <div class="input-field ">
          <textarea
            v-model="description"
            id="description"
            class="materialize-textarea"
            style="height: 35vh"
          ></textarea>
          <label for="description">Description</label>
          <span class="character-counter" style="float: right; font-size: 12px;"
            >{{ description.length }}/2048</span
          >
        </div>
        <input type="text" ref="datepicker" />
        <div v-if="note.status !== 'completed'">
          <button class="btn purple accent-1" type="submit" style="margin-right : 1rem">
            Update
          </button>
          <button class="btn  purple accent-4" type="submit" @click="done">Done</button>
        </div>
      </form>
    </div>
    <p v-else>Note not found</p>
  </div>
</template>

<script>
export default {
  computed: {
    note() {
      return this.$store.getters.noteById(+this.$route.params.id);
    },
  },
  methods: {
    done() {
      this.$store.dispatch("done", this.note.id);
      this.$router.push("/list");
    },
    submitHandler() {
      this.$store.dispatch("updateNote", {
        id: this.note.id,
        description: this.description,
        date: this.date.date,
      });
      this.$router.push("/list");
    },
  },
  data: () => ({
    description: "",
    chips: null,
    date: null,
  }),
  mounted() {
    this.description = this.note.description;
    this.chips = M.Chips.init(this.$refs.chips, {
      placeholder: "Note tags",
      data: this.note.tags,
    });
    this.date = M.Datepicker.init(this.$refs.datepicker, {
      format: "dd.mm.yyyy",
      defaultDate: new Date(this.note.date),
      setDefaultDate: true,
    });
    setTimeout(() => {
      M.updateTextFields();
    }, 0);
  },
  destroyed() {
    if (this.date && this.date.destroy) {
      this.date.destroy();
    }
    if (this.chips && this.chips.destroy) {
      this.chips.destroy();
    }
  },
};
</script>

<style></style>
