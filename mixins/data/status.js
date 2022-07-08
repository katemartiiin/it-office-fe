export default {
  data() {
    return {
      transmit_status: [
        { id: 1, name: "Mayor's Office - Request" },
        { id: 2, name: "Mayor's Office - Approval" },
        { id: 3, name: 'Budget - Cafoa' },
        { id: 4, name: 'Treasury - Cafoa Initial' },
        { id: 5, name: 'Accounting - Create Voucher' },

        { id: 6, name: 'Treasury - Create Check' },
        { id: 7, name: 'Accounting - Check Info' },
        { id: 8, name: 'Treasury - Check Signing' },
        { id: 9, name: "Mayor's Office - Check Signing" },
        { id: 10, name: 'Accounting - Check Advice' },

        { id: 11, name: 'Treasury - Check Release' },
        { id: 12, name: "Mayor's Office - Check Release" },
        { id: 13, name: 'Treasury - Collection' },
      ],
      transmittal_offices: [],
    }
  },
  mounted() {
    this.fetchTransmittalOffices();
  },
  methods: {
    async fetchTransmittalOffices() {
      this.$axios
        .$get(
          '/api/offices/transmittal', {}
        ).then((response) => {
          this.transmittal_offices = response.offices
        })
        .catch((error) => {})
        .finally(() => {})
    },
    generateFormStatus(office, status) {
      let formStatus = 0;

      // Mayor's Office
      if (office == 1) {
        switch (status) {
          case 1: 
            formStatus = 1;
            break;
          case 2: 
            formStatus = 2;
            break;
          case 3:
            formStatus = 9;
            break;
          case 4:
            formStatus = 12;
            break;
          default:
            break;
        }
      }
      // Budget 
      else if (office == 14) {
        formStatus = 3;
      }

      // Treasury
      else if (office == 11) {
        switch (status) {
          case 1:
            formStatus = 4;
            break;
          case 2:
            formStatus = 6;
            break;
          case 3:
            formStatus = 8;
            break;
          case 4: 
            formStatus = 11;
            break;
          case 5:
            formStatus = 13;
            break;
          default:
            break;
        }
      }

      // Accounting
      else if (office == 13) {
        switch (status) {
          case 1:
            formStatus = 5;
            break;
          case 2:
            formStatus = 7;
            break;
          case 3:
            formStatus = 10;
            break;
          default:
            break;
        }
      }

      return formStatus;

    },
  }
}
