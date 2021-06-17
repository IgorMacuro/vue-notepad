<template>
  <div class="row">
    <div class="col s6 offset-s3">
      <h1>Create note</h1>
      <form @submit.prevent="submitHandler">
        <div class="input-field">
          <input
            v-model="title"
            id="title"
            type="text"
            class="validate"
            required
          />
          <label for="title">Title</label>
          <span
            class="helper-text"
            data-error="Title is required"
            data-success="right"
          ></span>
        </div>
        <div class="chips" ref="chips"></div>
        <div class="input-field ">
          <textarea
            v-model="description"
            id="description"
            class="materialize-textarea"
          ></textarea>
          <label for="description">Description</label>
          <span class="character-counter" style="float: right; font-size: 12px;"
            >{{ description.length }}/2048</span
          >
        </div>
        <input type="text" ref="datepicker" />
        <button
          class="btn waves-effect waves-light purple darken-2"
          type="submit"
        >
          Create Note
        </button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "create",
  methods: {
    submitHandler() {
      const note = {
        title: this.title,
        description: this.description,
        id: Date.now(),
        status: "active",
        tags: this.chips.chipsData,
        date: this.date.date,
      };
      this.$store.dispatch("createNote", note);
      this.$router.push("/list");
    },
  },
  data: () => ({
    description: "",
    title: "",
    chips: null,
    date: null,
  }),
  mounted() {
    this.chips = M.Chips.init(this.$refs.chips, {
      placeholder: "Note tags",
    });
    this.date = M.Datepicker.init(this.$refs.datepicker, {
      format: "dd.mm.yyyy",
      defaultDate: new Date(),
      setdefaultDate: true,
      firstDay: 1,
    });
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

<style>
.datepicker-date-display{
background-color: #6a1b9a 
}
.datepicker-done, .datepicker-cancel, .datepicker-day-button{
  background-color: #f3e5f5 ;
  color: #e65100;
}
</style>
