
export default class apiControler {
    constructor() {
        this.amount = 30
        this.backburner = []
        this.lock = false
      }

      getDataByFilter = (filter, callback) => {
        if (this.lock === false) {
            this.lock = true
            setTimeout(() => {
                fetch('http://localhost:3000/products?_limit=' + String(this.amount) + '&_sort=' + String(filter))
                .then((response) => response.json())
                .then((responseJson) => {
                    console.log(responseJson)
                    callback(responseJson)
                    this.lock = false
                    this.getBackburner(filter)
                })
                .catch((error) => {
                    console.error(error);
                    this.lock = false
                });
            }, 500);
        }
    }

    getBackburner = (filter) => {
        this.amount = this.amount + 30
        fetch('http://localhost:3000/products?_limit=' + String(this.amount) + '&_sort=' + String(filter))
            .then((response) => response.json())
            .then((responseJson) => {
                this.backburner = responseJson
            })
            .catch((error) => {
                console.error(error);
            });
    }


}



