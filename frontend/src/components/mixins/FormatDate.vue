<script>
export default {
  methods: {
    formatDate(dateMs) {
      const currentDateMs = Date.now();
      const date = new Date(currentDateMs - Number(dateMs));

      // Format date
      const [y, m, d] = date.toISOString().substring(0, 10).split("-");
      let years = Math.abs(y);
      let months = Math.abs(m);
      let days = Math.abs(d);

      if (years > 1970) return date.toISOString().substring(0, 10);
      if (--months) return months + " month";
      if (--days) return days + " d";

      // Format hours
      const [h, min, sec] = date.toISOString().substring(11, 19).split(":");
      const hours = Math.abs(h);
      const minutes = Math.abs(min);
      const seconds = Math.abs(sec);

      if (hours) return hours + " h";
      if (minutes) return minutes + " min";
      if (seconds) return seconds + " s";
    },
  },
};
</script>