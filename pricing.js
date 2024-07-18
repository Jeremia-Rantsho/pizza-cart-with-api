
function pricing() {
    return {
        pizzaCart: false,
        checkoutNow: false,
        smallTotalprice: 0.00,
        smallQty: 0,
        mediumTotalprice: 0,
        mediumQty: 0,
        largeTotalprice: 0.00,
        largeQty: 0,
        pizzaAmount: 0,
        paymentMsg: '',
        totalCosts: 0.00,
        totalQty: 0,
        totalChange: 0,
        showHistory: true,
        username: 'Jeremia',
        myCartId: 'GfphfkF5QD',
        myPizzas: [],
        pizzasCart: [],
        pizzasCartTotal: 0.00,
        

        init() {
            axios
                .get('https://pizza-api.projectcodex.net/api/pizzas')
                .then(result => { this.myPizzas = result.data.pizzas})

            this.showCartData();
        },
        showPizzacart() {
            return this.pizzaCart = true;
        },
        showCartData(){
            this.getCart().then(result => {
                const cartData = result.data;
                this.pizzasCart = cartData.pizzas;
                this.cartTotal = cartData.total;
            })
        },
        getCart(){
            const getCartURL = 'https://pizza-api.projectcodex.net/api/pizzas';
            return axios.get(getCartURL)
        },

        orderSmallpizza() {
            this.smallTotalprice += 48.95;
            this.smallQty += 1
        },
        cancelSmallpizza() {
            if (this.smallQty > 0) {
                this.smallTotalprice -= 48.95;
                this.smallQty -= 1
            }
        },

        orderMediumpizza() {
            this.mediumTotalprice += 87.99;
            this.mediumQty += 1
        },

        cancelMediumpizza() {
            if (this.mediumQty > 0) {
                this.mediumTotalprice -= 87.99;
                this.mediumQty -= 1
            }
        },

        orderLargepizza() {
            this.largeTotalprice += 145.99;
            this.largeQty += 1
        },
        cancelLargepizza() {
            if (this.largeQty > 0) {
                this.largeTotalprice -= 145.99;
                this.largeQty -= 1
            }
        },

        pizzaTotalcost() {
            this.totalCosts = this.smallTotalprice + this.mediumTotalprice + this.largeTotalprice;
            return this.totalCosts;
        },

        pizzaTotalQty() {
            this.totalQty = this.smallQty + this.mediumQty + this.largeQty;
            return this.totalQty;
        },
        purchasePizza() {
            if (!this.pizzaAmount) {
                this.paymentMsg = 'Oooops! Please enter valid amount of payment.'
            }
            else if (this.pizzaAmount >= this.pizzaTotalcost()) {

                this.totalChange = this.pizzaAmount - this.totalCosts;
                this.paymentMsg = 'Payment successful. Enjoy your pizza :)'

                setTimeout(() => {
                    this.checkoutNow = false;
                    this.pizzaCart = false;
                    this.clearPizzacart();
                }, 10000);
            } else {
                this.paymentMsg = 'insufficient funds!'
                setTimeout(() => {
                    this.checkoutNow = false;
                    this.pizzaCart = false;
                    this.clearPizzacart()
                }, 10000);
            }
        },
        clearPizzacart() {
            this.smallTotalprice = 0.00;
            this.smallQty = 0;
            this.mediumTotalprice = 0.00;
            this.mediumQty = 0;
            this.largeTotalprice = 0.00;
            this.largeQty = 0;
            this.paymentMsg = '';
            this.paymentAmount = 0.00;
            this.totalChange = 0.00;
        },
        openHistory() {
            this.showHistory = true;
            // this.cartDisplayed = true;
        }
    }
};
